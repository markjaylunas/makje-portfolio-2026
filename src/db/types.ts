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

// Insert types

export type NewUser = typeof schema.user.$inferInsert;
export type NewSession = typeof schema.session.$inferInsert;
export type NewAccount = typeof schema.account.$inferInsert;
export type NewVerification = typeof schema.verification.$inferInsert;
export type NewExperience = typeof schema.experience.$inferInsert;

export type NewProject = typeof schema.project.$inferInsert;
export type NewTechnology = typeof schema.technology.$inferInsert;
export type NewTag = typeof schema.tag.$inferInsert;
export type NewProjectLike = typeof schema.projectLike.$inferInsert;
export type NewMedia = typeof schema.media.$inferInsert;

export type NewProjectToTechnologies =
	typeof schema.projectToTechnologies.$inferInsert;
export type NewProjectToTags = typeof schema.projectToTags.$inferInsert;
export type NewExperienceToTechnologies =
	typeof schema.experienceToTechnologies.$inferInsert;
