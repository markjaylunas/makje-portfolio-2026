import { createFileRoute } from "@tanstack/react-router";
import EditTechnologyForm from "@/components/admin/technologies/edit/form";
import { getTechnologyOptions } from "@/data/options/technology";
import { adminTechnologyIdRouteParamsSchema } from "@/form-validators/technologies";

export const Route = createFileRoute(
	"/_protected/admin/technologies/$technologyId/edit",
)({
	component: RouteComponent,
	params: adminTechnologyIdRouteParamsSchema,
	loader: ({ context, params: { technologyId } }) => {
		return context.queryClient.ensureQueryData(
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
