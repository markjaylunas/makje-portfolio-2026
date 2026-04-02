import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projectLike } from "@/db/schema";

export const updateProjectLikeUserIdForAnonymousUser = async ({
	anonymousUserId,
	userId,
}: {
	anonymousUserId: string;
	userId: string;
}) => {
	const updatedProjectLikes = await db
		.update(projectLike)
		.set({
			userId,
		})
		.where(eq(projectLike.userId, anonymousUserId))
		.returning();

	return updatedProjectLikes;
};
