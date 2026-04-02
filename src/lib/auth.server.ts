import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const getSessionFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = await getRequestHeaders();
		const session = await auth.api.getSession({
			headers,
		});
		return session;
	},
);

export type Session = Awaited<ReturnType<typeof getSessionFn>>;
