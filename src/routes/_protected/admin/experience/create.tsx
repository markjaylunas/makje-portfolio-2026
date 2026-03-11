import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/experience/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected/admin/experience/create"!</div>;
}
