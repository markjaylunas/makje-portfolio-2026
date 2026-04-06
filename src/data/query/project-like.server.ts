import { and, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { project, projectLike } from "@/db/schema";

export const updateProjectLikeUserIdForAnonymousUser = async ({
	anonymousUserId,
	userId,
}: {
	anonymousUserId: string;
	userId: string;
}) => {
	// 1. Identify projects already liked by the verified user
	const verifiedUserLikes = await db
		.select({ projectId: projectLike.projectId })
		.from(projectLike)
		.where(eq(projectLike.userId, userId));

	const verifiedProjectIds = verifiedUserLikes.map((l) => l.projectId);

	// 2. Delete anonymous likes for projects the verified user has already liked
	// This prevents "Unique Constraint" violations during the update
	if (verifiedProjectIds.length > 0) {
		await db
			.delete(projectLike)
			.where(
				and(
					eq(projectLike.userId, anonymousUserId),
					inArray(projectLike.projectId, verifiedProjectIds),
				),
			);
	}

	// 3. Migrate the remaining unique anonymous likes to the verified userId
	const updatedProjectLikes = await db
		.update(projectLike)
		.set({
			userId: userId,
		})
		.where(eq(projectLike.userId, anonymousUserId))
		.returning();

	await syncProjectLikesCount(userId);

	return updatedProjectLikes;
};

/**
 * Synchronizes likesCount for specific projects or the entire table.
 * @param userId - If provided, only syncs projects liked by this user.
 */
export const syncProjectLikesCount = async (userId?: string) => {
	// 1. Determine which project IDs need an update
	let projectIdsToUpdate: string[] = [];

	if (userId) {
		// Get all project IDs the specific user has liked
		const userLikes = await db
			.select({ projectId: projectLike.projectId })
			.from(projectLike)
			.where(eq(projectLike.userId, userId));

		projectIdsToUpdate = userLikes.map((l) => l.projectId);

		if (projectIdsToUpdate.length === 0) return { success: true, updated: 0 };
	}

	// 2. Get the actual up-to-date counts for these projects
	const actualCounts = await db
		.select({
			projectId: projectLike.projectId,
			count: sql<number>`count(${projectLike.id})`,
		})
		.from(projectLike)
		.where(
			userId ? inArray(projectLike.projectId, projectIdsToUpdate) : undefined,
		)
		.groupBy(projectLike.projectId);

	// 3. Update the project table with the fresh counts
	const updatePromises = actualCounts.map((record) =>
		db
			.update(project)
			.set({
				likesCount: record.count,
				updatedAt: new Date(),
			})
			.where(eq(project.id, record.projectId)),
	);

	// 4. Handle projects that might now have 0 likes
	// (Important if the last like was deleted during migration)
	if (userId) {
		const foundProjectIds = actualCounts.map((c) => c.projectId);
		const zeroLikeProjectIds = projectIdsToUpdate.filter(
			(id) => !foundProjectIds.includes(id),
		);

		if (zeroLikeProjectIds.length > 0) {
			updatePromises.push(
				db
					.update(project)
					.set({ likesCount: 0 })
					.where(inArray(project.id, zeroLikeProjectIds)),
			);
		}
	}

	await Promise.all(updatePromises);

	return { success: true, updatedCount: updatePromises.length };
};
