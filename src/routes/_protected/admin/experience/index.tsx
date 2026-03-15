import { createFileRoute } from "@tanstack/react-router";
import ExperienceList from "@/components/admin/experience/list";
import LinkButton from "@/components/common/link-button";
import { getExperienceListOptions } from "@/data/options/experience";

export const Route = createFileRoute("/_protected/admin/experience/")({
	component: RouteComponent,
	loader: async ({ context }) => {
		return await context.queryClient.ensureQueryData(
			getExperienceListOptions(),
		);
	},
});

function RouteComponent() {
	return (
		<main className="space-y-6 p-4 ">
			<LinkButton to="/admin/experience/create">Create Experience</LinkButton>

			<ExperienceList />
		</main>
	);
}
