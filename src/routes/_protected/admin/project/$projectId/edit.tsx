import { createFileRoute, notFound } from "@tanstack/react-router";
import EditProjectData from "@/components/admin/project/edit-data";
import EditProjectForm from "@/components/admin/project/edit-form";
import { getProjectOptions } from "@/data/options/project";
import { adminProjectIdRouteParamsSchema } from "@/form-validators/project";

export const Route = createFileRoute(
	"/_protected/admin/project/$projectId/edit",
)({
	component: RouteComponent,
	params: adminProjectIdRouteParamsSchema,
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(
			getProjectOptions({ projectId: params.projectId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
});

function RouteComponent() {
	return (
		<main className="px-4 my-12">
			<EditProjectData>
				{(project) => <EditProjectForm defaultProject={project} />}
			</EditProjectData>
		</main>
	);
}
