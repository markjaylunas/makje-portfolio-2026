import { createFileRoute, Outlet } from "@tanstack/react-router";
import HeaderAuth from "@/components/layout/header-auth";

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<HeaderAuth />
			<Outlet />
		</>
	);
}
