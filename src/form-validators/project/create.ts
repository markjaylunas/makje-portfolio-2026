import { z } from "zod";
import {
	mediaInsertSchema,
	projectInsertSchema,
	projectToTechnologiesInsertSchema,
} from "@/db/schema-validation";

export const PROJECT_COVER_IMAGE_MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB
export const PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES = [
	"image/png",
	"image/jpeg",
	"image/jpg",
	"image/webp",
	"image/svg+xml",
];

export const projectFormSchema = z.object({
	name: z.string().trim().min(1, "Name is required"),
	description: z
		.string()
		.trim()
		.max(2000, "Description is too long")
		.optional(),
	content: z.string().trim().max(2000, "Content is too long").optional(),
	coverImage: mediaInsertSchema,
	repositoryUrl: z.string().trim().optional(),
	liveUrl: z.string().trim().optional(),
	likesCount: z.number().optional(),
	technologyList: z.array(z.string()),
	tags: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	),
});

export const projectCreateFormSchema = projectFormSchema;

export type ProjectCreateFormSchema = z.infer<typeof projectCreateFormSchema>;

export const defaultValues: ProjectCreateFormSchema = {
	name: "",
	description: "",
	content: "",
	repositoryUrl: "",
	liveUrl: "",
	likesCount: 0,
	technologyList: [],
	tags: [],
	// biome-ignore lint/suspicious/noExplicitAny: <ignore>
	coverImage: null as any,
};

export const createProjectFnSchema = z.object({
	newProject: projectInsertSchema,
	newMedia: mediaInsertSchema,
	newProjectToTechnologies: projectToTechnologiesInsertSchema.array(),
	newTags: z.array(
		z.object({
			label: z.string(),
			value: z.string(),
		}),
	),
});

export type CreateProjectFnSchema = z.infer<typeof createProjectFnSchema>;
