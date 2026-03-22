import { render } from "@react-email/render";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { getContactMessageFnSchema } from "@/form-validators/contact";
import { createContactMessageFnSchema } from "@/form-validators/contact/create";
import { getSessionFn } from "@/lib/auth.server";
import { rateLimit } from "@/lib/rate-limit.server";
import { emailConfig, resend } from "@/lib/resend";
import ContactMessageEmailTemplate from "@/lib/templates/contact-message";
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
		const headers = await getRequestHeaders();
		const clientIp =
			headers["cf-connecting-ip"] || headers["x-forwarded-for"] || "127.0.0.1";

		await rateLimit({
			key: `contact:${clientIp}`,
			limit: 3,
			windowSeconds: 60 * 60 * 24,
		});

		const user = await getSessionFn();
		const senderId = user?.session.userId;

		const [result] = await insertContactMessage({
			...data,
			senderId,
		});

		if (result) {
			const html = await render(
				<ContactMessageEmailTemplate
					name={data.name}
					senderEmail={data.email}
					senderId={senderId}
					contactMessageId={result.id}
					message={data.message}
					createdAt={result.createdAt}
				/>,
			);

			await resend.emails.send({
				from: emailConfig.from,
				to: emailConfig.to,
				subject: `New Message from ${data.name}`,
				html,
			});
		}

		return result;
	});

export const getContactMessageFn = createServerFn({ method: "GET" })
	.inputValidator(getContactMessageFnSchema)
	.handler(async ({ data }) => await selectContactMessage(data));
