import { z } from "zod";
import {
	mediaInsertSchema,
	projectToTechnologiesInsertSchema,
	projectUpdateSchema,
} from "@/db/schema-validation";
import { projectFormSchema } from "./create";

export const projectEditFormSchema = projectFormSchema.extend({
	id: z.string(),
	coverImageUrl: z.string().optional(),
	coverImage: projectFormSchema.shape.coverImage.nullable(),
});

export type ProjectEditFormSchema = z.infer<typeof projectEditFormSchema>;

export const editProjectFnSchema = z.object({
	updatedProject: projectUpdateSchema,
	newMedia: mediaInsertSchema.optional(),
	newProjectToTechnologies: z.array(projectToTechnologiesInsertSchema),
	newTags: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	),
});

export type EditProjectFnSchema = z.infer<typeof editProjectFnSchema>;
