import { createFileRoute, Outlet } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";

export const Route = createFileRoute("/_main/contact")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative min-h-screen">
			<PageHeaderAurora title="Contact" />

			<Outlet />
		</div>
	);
}
