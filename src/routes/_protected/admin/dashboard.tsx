import { queryOptions, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const dashboardQueryOption = queryOptions({
	queryKey: ["admin-dashboard"],
	queryFn: () => {
		return "Hello '/_protected/admin/dashboard'!";
	},
});

export const Route = createFileRoute("/_protected/admin/dashboard")({
	component: RouteComponent,
	loader: async ({ context }) => {
		const data =
			await context.queryClient.ensureQueryData(dashboardQueryOption);

		return {
			title: data,
		};
	},
});

function RouteComponent() {
	const { data } = useQuery(dashboardQueryOption);

	return <div>{data}</div>;
}
