import z from "zod";

export const searchSchema = z.object({
	query: z.string().optional(),
});

export const getTechnologyListFnSchema = z.object({
	query: z.string().optional(),
});

export type GetTechnologyListFnSchema = z.infer<
	typeof getTechnologyListFnSchema
>;
