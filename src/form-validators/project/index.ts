import z from "zod";

export const searchSchema = z.object({
	query: z.string().optional(),
});

export const getProjectListFnSchema = z.object({
	query: z.string().optional(),
});
export type GetProjectListFnSchema = z.infer<typeof getProjectListFnSchema>;
