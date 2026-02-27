import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/admin/tags/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/_protected/admin/tags/"!</div>;
}
