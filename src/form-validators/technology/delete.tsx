import z from "zod";

export const technologyDeleteFormSchema = z.object({
	technologyId: z.string(),
});

export type TechnologyDeleteFormSchema = z.infer<
	typeof technologyDeleteFormSchema
>;

export const deleteTechnologyFnSchema = z.object({
	technologyId: z.string(),
});
