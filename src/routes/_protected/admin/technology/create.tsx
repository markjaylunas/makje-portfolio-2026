import { createFileRoute } from "@tanstack/react-router";
import CreateTechnologyForm from "@/components/admin/technology/create-form";

export const Route = createFileRoute("/_protected/admin/technology/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="p-4 max-w-md mx-auto">
			<CreateTechnologyForm />
		</main>
	);
}
