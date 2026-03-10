import { createFileRoute } from "@tanstack/react-router";
import FeaturedTechnologyCardList from "@/components/admin/featured-technology/list";
import TechnologyTable from "@/components/admin/technology/table";
import CreateButton from "@/components/common/create-button";
import H2 from "@/components/common/H2";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";
import { getTechnologyListOptions } from "@/data/options/technology";
import { searchSchema } from "@/form-validators/technology";

export const Route = createFileRoute("/_protected/admin/technology/")({
	component: RouteComponent,
	loaderDeps: ({ search }) => ({
		query: search.query,
	}),
	validateSearch: searchSchema,
	loader: ({ context, deps: { query } }) => {
		return Promise.all([
			context.queryClient.ensureQueryData(getTechnologyListOptions({ query })),
			context.queryClient.ensureQueryData(getFeaturedTechnologyListOptions()),
		]);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4 ">
			<CreateButton to="/admin/technology/create">
				Create Technology
			</CreateButton>

			<TechnologyTable />

			<section className="mt-12">
				<H2 className="text-xl md:text-2xl text-center">
					Featured Technologies
				</H2>

				<FeaturedTechnologyCardList />
			</section>
		</main>
	);
}
