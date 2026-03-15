import { env as cfEnv } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

export const deleteMedia = async ({ mediaId }: { mediaId: string }) => {
	const bucket = cfEnv.BUCKET;

	if (!bucket) {
		throw new Error("R2 Bucket binding not found");
	}

	const [deletedMedia] = await db
		.delete(media)
		.where(eq(media.id, mediaId))
		.returning();

	await bucket.delete(deletedMedia.keyPath);

	return deletedMedia;
};
