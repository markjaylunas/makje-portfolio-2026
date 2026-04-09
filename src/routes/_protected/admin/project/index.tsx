import { createFileRoute, Link } from "@tanstack/react-router";
import FeaturedProjectSection from "@/components/admin/featured-project/section";
import ProjectList from "@/components/admin/project/list";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { getProjectListForAdminOptions } from "@/data/options/project";
import { searchSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_protected/admin/project/")({
	component: RouteComponent,
	loaderDeps: ({ search }) => ({
		query: search.query,
	}),
	validateSearch: searchSchema,
	loader: async ({ context, deps: { query } }) => {
		return await Promise.all([
			context.queryClient.ensureQueryData(getFeaturedProjectListOptions()),
			context.queryClient.ensureQueryData(
				getProjectListForAdminOptions({ query }),
			),
		]);
	},
});

function RouteComponent() {
	return (
		<main className="mx-4 flex max-w-(--breakpoint-sm) flex-col gap-4 sm:mx-auto">
			<Link to="/admin/project/create" className={buttonVariants()}>
				Create Project
			</Link>

			<ProjectList />

			<FeaturedProjectSection />
		</main>
	);
}
