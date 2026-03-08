import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
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

/**
 * Creates an update schema where 'id' is explicitly required,
 * utilizing the SQLiteTable type for strict schema enforcement.
 */
export const createRequiredUpdateSchema = <TTable extends SQLiteTable>(
	table: TTable,
) => {
	return createUpdateSchema(table).extend({
		// Using string().min(1) since your schema uses text() and crypto.randomUUID() for IDs
		id: z.string().min(1),
	});
};

export const projectSelectSchema = createSelectSchema(project);
export const projectInsertSchema = createInsertSchema(project);
export const projectUpdateSchema = createRequiredUpdateSchema(project);

export const technologySelectSchema = createSelectSchema(technology);
export const technologyInsertSchema = createInsertSchema(technology);
export const technologyUpdateSchema = createRequiredUpdateSchema(technology);

export const tagSelectSchema = createSelectSchema(tag);
export const tagInsertSchema = createInsertSchema(tag);
export const tagUpdateSchema = createRequiredUpdateSchema(tag);

export const experienceSelectSchema = createSelectSchema(experience);
export const experienceInsertSchema = createInsertSchema(experience);
export const experienceUpdateSchema = createRequiredUpdateSchema(experience);

export const mediaSelectSchema = createSelectSchema(media);
export const mediaInsertSchema = createInsertSchema(media);
export const mediaUpdateSchema = createRequiredUpdateSchema(media);

export const projectLikeSelectSchema = createSelectSchema(projectLike);
export const projectLikeInsertSchema = createInsertSchema(projectLike);
export const projectLikeUpdateSchema = createRequiredUpdateSchema(projectLike);

export const projectToTechnologiesSelectSchema = createSelectSchema(
	projectToTechnologies,
);
export const projectToTechnologiesInsertSchema = createInsertSchema(
	projectToTechnologies,
);
export const projectToTechnologiesUpdateSchema = createRequiredUpdateSchema(
	projectToTechnologies,
);

export const projectToTagsSelectSchema = createSelectSchema(projectToTags);
export const projectToTagsInsertSchema = createInsertSchema(projectToTags);
export const projectToTagsUpdateSchema =
	createRequiredUpdateSchema(projectToTags);

export const experienceToTechnologiesSelectSchema = createSelectSchema(
	experienceToTechnologies,
);
export const experienceToTechnologiesInsertSchema = createInsertSchema(
	experienceToTechnologies,
);
export const experienceToTechnologiesUpdateSchema = createRequiredUpdateSchema(
	experienceToTechnologies,
);
