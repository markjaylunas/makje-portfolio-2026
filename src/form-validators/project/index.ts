import z from "zod";

export const searchSchema = z.object({
	query: z.string().optional(),
});

export const getProjectListFnSchema = z.object({
	query: z.string().optional(),
});
export type GetProjectListFnSchema = z.infer<typeof getProjectListFnSchema>;

export const getProjectFnSchema = z.object({
	projectId: z.string(),
});

export type GetProjectFnSchema = z.infer<typeof getProjectFnSchema>;

export const adminProjectItemSearchSchema = z.object({
	projectId: z.string(),
});

export type AdminProjectItemSearchSchema = z.infer<
	typeof adminProjectItemSearchSchema
>;
