import z from "zod";

export const searchSchema = z.object({
	query: z.string().optional(),
});

export const adminTechnologyIdRouteParamsSchema = z.object({
	technologyId: z.string(),
});

export const getTechnologyFnSchema = z.object({
	technologyId: z.string(),
});

export type GetTechnologyFnSchema = z.infer<typeof getTechnologyFnSchema>;

export const getTechnologyListFnSchema = z.object({
	query: z.string().optional(),
});

export type GetTechnologyListFnSchema = z.infer<
	typeof getTechnologyListFnSchema
>;
