import { env as cfEnv } from "cloudflare:workers";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { media } from "@/db/schema";

const isArray = (value: unknown): value is unknown[] => {
	return Array.isArray(value);
};

export const deleteMedia = async ({
	mediaId,
}: {
	mediaId: string | string[];
}) => {
	if (!mediaId || mediaId.length === 0) {
		return [];
	}

	const bucket = cfEnv.BUCKET;

	if (!bucket) {
		throw new Error("R2 Bucket binding not found");
	}

	const isMediaIdArray = isArray(mediaId);

	const deletedMedia = await db
		.delete(media)
		.where(isMediaIdArray ? inArray(media.id, mediaId) : eq(media.id, mediaId))
		.returning();

	const toDeleteMediaIds = deletedMedia.map((v) => v.id);

	await bucket.delete(toDeleteMediaIds);

	return deletedMedia;
};
