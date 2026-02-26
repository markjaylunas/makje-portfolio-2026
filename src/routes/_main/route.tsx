import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/layout/footer";
import HeaderMain from "@/components/layout/header-main";

export const Route = createFileRoute("/_main")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<>
			<HeaderMain />
			<Outlet />
			<Footer />
		</>
	);
}
