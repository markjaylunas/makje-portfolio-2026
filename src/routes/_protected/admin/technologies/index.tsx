import { createFileRoute } from "@tanstack/react-router";
import CreateButton from "@/components/common/create-button";

export const Route = createFileRoute("/_protected/admin/technologies/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="space-y-2 p-4 ">
			<CreateButton to="/admin/technologies/create">
				Create Technology
			</CreateButton>
		</main>
	);
}
