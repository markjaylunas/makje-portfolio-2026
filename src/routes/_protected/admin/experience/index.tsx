import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/experience/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected/admin/experience/"!</div>;
}
