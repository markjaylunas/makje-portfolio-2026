import { env as cfEnv } from "cloudflare:workers";
import type { InsertMedia } from "@/db/types";
import { env } from "@/env";

export const moveR2File = async (media: InsertMedia, newDirectory: string) => {
	const bucket = cfEnv.BUCKET;
	if (!bucket) {
		throw new Error("R2 Bucket binding not found");
	}

	const oldKey = media.keyPath;
	const newKey = `${newDirectory}/${media.fileName}`;

	if (oldKey === newKey) return media;

	const object = await bucket.get(oldKey);
	if (!object) {
		throw new Error(`File not found in R2: ${oldKey}`);
	}

	await bucket.put(newKey, object.body, {
		httpMetadata: object.httpMetadata,
		customMetadata: object.customMetadata,
	});

	await bucket.delete(oldKey);

	const publicUrl = `${env.R2_PUBLIC_URL}/${newKey}`;

	return {
		...media,
		keyDirectory: newDirectory,
		keyPath: newKey,
		url: publicUrl,
	};
};
