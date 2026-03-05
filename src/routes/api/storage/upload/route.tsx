import { env as cfEnv } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import { ensureAdminMiddleware } from "@/data/middleware/auth";

export const Route = createFileRoute("/api/storage/upload")({
	server: {
		middleware: [ensureAdminMiddleware],
		handlers: {
			POST: async ({ request }) => {
				try {
					const bucket = cfEnv.BUCKET;

					if (!bucket) {
						return new Response("R2 Bucket binding not found", { status: 500 });
					}

					const formData = await request.formData();
					const file = formData.get("file") as File;
					const key = formData.get("key") as string;

					if (!file) {
						return new Response("No file uploaded", { status: 400 });
					}

					if (file.size > 1024 * 1024 * 5) {
						return new Response("File size exceeds 5MB limit", { status: 400 });
					}

					const object = await bucket.put(key, file.stream(), {
						httpMetadata: {
							contentType: file.type,
						},
					});

					if (object === null) {
						return new Response("Precondition failed or upload returned null", {
							status: 412,
						});
					}

					return new Response(
						JSON.stringify({
							success: true,
						}),
						{
							status: 200,
							headers: { "Content-Type": "application/json" },
						},
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
