import z from "zod";

export const updateTechnologyOrderFormSchema = z.object({
	featuredTechnologyIdList: z.array(z.string()),
});

export type UpdateTechnologyOrderFnSchema = z.infer<
	typeof updateTechnologyOrderFnSchema
>;

export const updateTechnologyOrderFnSchema = z.object({
	technologyIdList: z.array(z.string()),
});
