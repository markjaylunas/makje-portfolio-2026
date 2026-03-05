import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import {
	experience,
	experienceToTechnologies,
	media,
	project,
	projectLike,
	projectToTags,
	projectToTechnologies,
	tag,
	technology,
} from "./schema";

export const projectSelectSchema = createSelectSchema(project);
export const projectInsertSchema = createInsertSchema(project);

export const technologySelectSchema = createSelectSchema(technology);
export const technologyInsertSchema = createInsertSchema(technology);

export const tagSelectSchema = createSelectSchema(tag);
export const tagInsertSchema = createInsertSchema(tag);

export const experienceSelectSchema = createSelectSchema(experience);
export const experienceInsertSchema = createInsertSchema(experience);

export const mediaSelectSchema = createSelectSchema(media);
export const mediaInsertSchema = createInsertSchema(media);

export const projectLikeSelectSchema = createSelectSchema(projectLike);
export const projectLikeInsertSchema = createInsertSchema(projectLike);

export const projectToTechnologiesSelectSchema = createSelectSchema(
	projectToTechnologies,
);
export const projectToTechnologiesInsertSchema = createInsertSchema(
	projectToTechnologies,
);

export const projectToTagsSelectSchema = createSelectSchema(projectToTags);
export const projectToTagsInsertSchema = createInsertSchema(projectToTags);

export const experienceToTechnologiesSelectSchema = createSelectSchema(
	experienceToTechnologies,
);
export const experienceToTechnologiesInsertSchema = createInsertSchema(
	experienceToTechnologies,
);
