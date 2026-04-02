import z from "zod";

export const searchSchema = z.object({
	query: z.string().optional(),
});

export const getProjectListFnSchema = z.object({
	query: z.string().optional(),
	tag: z.string().optional(),
});
export type GetProjectListFnSchema = z.infer<typeof getProjectListFnSchema>;

export const getProjectFnSchema = z.object({
	projectId: z.string(),
});

export type GetProjectFnSchema = z.infer<typeof getProjectFnSchema>;

export const adminProjectIdRouteParamsSchema = z.object({
	projectId: z.string(),
});

export type AdminProjectIdRouteParamsSchema = z.infer<
	typeof adminProjectIdRouteParamsSchema
>;

export const getProjectListRouteParamsSchema = z.object({
	query: z.string().optional(),
	tag: z.string().optional(),
});
export type GetProjectListRouteParamsSchema = z.infer<
	typeof getProjectListRouteParamsSchema
>;

export const toggleProjectLikeFnSchema = z.object({
	projectId: z.string(),
});
export type ToggleProjectLikeFnSchema = z.infer<
	typeof toggleProjectLikeFnSchema
>;
