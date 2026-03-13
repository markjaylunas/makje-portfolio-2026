import { z } from "zod";
import {
	experienceToTechnologiesInsertSchema,
	experienceUpdateSchema,
	mediaInsertSchema,
} from "@/db/schema-validation";
import {
	COMPANY_LOGO_ACCEPTED_MIME_TYPES,
	COMPANY_LOGO_MAX_FILE_SIZE,
} from "./create";

export const experienceEditFormSchema = z
	.object({
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
			.optional(),
		responsibilityList: z
			.array(z.string().trim().min(1, "Responsibility cannot be empty"))
			.min(1, "Please add at least one responsibility"),
		logo: z
			.instanceof(File)
			.refine(
				(file) => file.size <= COMPANY_LOGO_MAX_FILE_SIZE,
				`Max file size is 5MB.`,
			)
			.refine(
				(file) => COMPANY_LOGO_ACCEPTED_MIME_TYPES.includes(file.type),
				"Only PNG, JPG, JPEG, WEBP, and SVG formats are supported.",
			)
			.nullable(),
		defaultLogo: z.string().optional(),

		technologyList: z.array(z.string()),
	})
	.refine(
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

export type ExperienceEditFormSchema = z.infer<typeof experienceEditFormSchema>;

export const defaultValues: ExperienceEditFormSchema = {
	title: "",
	company: "",
	startDate: new Date(),
	endDate: undefined,
	periodDisplay: "",
	description: "",
	responsibilityList: [""],
	technologyList: [],
	logo: null,
	defaultLogo: "",
};

export const editExperienceFnSchema = z.object({
	updatedExperience: experienceUpdateSchema,
	newMedia: mediaInsertSchema.optional(),
	newExperienceToTechnologies: z.array(experienceToTechnologiesInsertSchema),
});

export type EditExperienceFnSchema = z.infer<typeof editExperienceFnSchema>;
