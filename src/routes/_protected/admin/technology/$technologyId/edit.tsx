import { createFileRoute, notFound } from "@tanstack/react-router";
import EditTechnologyForm from "@/components/admin/technology/edit-form";
import { getTechnologyOptions } from "@/data/options/technology";
import { adminTechnologyIdRouteParamsSchema } from "@/form-validators/technology";

export const Route = createFileRoute(
	"/_protected/admin/technology/$technologyId/edit",
)({
	component: RouteComponent,
	params: adminTechnologyIdRouteParamsSchema,
	loader: async ({ context, params: { technologyId } }) => {
		const data = await context.queryClient.ensureQueryData(
			getTechnologyOptions({ technologyId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return (
		<main className="p-4 max-w-md mx-auto">
			<EditTechnologyForm defaultTechnology={data} />
		</main>
	);
}
