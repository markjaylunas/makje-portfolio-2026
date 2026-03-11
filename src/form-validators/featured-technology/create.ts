import z from "zod";

export const createFeaturedTechnologyFormSchema = z.object({
	technologyId: z.string(),
});

export type CreateFeaturedTechnologyFormSchema = z.infer<
	typeof createFeaturedTechnologyFormSchema
>;

export const createFeaturedTechnologyFnSchema = z.object({
	technologyId: z.string(),
});
