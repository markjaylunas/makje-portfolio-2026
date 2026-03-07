import { createFileRoute } from "@tanstack/react-router";
import H2 from "@/components/common/H2";
import TechCard from "@/components/home/technologies/card";
import { getTechnologyOptions } from "@/data/options/technology";
import { adminTechnologyIdRouteParamsSchema } from "@/form-validators/technologies";

export const Route = createFileRoute(
	"/_protected/admin/technologies/$technologyId/",
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
	const { name, brandColor, icon, url } = Route.useLoaderData();
	return (
		<main className="py-12 px-4 max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
			<H2 className="text-center">{name}</H2>

			<div className="border rounded-lg p-4 size-56">
				<TechCard colors={brandColor} icon={icon?.url} name={name} url={url} />
			</div>
		</main>
	);
}
