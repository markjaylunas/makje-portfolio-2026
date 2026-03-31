import { createFileRoute } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import ProjectList from "@/components/project/list";
import { getProjectListOptions } from "@/data/options/project";
import { searchSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/")({
	component: RouteComponent,
	validateSearch: (search) => searchSchema.parse(search),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: async ({ context, deps: { query } }) => {
		return await context.queryClient.ensureQueryData(
			getProjectListOptions({ query }),
		);
	},
});

function RouteComponent() {
	return (
		<main className="relative min-h-screen">
			<PageHeaderAurora title="Projects" />

			<div className="relative mx-auto max-w-(--breakpoint-lg) px-4 pt-42 sm:px-6 sm:pt-80">
				<ContentMotion>
					<ProjectList />
				</ContentMotion>
			</div>
		</main>
	);
}
