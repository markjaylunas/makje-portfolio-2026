import { and, eq, exists, notInArray, sql } from "drizzle-orm";
import { db } from "@/db";
import {
	media,
	project,
	projectLike,
	projectToMedia,
	projectToTags,
	projectToTechnologies,
	tag,
} from "@/db/schema";
import type { CreateProjectFnSchema } from "@/form-validators/project/create";
import type { EditProjectFnSchema } from "@/form-validators/project/edit";
import { deleteMedia } from "./media.server";
import { insertTags } from "./tag.server";

export const selectProjectList = async (params: {
	userId?: string;
	query?: string;
	tag?: string;
}) => {
	const { userId, query, tag: tagSlug } = params;
	return await db.query.project.findMany({
		with: {
			coverImage: true,
			tags: {
				orderBy: (pt, { asc }) => asc(pt.order),
				with: {
					tag: true,
				},
			},
			photos: {
				orderBy: (pt, { asc }) => asc(pt.order),
				with: {
					media: true,
				},
			},
			featured: true,
			likes: {
				...(userId
					? {
							with: {
								user: true,
							},
							where: (like, { eq }) => eq(like.userId, userId),
						}
					: false),
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
		where: (project, { like, and, eq }) => {
			const queryCondition = query
				? like(project.name, `%${query}%`)
				: undefined;

			const tagCondition = tagSlug
				? exists(
						db
							.select()
							.from(projectToTags)
							.innerJoin(tag, eq(projectToTags.tagId, tag.id))
							.where(
								and(
									eq(projectToTags.projectId, project.id),
									eq(tag.slug, tagSlug),
								),
							),
					)
				: undefined;

			return and(queryCondition, tagCondition);
		},
		orderBy: (project, { desc }) => desc(project.createdAt),
	});
};

export const selectProject = async ({
	projectId,
	userId,
}: {
	projectId: string;
	userId?: string;
}) => {
	return await db.query.project.findFirst({
		with: {
			coverImage: true,
			tags: {
				orderBy: (pt, { asc }) => asc(pt.order),
				with: {
					tag: true,
				},
			},
			photos: {
				orderBy: (pt, { asc }) => asc(pt.order),
				with: {
					media: true,
				},
			},
			featured: true,
			likes: {
				...(userId
					? {
							with: {
								user: true,
							},
							where: (like, { eq }) => eq(like.userId, userId),
						}
					: false),
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
	newCoverMedia,
	newPhotosMedia,
	newTags,
}: CreateProjectFnSchema) => {
	const [mediaResult] = await db
		.insert(media)
		.values(newCoverMedia)
		.returning();

	let photosMediaResults: (typeof media.$inferSelect)[] = [];
	if (newPhotosMedia && newPhotosMedia.length > 0) {
		photosMediaResults = await db
			.insert(media)
			.values(newPhotosMedia)
			.returning();
	}

	const [insertedProject] = await db
		.insert(project)
		.values({
			...newProject,
			coverImageId: mediaResult.id,
		})
		.returning();

	if (photosMediaResults.length > 0) {
		const values = photosMediaResults.map((v, index) => ({
			projectId: insertedProject.id,
			mediaId: v.id,
			order: index + 1,
		}));
		await db.insert(projectToMedia).values(values);
	}

	const newProjectToTechnologiesValues = newProjectToTechnologies.map((v) => ({
		...v,
		projectId: insertedProject.id,
	}));

	if (newProjectToTechnologiesValues.length > 0) {
		await db
			.insert(projectToTechnologies)
			.values(newProjectToTechnologiesValues);
	}

	if (newTags.length > 0) {
		const tagList = await insertTags({ newTags });

		const orderedTagList = newTags
			.map((name) => tagList.find((t) => t.name === name))
			.filter((t): t is Exclude<typeof t, undefined> => !!t);

		const tagToProjects = orderedTagList.map((t, index) => ({
			projectId: insertedProject.id,
			tagId: t.id,
			order: index + 1,
		}));

		if (tagToProjects.length > 0) {
			await db.insert(projectToTags).values(tagToProjects);
		}
	}

	return { insertedProject };
};

export const updateProject = async ({
	updatedProject,
	newProjectToTechnologies,
	newCoverMedia,
	newPhotosMedia,
	newTags,
}: EditProjectFnSchema) => {
	let newCoverMediaResult: typeof media.$inferSelect | undefined;

	if (newCoverMedia) {
		const [mediaResult] = await db
			.insert(media)
			.values(newCoverMedia)
			.returning();
		newCoverMediaResult = mediaResult;
	}

	let newPhotosMediaResults: (typeof media.$inferSelect)[] = [];
	if (newPhotosMedia && newPhotosMedia.length > 0) {
		const newPhotosMediaValues = newPhotosMedia.filter(
			(v) => v.id === undefined,
		);
		newPhotosMediaResults = await db
			.insert(media)
			.values(newPhotosMediaValues)
			.onConflictDoNothing()
			.returning();
	}

	const [projectResult] = await db
		.update(project)
		.set({
			...updatedProject,
			coverImageId: newCoverMediaResult?.id ?? updatedProject.coverImageId,
			updatedAt: new Date(),
		})
		.where(eq(project.id, updatedProject.id))
		.returning();

	if (newPhotosMediaResults.length > 0 && newPhotosMedia) {
		const existingPhotosMedia = newPhotosMedia
			.map((v) => v.id)
			.filter((v) => v !== undefined && v !== null);

		const deletedProjectToMedia = await db
			.delete(projectToMedia)
			.where(
				and(
					eq(projectToMedia.projectId, updatedProject.id),
					notInArray(projectToMedia.mediaId, existingPhotosMedia),
				),
			)
			.returning();

		const deletedProjectToMediaMediaIds = deletedProjectToMedia.map(
			(v) => v.mediaId,
		);

		if (deletedProjectToMediaMediaIds.length > 0) {
			await deleteMedia({ mediaId: deletedProjectToMediaMediaIds });
		}

		const values = newPhotosMediaResults.map((v, index) => ({
			projectId: updatedProject.id,
			mediaId: v.id,
			order: index + 1,
		}));
		await db.insert(projectToMedia).values(values);
	}

	if (newProjectToTechnologies.length > 0) {
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

	if (newTags.length > 0) {
		await db
			.delete(projectToTags)
			.where(eq(projectToTags.projectId, updatedProject.id));

		const tagList = await insertTags({ newTags });

		const orderedTagList = newTags
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

	if (newCoverMedia && updatedProject.coverImageId) {
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

	const projectToMedia = await db.query.projectToMedia.findMany({
		where: (projectToMedia, { eq }) => eq(projectToMedia.projectId, projectId),
	});

	if (projectToMedia.length > 0) {
		await deleteMedia({
			mediaId: projectToMedia.map((v) => v.mediaId),
		});
	}

	return deleted;
};

export const toggleProjectLike = async ({
	projectId,
	userId,
}: {
	projectId: string;
	userId: string;
}) => {
	const existingLike = await db.query.projectLike.findFirst({
		where: (pl, { eq, and }) =>
			and(eq(pl.projectId, projectId), eq(pl.userId, userId)),
	});

	if (existingLike) {
		await db.delete(projectLike).where(eq(projectLike.id, existingLike.id));
		const [updatedProject] = await db
			.update(project)
			.set({
				likesCount: sql`${project.likesCount} - 1`,
			})
			.where(eq(project.id, projectId))
			.returning();
		return { liked: false, likesCount: updatedProject.likesCount };
	} else {
		await db.insert(projectLike).values({ projectId, userId });
		const [updatedProject] = await db
			.update(project)
			.set({
				likesCount: sql`${project.likesCount} + 1`,
			})
			.where(eq(project.id, projectId))
			.returning();
		return { liked: true, likesCount: updatedProject.likesCount };
	}
};
