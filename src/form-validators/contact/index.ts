import z from "zod";

export const getContactMessageFnSchema = z.object({
	contactMessageId: z.string(),
});

export const getContactMessageListFnSchema = z.object({});

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
