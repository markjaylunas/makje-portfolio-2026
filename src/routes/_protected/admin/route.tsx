import { createFileRoute, Outlet } from "@tanstack/react-router";
import AdminSidebarContainer from "@/components/admin-layout/sidebar-container";

export const Route = createFileRoute("/_protected/admin")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AdminSidebarContainer>
			<Outlet />
		</AdminSidebarContainer>
	);
}
