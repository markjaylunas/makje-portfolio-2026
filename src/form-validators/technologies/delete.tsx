import z from "zod";

export const technologiesDeleteFormSchema = z.object({
	technologyId: z.string(),
});

export type TechnologiesDeleteFormSchema = z.infer<
	typeof technologiesDeleteFormSchema
>;

export const deleteTechnologyFnSchema = z.object({
	technologyId: z.string(),
});
