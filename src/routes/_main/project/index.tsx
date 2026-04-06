import { createFileRoute } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import ProjectList from "@/components/project/list";
import { getProjectListOptions } from "@/data/options/project";
import { getSessionOptions } from "@/data/options/user";
import { getProjectListRouteParamsSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/")({
	head: () => ({
		meta: [
			{ title: "Projects | Makje" },
			{
				name: "description",
				content: "Explore my collection of projects and works.",
			},
		],
	}),
	component: RouteComponent,
	validateSearch: (search) => getProjectListRouteParamsSchema.parse(search),
	loaderDeps: ({ search: { query, tag } }) => ({ query, tag }),
	loader: async ({ context, deps: { query, tag } }) => {
		const data = context.queryClient.ensureQueryData(
			getProjectListOptions({ query, tag }),
		);
		const sessionData = context.queryClient.ensureQueryData(
			getSessionOptions(),
		);

		return await Promise.all([data, sessionData]);
	},
});

function RouteComponent() {
	return (
		<main className="relative min-h-screen pt-16 sm:pt-42">
			<div className="dark-dot-matrix-background absolute inset-0 h-full z-0" />
			<PageHeaderAurora title="Projects" />
			<div className="relative mx-auto max-w-5xl min-h-dvh px-4 py-36">
				<ContentMotion>
					<ProjectList />
				</ContentMotion>
			</div>
		</main>
	);
}
