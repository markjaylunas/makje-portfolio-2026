import z from "zod";
import type { NewMedia } from "@/db/types";
import { BUCKET_DIRECTORIES } from "@/lib/bucket-directories";

const UploadResponseSchema = z.object({
	success: z.boolean(),
	publicUrl: z.url(),
});

const uploadFileToR2 = async (keyDirectory: string, file: File) => {
	if (file.size > 1024 * 1024 * 5) {
		throw new Error("File must be less than 5MB");
	}

	const key = `${keyDirectory}/${file.name}`;

	const formData = new FormData();
	formData.append("key", key);
	formData.append("file", file);

	const response = await fetch("/api/storage/upload", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error("Failed to upload file");
	}

	const result = await response.json();

	const publicUrl = UploadResponseSchema.parse(result).publicUrl;

	const media: NewMedia = {
		fileName: file.name,
		keyPath: key,
		keyDirectory: keyDirectory,
		url: publicUrl,
		contentType: file.type,
		size: file.size,
		altText: file.name.split(".").slice(0, -1).join("."),
	};
	return media;
};

export const uploadTechnologyIcon = async (file: File) => {
	if (file.type !== "image/svg+xml") {
		throw new Error("File must be an SVG");
	}

	const keyDirectory = BUCKET_DIRECTORIES.TECHNOLOGY.ICON;
	return await uploadFileToR2(keyDirectory, file);
};
