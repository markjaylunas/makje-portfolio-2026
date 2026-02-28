import { createFileRoute } from "@tanstack/react-router";
import CreateTechnologyForm from "@/components/admin/technologies/create/form";

export const Route = createFileRoute("/_protected/admin/technologies/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="p-4 max-w-md mx-auto">
			<CreateTechnologyForm />
		</main>
	);
}
