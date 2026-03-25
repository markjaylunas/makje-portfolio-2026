import { z } from "zod";
import {
	experienceInsertSchema,
	experienceToTechnologiesInsertSchema,
	mediaInsertSchema,
} from "@/db/schema-validation";

export const COMPANY_LOGO_MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
export const COMPANY_LOGO_ACCEPTED_MIME_TYPES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
	"image/svg+xml",
];

export const experienceFormSchema = z.object({
	title: z.string().trim().min(1, "Title is required"),
	company: z.string().trim().min(1, "Company is required"),
	startDate: z.date({
		error: "Start date is required",
	}),
	endDate: z.date().optional(),
	periodDisplay: z.string().trim(),
	description: z
		.string()
		.trim()
		.max(2000, "Description is too long")
		.min(1, "Description is required"),
	responsibilityList: z
		.array(z.string().trim().min(1, "Responsibility cannot be empty"))
		.min(1, "Please add at least one responsibility"),
	logo: mediaInsertSchema,
	technologyList: z.array(z.string()),
});

export const experienceCreateFormSchema = experienceFormSchema.refine(
	(data) => {
		if (!data.startDate) return true;
		if (!data.endDate) return true;
		return data.endDate > data.startDate;
	},
	{
		message: "End date must be after the start date",
		path: ["endDate"],
	},
);

export type ExperienceCreateFormSchema = z.infer<
	typeof experienceCreateFormSchema
>;

export const defaultValues: ExperienceCreateFormSchema = {
	title: "",
	company: "",
	startDate: new Date(),
	endDate: undefined,
	periodDisplay: "",
	description: "",
	responsibilityList: [""],
	technologyList: [],
	// biome-ignore lint/suspicious/noExplicitAny: <ignore>
	logo: null as any,
};

export const createExperienceFnSchema = z.object({
	newExperience: experienceInsertSchema,
	newMedia: mediaInsertSchema,
	newExperienceToTechnologies: experienceToTechnologiesInsertSchema.array(),
});
