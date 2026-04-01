import { createFileRoute, notFound } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import ProjectDetails from "@/components/project/details";
import { getProjectOptions } from "@/data/options/project";
import { getProjectFnSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/$projectId")({
	params: getProjectFnSchema,
	loader: async ({ context, params: { projectId } }) => {
		const data = await context.queryClient.ensureQueryData(
			getProjectOptions({ projectId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="relative min-h-screen pt-16 sm:pt-42">
			<PageHeaderAurora title="Project" height="h-[80dvh]" />

			<div className="relative mx-auto max-w-(--breakpoint-lg) min-h-dvh px-4 py-36">
				<ContentMotion>
					<ProjectDetails />
				</ContentMotion>
			</div>
		</main>
	);
}
