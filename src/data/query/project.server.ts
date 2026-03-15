import { db } from "@/db";
import {
	media,
	project,
	projectToTags,
	projectToTechnologies,
} from "@/db/schema";
import type { CreateProjectFnSchema } from "@/form-validators/project/create";
import { insertTags } from "./tag.server";

export const selectProjectList = async () => {
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
