import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectDetailsData from "@/components/project/details";
import { getProjectOptions } from "@/data/options/project";
import { getSessionOptions } from "@/data/options/user";
import { adminProjectIdRouteParamsSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_protected/admin/project/$projectId/")({
	component: RouteComponent,
	params: adminProjectIdRouteParamsSchema,
	loader: async ({ context, params }) => {
		const [project, session] = await Promise.all([
			context.queryClient.ensureQueryData(
				getProjectOptions({ projectId: params.projectId }),
			),
			context.queryClient.ensureQueryData(getSessionOptions()),
		]);

		if (!project) {
			throw notFound();
		}

		return {
			project,
			session,
		};
	},
});

function RouteComponent() {
	const { projectId } = Route.useParams();
	return (
		<main className="py-12 px-4 max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center">
			<ProjectDetailsData projectId={projectId} />
		</main>
	);
}
