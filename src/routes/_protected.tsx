import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth.server";

export const Route = createFileRoute("/_protected")({
	component: () => <Outlet />,
	beforeLoad: async ({ location }) => {
		const session = await getSession();

		const isAdmin = session?.user?.role === "admin";

		if (!session || !isAdmin) {
			throw redirect({
				to: "/login",
				search: { callbackURL: location.href },
			});
		}
	},
});
