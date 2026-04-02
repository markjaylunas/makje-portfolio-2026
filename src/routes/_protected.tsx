import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSessionFn } from "@/lib/auth.server";

export const Route = createFileRoute("/_protected")({
	head: () => ({
		meta: [
			{ title: "Admin Portal | Makje" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: () => <Outlet />,
	beforeLoad: async ({ location }) => {
		const session = await getSessionFn();

		const isAdmin = session?.user?.role === "admin";

		if (!session || !isAdmin) {
			throw redirect({
				to: "/login",
				search: { callbackURL: location.href },
			});
		}
	},
});
