import z from "zod";
import type { InsertMedia } from "@/db/types";
import { COMPANY_LOGO_ACCEPTED_MIME_TYPES } from "@/form-validators/experience/create";
import { PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES } from "@/form-validators/project/create";
import { TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES } from "@/form-validators/technology/create";
import { BUCKET_DIRECTORIES } from "@/lib/bucket-directories";
import { generateTimestampId } from "@/lib/utils";

const UploadResponseSchema = z.object({
	success: z.boolean(),
	publicUrl: z.url(),
});

const uploadFileToR2 = async (keyDirectory: string, file: File) => {
	if (file.size > 1024 * 1024 * 5) {
		throw new Error("File must be less than 5MB");
	}

	const fileExtension = file.name.split(".").pop();
	const fileNameString = file.name.split(".").slice(0, -1).join(".");
	const fileName = `${fileNameString}_${generateTimestampId()}.${fileExtension}`;
	const key = `${keyDirectory}/${fileName}`;

	const formData = new FormData();
	formData.append("key", key);
	formData.append("file", file);

	const response = await fetch("/api/storage/upload", {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`Failed to upload file: ${response}`);
	}

	const result = await response.json();

	const publicUrl = UploadResponseSchema.parse(result).publicUrl;

	const media: InsertMedia = {
		fileName,
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
	if (!TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.includes(file.type)) {
		throw new Error(
			`File must be of type ${TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(", ")}`,
		);
	}

	const keyDirectory = BUCKET_DIRECTORIES.TEMP;
	return await uploadFileToR2(keyDirectory, file);
};

export const uploadExperienceLogo = async (file: File) => {
	if (!COMPANY_LOGO_ACCEPTED_MIME_TYPES.includes(file.type)) {
		throw new Error(
			`File must be of type ${COMPANY_LOGO_ACCEPTED_MIME_TYPES.join(", ")}`,
		);
	}

	const keyDirectory = BUCKET_DIRECTORIES.TEMP;
	return await uploadFileToR2(keyDirectory, file);
};

export const uploadProjectCoverImage = async (file: File) => {
	if (!PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.includes(file.type)) {
		throw new Error(
			`File must be of type ${PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.join(", ")}`,
		);
	}

	const keyDirectory = BUCKET_DIRECTORIES.TEMP;
	return await uploadFileToR2(keyDirectory, file);
};

export const uploadProjectPhotoImage = async (file: File) => {
	if (!PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.includes(file.type)) {
		throw new Error(
			`File must be of type ${PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.join(", ")}`,
		);
	}

	const keyDirectory = BUCKET_DIRECTORIES.TEMP;
	return await uploadFileToR2(keyDirectory, file);
};
