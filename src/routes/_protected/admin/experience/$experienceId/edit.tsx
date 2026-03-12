import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getExperienceOptions } from "@/data/options/experience";
import { adminExperienceIdRouteParamsSchema } from "@/form-validators/experience";

export const Route = createFileRoute(
	"/_protected/admin/experience/$experienceId/edit",
)({
	component: RouteComponent,
	params: adminExperienceIdRouteParamsSchema,
	loader: async ({ context, params }) => {
		return await context.queryClient.ensureQueryData(
			getExperienceOptions({ experienceId: params.experienceId }),
		);
	},
});

function RouteComponent() {
	const params = Route.useParams();
	const { data } = useSuspenseQuery(
		getExperienceOptions({ experienceId: params.experienceId }),
	);
	return (
		<div>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
