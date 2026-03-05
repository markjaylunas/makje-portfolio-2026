import z from "zod";
import {
	mediaInsertSchema,
	technologyInsertSchema,
} from "@/db/schema-validation";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_MIME_TYPES = ["image/svg+xml"];

export const technologiesCreateFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.url(),
	icon: z
		.file()
		.refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 1MB.`)
		.refine(
			(file) => ACCEPTED_MIME_TYPES.includes(file.type),
			"Only .svg format is supported.",
		)
		.refine(
			//minimum size for required icon
			(file) => file.size >= 1024, // 1KB
			"SVG icon is required.",
		),
	iconSVG: z.string().optional(),
	brandColors: z.array(z.string()).min(1, "Brand color is required"),
	brandColorsDefault: z.array(z.string()).min(1, "Brand color is required"),
});

export type TechnologiesCreateFormSchema = z.infer<
	typeof technologiesCreateFormSchema
>;

export const defaultValues: TechnologiesCreateFormSchema = {
	name: "",
	url: "",
	icon: new File([], "icon.svg", { type: "image/svg+xml" }),
	iconSVG: "",
	brandColors: [],
	brandColorsDefault: [],
};

export const createTechnologyFnSchema = z.object({
	newTechnology: technologyInsertSchema,
	newMedia: mediaInsertSchema,
});
