import { createServerFn } from "@tanstack/react-start";
import { getContactMessageFnSchema } from "@/form-validators/contact";
import { createContactMessageFnSchema } from "@/form-validators/contact/create";
import { getSessionFn } from "@/lib/auth.server";
import {
	insertContactMessage,
	selectContactMessage,
	selectContactMessageList,
} from "../query/contact-message.server";

export const getContactMessageListFn = createServerFn({
	method: "GET",
}).handler(async () => await selectContactMessageList());

export const createContactMessageFn = createServerFn({ method: "POST" })
	.inputValidator(createContactMessageFnSchema)
	.handler(async ({ data }) => {
		const user = await getSessionFn();
		const senderId = user?.session.userId;

		return await insertContactMessage({
			...data,
			senderId,
		});
	});

export const getContactMessageFn = createServerFn({ method: "GET" })
	.inputValidator(getContactMessageFnSchema)
	.handler(async ({ data }) => await selectContactMessage(data));
