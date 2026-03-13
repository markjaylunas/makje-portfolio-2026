import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/project/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected/admin/projects/$projectId/create"!</div>;
}
