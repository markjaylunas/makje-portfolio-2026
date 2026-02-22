import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/layout/footer";
import HeaderNav from "@/components/layout/header-nav";

export const Route = createFileRoute("/_main")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<>
			<HeaderNav />
			<Outlet />
			<Footer />
		</>
	);
}
