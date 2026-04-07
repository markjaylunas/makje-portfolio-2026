import { env as cfEnv } from "cloudflare:workers";
import { createFileRoute } from "@tanstack/react-router";
import sharp from "sharp";
import { ensureAdminMiddleware } from "@/data/middleware/auth";
import { env } from "@/env";

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

					const arrayBuffer = await file.arrayBuffer();
					const initialBuffer = Buffer.from(new Uint8Array(arrayBuffer));
					let bufferToUpload: Buffer | Uint8Array = initialBuffer;
					const contentType = file.type;
					const finalKey = key;

					const supportedFormats = [
						"image/jpeg",
						"image/jpg",
						"image/png",
						"image/webp",
						"image/avif",
					];

					if (supportedFormats.includes(file.type)) {
						let image = sharp(initialBuffer).resize({
							width: 2000,
							withoutEnlargement: true,
						});

						if (file.type === "image/jpeg" || file.type === "image/jpg") {
							image = image.jpeg({ quality: 80, progressive: true });
						} else if (file.type === "image/png") {
							image = image.png({ compressionLevel: 9, palette: true });
						} else if (file.type === "image/webp") {
							image = image.webp({ quality: 80 });
						} else if (file.type === "image/avif") {
							image = image.avif({ quality: 60 });
						}

						bufferToUpload = await image.toBuffer();
					}

					const object = await bucket.put(finalKey, bufferToUpload, {
						httpMetadata: {
							contentType,
						},
					});

					if (object === null) {
						return new Response("Precondition failed or upload returned null", {
							status: 412,
						});
					}

					const publicUrl = `${env.R2_PUBLIC_URL}/${finalKey}`;

					return new Response(
						JSON.stringify({
							success: true,
							publicUrl,
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
