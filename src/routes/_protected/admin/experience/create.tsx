import { createFileRoute } from "@tanstack/react-router";
import CreateExperienceForm from "@/components/admin/experience/create/form";

export const Route = createFileRoute("/_protected/admin/experience/create")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="p-4 max-w-md mx-auto">
			<CreateExperienceForm />
		</main>
	);
}
