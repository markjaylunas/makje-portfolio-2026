import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminSidebarContainer from "@/components/admin-layout/sidebar-container";

export const Route = createFileRoute("/_protected/admin")({
	head: () => ({
		meta: [
			{
				name: "robots",
				content: "noindex, nofollow",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminSidebarContainer>
			<Outlet />
		</AdminSidebarContainer>
	);
}
