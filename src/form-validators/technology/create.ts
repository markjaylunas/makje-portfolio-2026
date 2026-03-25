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
	icon: mediaInsertSchema,
	brandColors: z.array(z.string()).min(1, "Brand color is required"),
});

export type TechnologyCreateFormSchema = z.infer<
	typeof technologyCreateFormSchema
>;

export const defaultValues: TechnologyCreateFormSchema = {
	name: "",
	url: "",
	// biome-ignore lint/suspicious/noExplicitAny: <ignore>
	icon: null as any,
	brandColors: [],
};

export const createTechnologyFnSchema = z.object({
	newTechnology: technologyInsertSchema,
	newMedia: mediaInsertSchema,
});
