import z from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_MIME_TYPES = ["image/svg+xml"];

export const technologiesCreateSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.url().optional(),
	icon: z
		.any()
		.refine((files) => files?.length === 1, "An icon file is required.")
		.transform((files) => files[0])
		.refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 1MB.`)
		.refine(
			(file) => ACCEPTED_MIME_TYPES.includes(file.type),
			"Only .svg format is supported.",
		),
	brandColor: z.string().min(1, "Brand color is required"),
});

export type TechnologiesCreateSchema = z.infer<typeof technologiesCreateSchema>;

export const defaultValues: TechnologiesCreateSchema = {
	name: "",
	url: "",
	icon: null,
	brandColor: "",
};
