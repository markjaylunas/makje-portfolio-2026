import { createFileRoute } from "@tanstack/react-router";
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
			Hello "/_protected/admin/experience/"!
			<pre>{JSON.stringify(data, undefined, 2)}</pre>
		</div>
	);
}
