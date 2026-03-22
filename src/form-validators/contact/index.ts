import z from "zod";

export const getContactMessageFnSchema = z.object({
	contactMessageId: z.string(),
});

export const searchSchema = z.object({
	query: z.string().optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;

export const getContactMessageListFnSchema = searchSchema;

export type GetContactMessageFnSchema = z.infer<
	typeof getContactMessageFnSchema
>;
export type GetContactMessageListFnSchema = z.infer<
	typeof getContactMessageListFnSchema
>;

export const adminContactMessageIdRouteParamsSchema = getContactMessageFnSchema;
export type AdminContactMessageIdRouteParamsSchema = z.infer<
	typeof adminContactMessageIdRouteParamsSchema
>;
