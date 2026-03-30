import { z } from "zod";
import {
	mediaInsertSchema,
	projectToTechnologiesInsertSchema,
	projectUpdateSchema,
} from "@/db/schema-validation";
import { projectFormSchema } from "./create";

export const projectEditFormSchema = projectFormSchema.extend({
	id: z.string(),
});

export type ProjectEditFormSchema = z.infer<typeof projectEditFormSchema>;

export const editProjectFnSchema = z.object({
	updatedProject: projectUpdateSchema,
	newCoverMedia: mediaInsertSchema.optional(),
	newPhotosMedia: z.array(mediaInsertSchema).optional(),
	newProjectToTechnologies: z.array(projectToTechnologiesInsertSchema),
	newTags: z.array(z.string()),
});

export type EditProjectFnSchema = z.infer<typeof editProjectFnSchema>;
