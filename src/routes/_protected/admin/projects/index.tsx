import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/projects/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected/admin/projects/"!</div>;
}
