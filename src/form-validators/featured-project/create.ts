import z from "zod";

export const createFeaturedProjectFormSchema = z.object({
	projectId: z.string(),
});

export type CreateFeaturedProjectFormSchema = z.infer<
	typeof createFeaturedProjectFormSchema
>;

export const createFeaturedProjectFnSchema = z.object({
	projectId: z.string(),
});
