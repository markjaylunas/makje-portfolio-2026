import type { BuildQueryResult, ExtractTablesWithRelations } from "drizzle-orm";
import type * as schema from "./schema";

export type User = typeof schema.user.$inferSelect;
export type Session = typeof schema.session.$inferSelect;
export type Account = typeof schema.account.$inferSelect;
export type Verification = typeof schema.verification.$inferSelect;

export type Project = typeof schema.project.$inferSelect;
export type Technology = typeof schema.technology.$inferSelect;
export type Tag = typeof schema.tag.$inferSelect;
export type Experience = typeof schema.experience.$inferSelect;
export type Media = typeof schema.media.$inferSelect;

export type ProjectLike = typeof schema.projectLike.$inferSelect;

export type ProjectToTechnologies =
	typeof schema.projectToTechnologies.$inferSelect;
export type ProjectToTags = typeof schema.projectToTags.$inferSelect;
export type ExperienceToTechnologies =
	typeof schema.experienceToTechnologies.$inferSelect;
export type FeaturedTechnology = typeof schema.featuredTechnology.$inferSelect;

// Insert types

export type InsertProject = typeof schema.project.$inferInsert;
export type InsertTechnology = typeof schema.technology.$inferInsert;
export type InsertTag = typeof schema.tag.$inferInsert;
export type InsertProjectLike = typeof schema.projectLike.$inferInsert;
export type InsertMedia = typeof schema.media.$inferInsert;
export type InsertExperience = typeof schema.experience.$inferInsert;

export type InsertProjectToTechnologies =
	typeof schema.projectToTechnologies.$inferInsert;
export type InsertProjectToTags = typeof schema.projectToTags.$inferInsert;
export type InsertExperienceToTechnologies =
	typeof schema.experienceToTechnologies.$inferInsert;
export type InsertFeaturedTechnology =
	typeof schema.featuredTechnology.$inferInsert;

// Update types

export type UpdateProject = Partial<Project> & Pick<Project, "id">;
export type UpdateTechnology = Partial<Technology> & Pick<Technology, "id">;
export type UpdateTag = Partial<Tag> & Pick<Tag, "id">;
export type UpdateExperience = Partial<Experience> & Pick<Experience, "id">;
export type UpdateMedia = Partial<Media> & Pick<Media, "id">;

export type UpdateProjectLike = Partial<ProjectLike> & Pick<ProjectLike, "id">;

export type UpdateProjectToTechnologies = Partial<ProjectToTechnologies> &
	Pick<ProjectToTechnologies, "id">;
export type UpdateProjectToTags = Partial<ProjectToTags> &
	Pick<ProjectToTags, "id">;
export type UpdateExperienceToTechnologies = Partial<ExperienceToTechnologies> &
	Pick<ExperienceToTechnologies, "id">;

export type UpdateFeaturedTechnology = Partial<FeaturedTechnology> &
	Pick<FeaturedTechnology, "id">;

// with relations

type TSchema = ExtractTablesWithRelations<typeof schema>;

export type ExperienceQueryConfig = {
	with: {
		logo: true;
		technologies: {
			with: {
				technology: {
					with: {
						icon: true;
					};
				};
			};
		};
	};
};

export type ExperienceWithRelations = BuildQueryResult<
	TSchema,
	TSchema["experience"],
	ExperienceQueryConfig
>;

export type TechnologyQueryConfig = {
	with: {
		icon: true;
	};
};

export type TechnologyWithRelations = BuildQueryResult<
	TSchema,
	TSchema["technology"],
	TechnologyQueryConfig
>;
