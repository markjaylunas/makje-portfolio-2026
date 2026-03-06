import { createFileRoute } from "@tanstack/react-router";
import TechnologyTable from "@/components/admin/technologies/table";
import CreateButton from "@/components/common/create-button";
import { getTechnologyListOptions } from "@/data/options/technology";

export const Route = createFileRoute("/_protected/admin/technologies/")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(getTechnologyListOptions);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4 ">
			<CreateButton to="/admin/technologies/create">
				Create Technology
			</CreateButton>

			<TechnologyTable />
		</main>
	);
}
