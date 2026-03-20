import { createFileRoute, notFound } from "@tanstack/react-router";
import EditExperienceData from "@/components/admin/experience/edit-data";
import EditExperienceForm from "@/components/admin/experience/edit-form";
import { getExperienceOptions } from "@/data/options/experience";
import { adminExperienceIdRouteParamsSchema } from "@/form-validators/experience";

export const Route = createFileRoute(
	"/_protected/admin/experience/$experienceId/edit",
)({
	component: RouteComponent,
	params: adminExperienceIdRouteParamsSchema,
	loader: async ({ context, params }) => {
		const data = await context.queryClient.ensureQueryData(
			getExperienceOptions({ experienceId: params.experienceId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
});

function RouteComponent() {
	return (
		<main className="px-4 my-12">
			<EditExperienceData>
				{(experience) => <EditExperienceForm defaultExperience={experience} />}
			</EditExperienceData>
		</main>
	);
}
