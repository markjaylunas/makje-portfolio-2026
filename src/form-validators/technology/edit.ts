import z from "zod";
import {
	mediaInsertSchema,
	technologyUpdateSchema,
} from "@/db/schema-validation";
import { technologyCreateFormSchema } from "./create";

export const technologyEditFormSchema = technologyCreateFormSchema.extend({
	id: z.string(),
	icon: technologyCreateFormSchema.shape.icon.optional().nullable(),
	iconUrl: z.url().optional().nullable(),
});

export type TechnologyEditFormSchema = z.infer<typeof technologyEditFormSchema>;

export const editTechnologyFnSchema = z.object({
	editTechnology: technologyUpdateSchema,
	newMedia: mediaInsertSchema.optional(),
});
