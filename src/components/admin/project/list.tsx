import type { ProjectWithRelations } from "@/lib/types";

export default function ProjectList({
	projectList,
}: {
	projectList: ProjectWithRelations[];
}) {
	return (
		<ul className="flex flex-col gap-4">
			{projectList?.map((project) => (
				<li key={project.id}>{project.name}</li>
			))}
		</ul>
	);
}
