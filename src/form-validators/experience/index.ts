import z from "zod";

export const getExperienceFnSchema = z.object({
	experienceId: z.string(),
});

export type GetExperienceFnSchema = z.infer<typeof getExperienceFnSchema>;

export const adminExperienceIdRouteParamsSchema = z.object({
	experienceId: z.string(),
});

export const deleteExperienceFnSchema = z.object({
	experienceId: z.string(),
});

export type DeleteExperienceFnSchema = z.infer<typeof deleteExperienceFnSchema>;
