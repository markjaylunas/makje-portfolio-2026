import { createFileRoute } from "@tanstack/react-router";
import EditTechnologyForm from "@/components/admin/technology/edit/form";
import { getTechnologyOptions } from "@/data/options/technology";
import { adminTechnologyIdRouteParamsSchema } from "@/form-validators/technology";

export const Route = createFileRoute(
	"/_protected/admin/technology/$technologyId/edit",
)({
	component: RouteComponent,
	params: adminTechnologyIdRouteParamsSchema,
	loader: async ({ context, params: { technologyId } }) => {
		return await context.queryClient.ensureQueryData(
			getTechnologyOptions({ technologyId }),
		);
	},
});

function RouteComponent() {
	return (
		<main className="p-4 max-w-md mx-auto">
			<EditTechnologyForm />
		</main>
	);
}
