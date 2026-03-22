import z from "zod";

export const getContactMessageFnSchema = z.object({
	contactMessageId: z.string(),
});

export type GetContactMessageFnSchema = z.infer<
	typeof getContactMessageFnSchema
>;
