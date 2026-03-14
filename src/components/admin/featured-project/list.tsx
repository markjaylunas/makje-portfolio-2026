import { ProjectCard } from "@/components/home/project/item";
import type { FeaturedProjectWithRelations } from "@/lib/types";

export default function FeaturedProjectList({
	featuredProjectList,
}: {
	featuredProjectList: FeaturedProjectWithRelations[];
}) {
	return (
		<ul className="flex flex-col gap-4">
			{featuredProjectList?.map((featuredProject) => (
				<li key={featuredProject.id}>
					<ProjectCard project={featuredProject} />
				</li>
			))}
		</ul>
	);
}
