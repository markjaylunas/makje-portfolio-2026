import { createFileRoute } from "@tanstack/react-router";
import CreateButton from "@/components/common/create-button";
import { getTechnologyListOptions } from "@/data/options/technology";

export const Route = createFileRoute("/_protected/admin/technologies/")({
	component: RouteComponent,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(getTechnologyListOptions);
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();
	return (
		<main className="space-y-2 p-4 ">
			<CreateButton to="/admin/technologies/create">
				Create Technology
			</CreateButton>

			<ul>
				{data.map((tech) => (
					<li key={tech.id}>
						<span>name: {tech.name}</span>
						<span>url: {tech.url}</span>
						<span>brandColor: {tech.brandColor}</span>
						<span>iconId: {tech.iconId}</span>
					</li>
				))}
			</ul>
		</main>
	);
}
