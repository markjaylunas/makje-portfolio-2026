import { createFileRoute } from "@tanstack/react-router";
import TechnologyTable from "@/components/admin/technology/table";
import CreateButton from "@/components/common/create-button";
import { getTechnologyListOptions } from "@/data/options/technology";
import { searchSchema } from "@/form-validators/technology";

export const Route = createFileRoute("/_protected/admin/technology/")({
	component: RouteComponent,
	loaderDeps: ({ search }) => ({
		query: search.query,
	}),
	validateSearch: searchSchema,
	loader: ({ context, deps: { query } }) => {
		return context.queryClient.ensureQueryData(
			getTechnologyListOptions({ query }),
		);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4 ">
			<CreateButton to="/admin/technology/create">
				Create Technology
			</CreateButton>

			<TechnologyTable />
		</main>
	);
}
