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
import type { EditProjectFnSchema } from "@/form-validators/project/edit";
import { deleteMedia } from "./media.server";
import { insertTags } from "./tag.server";

export const selectProjectList = async (params: GetProjectListFnSchema) => {
	return await db.query.project.findMany({
		with: {
			coverImage: true,
			tags: {
				orderBy: (pt, { asc }) => asc(pt.order),
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
				orderBy: (pt, { asc }) => asc(pt.order),
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
				orderBy: (pt, { asc }) => asc(pt.order),
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
				orderBy: (pt, { asc }) => asc(pt.order),
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

	const tagNames = newTags.map((t) => t.label);
	const tagList = await insertTags({ newTags: tagNames });

	const orderedTagList = tagNames
		.map((name) => tagList.find((t) => t.name === name))
		.filter((t): t is Exclude<typeof t, undefined> => !!t);

	const tagToProjects = orderedTagList.map((t, index) => ({
		projectId: insertedProject.id,
		tagId: t.id,
		order: index + 1,
	}));

	await db.insert(projectToTags).values(tagToProjects);

	return { insertedProject };
};

export const updateProject = async ({
	updatedProject,
	newProjectToTechnologies,
	newMedia,
	newTags,
}: EditProjectFnSchema) => {
	let newMediaResult: typeof media.$inferSelect | undefined;

	if (newMedia) {
		const [mediaResult] = await db.insert(media).values(newMedia).returning();
		newMediaResult = mediaResult;
	}

	const [projectResult] = await db
		.update(project)
		.set({
			...updatedProject,
			coverImageId: newMediaResult?.id ?? updatedProject.coverImageId,
			updatedAt: new Date(),
		})
		.where(eq(project.id, updatedProject.id))
		.returning();

	if (newProjectToTechnologies) {
		await db
			.delete(projectToTechnologies)
			.where(eq(projectToTechnologies.projectId, updatedProject.id));

		if (newProjectToTechnologies.length > 0) {
			await db.insert(projectToTechnologies).values(
				newProjectToTechnologies.map((v) => ({
					...v,
					projectId: updatedProject.id,
				})),
			);
		}
	}

	if (newTags) {
		await db
			.delete(projectToTags)
			.where(eq(projectToTags.projectId, updatedProject.id));

		const tagNames = newTags.map((t) => t.label);
		const tagList = await insertTags({ newTags: tagNames });

		const orderedTagList = tagNames
			.map((name) => tagList.find((t) => t.name === name))
			.filter((t): t is Exclude<typeof t, undefined> => !!t);

		const tagToProjects = orderedTagList.map((t, index) => ({
			projectId: updatedProject.id,
			tagId: t.id,
			order: index + 1,
		}));

		if (tagToProjects.length > 0) {
			await db.insert(projectToTags).values(tagToProjects);
		}
	}

	if (newMedia && updatedProject.coverImageId) {
		await deleteMedia({ mediaId: updatedProject.coverImageId });
	}

	return projectResult;
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
