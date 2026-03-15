import z from "zod";

export const deleteFeaturedProjectFormSchema = z.object({
	featuredProjectId: z.string(),
});

export type DeleteFeaturedProjectFormSchema = z.infer<
	typeof deleteFeaturedProjectFormSchema
>;

export const deleteFeaturedProjectFnSchema = z.object({
	featuredProjectId: z.string(),
});
