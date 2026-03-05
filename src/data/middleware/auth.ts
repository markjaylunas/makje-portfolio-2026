import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "@/lib/auth";

export const authFnMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		return next({ context: { session } });
	},
);

export const authMiddleware = createMiddleware({ type: "request" }).server(
	async ({ next }) => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });

		if (!session) {
			throw redirect({ to: "/login" });
		}

		return next({ context: { session } });
	},
);

export const ensureAdminMiddleware = createMiddleware({
	type: "request",
}).server(async ({ next }) => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	const isAdmin = session?.user.role === "admin";

	if (!isAdmin) {
		throw redirect({ to: "/" }); // TODO: redirect to unauthorized page when implemented
	}

	return next({ context: { session } });
});

export const ensureAdminFnMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const headers = getRequestHeaders();
	const session = await auth.api.getSession({ headers });

	const isAdmin = session?.user.role === "admin";

	if (!isAdmin) {
		throw redirect({ to: "/" }); // TODO: redirect to unauthorized page when implemented
	}

	return next({ context: { session } });
});
