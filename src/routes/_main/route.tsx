import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/layout/footer";
import HeaderMain from "@/components/layout/header-main";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/_main")({
	component: LayoutComponent,
});

function LayoutComponent() {
	return (
		<>
			<HeaderMain />
			<Outlet />
			<Separator className="border border-muted mt-12" />
			<Footer />
		</>
	);
}
