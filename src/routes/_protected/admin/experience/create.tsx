import { createFileRoute } from "@tanstack/react-router";
import CreateExperienceForm from "@/components/admin/experience/create/form";
import { getTechnologyListOptions } from "@/data/options/technology";

export const Route = createFileRoute("/_protected/admin/experience/create")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return await context.queryClient.ensureQueryData(
			getTechnologyListOptions({}),
		);
	},
});

function RouteComponent() {
	return (
		<main className="px-4 my-12">
			<CreateExperienceForm />
		</main>
	);
}
