import { createFileRoute } from "@tanstack/react-router";
import FeaturedTechnologyCardOrderList from "@/components/admin/featured-technology/list";
import TechnologyTable from "@/components/admin/technology/table";
import H2 from "@/components/common/H2";
import LinkButton from "@/components/common/link-button";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";
import { getTechnologyListOptions } from "@/data/options/technology";
import { searchSchema } from "@/form-validators/technology";

export const Route = createFileRoute("/_protected/admin/technology/")({
	component: RouteComponent,
	loaderDeps: ({ search }) => ({
		query: search.query,
	}),
	validateSearch: searchSchema,
	loader: async ({ context, deps: { query } }) => {
		return await Promise.all([
			context.queryClient.ensureQueryData(getTechnologyListOptions({ query })),
			context.queryClient.ensureQueryData(getFeaturedTechnologyListOptions()),
		]);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4 ">
			<LinkButton to="/admin/technology/create">Create Technology</LinkButton>

			<TechnologyTable />

			<section className="mt-12">
				<H2 className="text-xl md:text-2xl text-center">
					Featured Technologies
				</H2>

				<FeaturedTechnologyCardOrderList />
			</section>
		</main>
	);
}
