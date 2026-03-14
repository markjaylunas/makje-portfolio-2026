import { createFileRoute, Link } from "@tanstack/react-router";
import FeaturedProjectSection from "@/components/admin/project/featured-project.section";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";

export const Route = createFileRoute("/_protected/admin/project/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return await context.queryClient.ensureQueryData(
			getFeaturedProjectListOptions(),
		);
	},
});

function RouteComponent() {
	return (
		<main className="mx-4 flex max-w-(--breakpoint-sm) flex-col gap-4 sm:mx-auto">
			<Link to="/admin/project/create" className={buttonVariants()}>
				Create Project
			</Link>

			<FeaturedProjectSection />
		</main>
	);
}
