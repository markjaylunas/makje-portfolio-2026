import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import CreateButton from "@/components/common/create-button";
import { db } from "@/db";

const allTechFn = createServerFn({ method: "GET" }).handler(async () => {
	return await db.query.technology.findMany();
});

export const Route = createFileRoute("/_protected/admin/technologies/")({
	component: RouteComponent,
	loader: () => allTechFn(),
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
					<li key={tech.id}>{tech.name}</li>
				))}
			</ul>
		</main>
	);
}
