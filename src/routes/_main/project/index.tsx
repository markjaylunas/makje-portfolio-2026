import { createFileRoute } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import ProjectList from "@/components/project/list";
import { getProjectListOptions } from "@/data/options/project";
import { getProjectListRouteParamsSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/")({
	component: RouteComponent,
	validateSearch: (search) => getProjectListRouteParamsSchema.parse(search),
	loaderDeps: ({ search: { query, tag } }) => ({ query, tag }),
	loader: async ({ context, deps: { query, tag } }) => {
		return await context.queryClient.ensureQueryData(
			getProjectListOptions({ query, tag }),
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
