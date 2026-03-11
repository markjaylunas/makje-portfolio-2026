import { createFileRoute } from "@tanstack/react-router";
import LinkButton from "@/components/common/link-button";
import { getExperienceListOptions } from "@/data/options/experience";

export const Route = createFileRoute("/_protected/admin/experience/")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(getExperienceListOptions());
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return (
		<div>
			<LinkButton to="/admin/experience/create">Create Experience</LinkButton>
			Hello "/_protected/admin/experience/"!
			<pre>{JSON.stringify(data, undefined, 2)}</pre>
		</div>
	);
}
