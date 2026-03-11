import z from "zod";
import {
	experienceInsertSchema,
	experienceToTechnologiesInsertSchema,
	mediaInsertSchema,
} from "@/db/schema-validation";

const COMPANY_LOGO_MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
const COMPANY_LOGO_ACCEPTED_MIME_TYPES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
];

export const experienceCreateFormSchema = z.object({
	title: z.string().min(1, "Title is required"),
	company: z.string().min(1, "Company is required"),
	startDate: z.date().min(new Date(0), "Start date is required"),
	endDate: z.date(),
	periodDisplay: z.string().optional(),
	description: z.string().optional(),
	responsibilities: z.array(z.string()).optional(),
	logo: z
		.file()
		.refine(
			(file) => file.size <= COMPANY_LOGO_MAX_FILE_SIZE,
			`Max file size is 1MB.`,
		)
		.refine(
			(file) => COMPANY_LOGO_ACCEPTED_MIME_TYPES.includes(file.type),
			"Only PNG, JPG, JPEG, and WEBP format is supported.",
		)
		.refine(
			//minimum size for required icon
			(file) => file.size >= 1024, // 1KB
			"Company logo is required.",
		),
	technologies: z.array(z.string()).optional(),
});

export type ExperienceCreateFormSchema = z.infer<
	typeof experienceCreateFormSchema
>;

export const defaultValues: ExperienceCreateFormSchema = {
	title: "",
	company: "",
	startDate: new Date(),
	endDate: new Date(),
	periodDisplay: "",
	description: "",
	responsibilities: [],
	technologies: [],
	logo: new File([], "logo.png", { type: "image/png" }),
};

export const createExperienceFnSchema = z.object({
	newExperience: experienceInsertSchema,
	newMedia: mediaInsertSchema,
	newExperienceToTechnologies: experienceToTechnologiesInsertSchema.array(),
});
