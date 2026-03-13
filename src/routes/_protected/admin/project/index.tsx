import { createFileRoute, Link } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/_protected/admin/project/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Link to="/admin/project/create" className={buttonVariants()}>
				Create Project
			</Link>
			Hello "/_protected/admin/project/"!
		</div>
	);
}
