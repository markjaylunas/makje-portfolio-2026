import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import ProjectItem from "./item";

export default function FeaturedProjectSection() {
	const { data: projects } = useQuery(getFeaturedProjectListOptions());

	return (
		<section>
			<ul>
				{projects?.map((project) => (
					<ProjectItem key={project.id} project={project} />
				))}
			</ul>
		</section>
	);
}
