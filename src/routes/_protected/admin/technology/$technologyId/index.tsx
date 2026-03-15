import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import H2 from "@/components/common/H2";
import TechCard from "@/components/home/technology/card";
import { getTechnologyOptions } from "@/data/options/technology";
import { adminTechnologyIdRouteParamsSchema } from "@/form-validators/technology";

export const Route = createFileRoute(
	"/_protected/admin/technology/$technologyId/",
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
	const { technologyId } = Route.useParams();
	const { data: technology } = useSuspenseQuery(
		getTechnologyOptions({ technologyId }),
	);

	if (!technology) return null;

	return (
		<main className="py-12 px-4 max-w-md mx-auto flex flex-col gap-4 items-center justify-center">
			<H2 className="text-center">{technology.name}</H2>

			<div className="border rounded-lg p-4 size-56">
				<TechCard
					colors={technology.brandColor}
					icon={technology.icon?.url}
					name={technology.name}
					url={technology.url}
					alt={technology.icon?.altText ?? undefined}
				/>
			</div>
		</main>
	);
}
