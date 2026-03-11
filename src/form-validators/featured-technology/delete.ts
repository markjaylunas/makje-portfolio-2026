import z from "zod";

export const deleteFeaturedTechnologyFormSchema = z.object({
	featuredTechnologyId: z.string(),
});

export type DeleteFeaturedTechnologyFormSchema = z.infer<
	typeof deleteFeaturedTechnologyFormSchema
>;

export const deleteFeaturedTechnologyFnSchema = z.object({
	featuredTechnologyId: z.string(),
});
