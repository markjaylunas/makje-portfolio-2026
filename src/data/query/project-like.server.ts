import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { projectLike } from "@/db/schema";

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

	return updatedProjectLikes;
};
