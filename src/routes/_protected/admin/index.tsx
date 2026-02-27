import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/")({
	beforeLoad: async () => {
		throw redirect({
			to: "/admin/dashboard",
		});
	},
});
