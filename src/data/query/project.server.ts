import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
	media,
	project,
	projectToTags,
	projectToTechnologies,
} from "@/db/schema";
import type { GetProjectListFnSchema } from "@/form-validators/project";
import type { CreateProjectFnSchema } from "@/form-validators/project/create";
import { deleteMedia } from "./media.server";
import { insertTags } from "./tag.server";

export const selectProjectList = async (params: GetProjectListFnSchema) => {
	return await db.query.project.findMany({
		with: {
			coverImage: true,
			tags: {
				with: {
					tag: true,
				},
			},
			featured: true,
			likes: {
				with: {
					user: true,
				},
			},
			technologies: {
				with: {
					technology: {
						with: {
							icon: true,
						},
					},
				},
			},
		},
		where: params?.query
			? (project, { like }) => like(project.name, `%${params.query}%`)
			: undefined,
		orderBy: (project, { desc }) => desc(project.createdAt),
	});
};

export const selectProject = async ({ projectId }: { projectId: string }) => {
	return await db.query.project.findFirst({
		with: {
			coverImage: true,
			tags: {
				with: {
					tag: true,
				},
			},
			featured: true,
			likes: {
				with: {
					user: true,
				},
			},
			technologies: {
				with: {
					technology: {
						with: {
							icon: true,
						},
					},
				},
			},
		},
		where: (project, { eq }) => eq(project.id, projectId),
	});
};

export const insertProject = async ({
	newProject,
	newProjectToTechnologies,
	newMedia,
	newTags,
}: CreateProjectFnSchema) => {
	const [mediaResult] = await db.insert(media).values(newMedia).returning();

	const [insertedProject] = await db
		.insert(project)
		.values({
			...newProject,
			coverImageId: mediaResult.id,
		})
		.returning();

	await db.insert(projectToTechnologies).values(
		newProjectToTechnologies.map((v) => ({
			...v,
			projectId: insertedProject.id,
		})),
	);

	const tagList = await insertTags({ newTags });
	const tagToProjects = tagList.map((t, index) => ({
		projectId: insertedProject.id,
		tagId: t.id,
		order: index + 1,
	}));

	await db.insert(projectToTags).values(tagToProjects);

	return { insertedProject };
};

export const deleteProject = async ({ projectId }: { projectId: string }) => {
	const featuredProject = await db.query.featuredProject.findFirst({
		where: (featuredProject, { eq }) =>
			eq(featuredProject.projectId, projectId),
	});

	if (featuredProject) {
		throw new Error(
			"Project is featured, please remove it from featured projects first",
		);
	}

	const [deleted] = await db
		.delete(project)
		.where(eq(project.id, projectId))
		.returning();

	if (deleted.coverImageId) {
		await deleteMedia({ mediaId: deleted.coverImageId });
	}

	return deleted;
};
