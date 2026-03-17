import z from "zod";
import {
	mediaInsertSchema,
	technologyInsertSchema,
} from "@/db/schema-validation";

export const TECHNOLOGY_ICON_MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
export const TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES = [
	"image/svg+xml",
	"image/png",
	"image/jpeg",
	"image/webp",
];

export const technologyCreateFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	url: z.url(),
	icon: z
		.file()
		.refine(
			(file) => file.size <= TECHNOLOGY_ICON_MAX_FILE_SIZE,
			`Max file size is ${TECHNOLOGY_ICON_MAX_FILE_SIZE / 1024 / 1024}MB.`,
		)
		.refine(
			(file) => TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.includes(file.type),
			`File must be of type ${TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(", ")}`,
		)
		.refine(
			//minimum size for required icon
			(file) => file.size >= 1, // 1KB
			"Icon is required.",
		),
	brandColors: z.array(z.string()).min(1, "Brand color is required"),
	brandColorsDefault: z.array(z.string()).min(1, "Brand color is required"),
});

export type TechnologyCreateFormSchema = z.infer<
	typeof technologyCreateFormSchema
>;

export const defaultValues: TechnologyCreateFormSchema = {
	name: "",
	url: "",
	icon: new File([], "icon.svg", { type: "image/svg+xml" }),
	brandColors: [],
	brandColorsDefault: [],
};

export const createTechnologyFnSchema = z.object({
	newTechnology: technologyInsertSchema,
	newMedia: mediaInsertSchema,
});
