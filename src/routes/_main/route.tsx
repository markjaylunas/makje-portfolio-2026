import { createFileRoute, Outlet } from "@tanstack/react-router";
import HeaderNav from "@/components/layout/header-nav";

export const Route = createFileRoute("/_main")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<>
			<HeaderNav />
			<Outlet />
		</>
	);
}
