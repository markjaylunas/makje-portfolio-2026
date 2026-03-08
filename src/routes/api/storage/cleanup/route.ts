import { env as cfEnv } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { db } from "@/db";
import { media } from "@/db/schema";
import { env } from "@/env";

export const Route = createFileRoute("/api/storage/cleanup")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					// 1. Security Check: Only allow requests with a secret cron key
					const authHeader = request.headers.get("Authorization");
					if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
						return new Response("Unauthorized", { status: 401 });
					}

					const bucket = cfEnv.BUCKET; //
					if (!bucket) {
						return new Response("R2 Bucket binding not found", { status: 500 });
					}

					const allR2Objects: { key: string; uploaded: Date }[] = [];
					let truncated = true;
					let cursor: string | undefined;

					// 2. Paginated list of all R2 objects
					while (truncated) {
						const response: R2Objects = await bucket.list({ cursor });
						allR2Objects.push(
							...response.objects.map((obj) => ({
								key: obj.key,
								uploaded: obj.uploaded,
							})),
						);
						truncated = response.truncated;
						cursor = response.truncated ? response.cursor : undefined;
					}

					// 3. Get valid keys from Media table
					const dbMedia = await db
						.select({ keyPath: media.keyPath })
						.from(media);
					const dbKeys = new Set(dbMedia.map((m) => m.keyPath));

					// 4. Identify orphans older than 24 hours
					const bufferTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
					const orphans = allR2Objects
						.filter((obj) => !dbKeys.has(obj.key))
						.filter((obj) => obj.uploaded < bufferTime)
						.map((obj) => obj.key);

					// 5. Batch Delete (R2 limit 1000)
					if (orphans.length > 0) {
						for (let i = 0; i < orphans.length; i += 1000) {
							const chunk = orphans.slice(i, i + 1000);
							await bucket.delete(chunk);
						}
					}

					return new Response(
						JSON.stringify({ success: true, deletedCount: orphans.length }),
						{ status: 200, headers: { "Content-Type": "application/json" } },
					);
				} catch (error: unknown) {
					if (error instanceof Error) {
						return new Response(JSON.stringify({ error: error.message }), {
							status: 500,
							headers: { "Content-Type": "application/json" },
						});
					}

					return new Response(
						JSON.stringify({ error: "An unexpected error occurred" }),
						{
							status: 500,
						},
					);
				}
			},
		},
	},
});
