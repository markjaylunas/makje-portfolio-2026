import { z } from "zod";
import {
	experienceToTechnologiesInsertSchema,
	experienceUpdateSchema,
	mediaInsertSchema,
} from "@/db/schema-validation";
import { experienceFormSchema } from "./create";

export const experienceEditFormSchema = experienceFormSchema.extend({
	id: z.string(),
	logoUrl: z.url().optional(),
	logo: experienceFormSchema.shape.logo.nullable(),
});

export type ExperienceEditFormSchema = z.infer<typeof experienceEditFormSchema>;

export const editExperienceFnSchema = z.object({
	updatedExperience: experienceUpdateSchema,
	newMedia: mediaInsertSchema.optional(),
	newExperienceToTechnologies: z.array(experienceToTechnologiesInsertSchema),
});

export type EditExperienceFnSchema = z.infer<typeof editExperienceFnSchema>;
