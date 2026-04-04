import { createFileRoute } from "@tanstack/react-router";
import CreateProjectForm from "@/components/admin/project/create-form";
import { getTagListOptions } from "@/data/options/tag";
import { getTechnologyListOptions } from "@/data/options/technology";

export const Route = createFileRoute("/_protected/admin/project/create")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return await Promise.all([
			context.queryClient.ensureQueryData(getTechnologyListOptions({})),
			context.queryClient.ensureQueryData(getTagListOptions()),
		]);
	},
});

function RouteComponent() {
	return (
		<main className="mx-4 my-6">
			<CreateProjectForm />
		</main>
	);
}
