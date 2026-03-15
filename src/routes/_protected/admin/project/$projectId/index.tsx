import { createFileRoute, notFound } from "@tanstack/react-router";
import ProjectItemSection from "@/components/admin/project/item-section";
import { getProjectOptions } from "@/data/options/project";
import { adminProjectItemSearchSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_protected/admin/project/$projectId/")({
	component: RouteComponent,
	params: adminProjectItemSearchSchema,
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
		<main className="py-12 px-4 max-w-2xl mx-auto flex flex-col gap-4 items-center justify-center">
			<ProjectItemSection />
		</main>
	);
}
