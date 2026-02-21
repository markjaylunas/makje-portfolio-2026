import { createFileRoute, Outlet } from "@tanstack/react-router";
import Header from "@/components/layout/header";

export const Route = createFileRoute("/_main")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
