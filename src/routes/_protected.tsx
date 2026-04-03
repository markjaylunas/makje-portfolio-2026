import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { getSessionFn } from "@/lib/auth.server";

export const Route = createFileRoute("/_protected")({
	head: () => ({
		meta: [
			{ title: "Admin Portal | Makje" },
			{ name: "robots", content: "noindex, nofollow" },
		],
	}),
	component: () => <Outlet />,
	beforeLoad: async () => {
		const session = await getSessionFn();

		const isAdmin = session?.user?.role === "admin";

		if (!session || !isAdmin) notFound();
	},
});
