import z from "zod";

export const projectDeleteFormSchema = z.object({
	projectId: z.string(),
});

export type ProjectDeleteFormSchema = z.infer<typeof projectDeleteFormSchema>;

export const deleteProjectFnSchema = z.object({
	projectId: z.string(),
});
