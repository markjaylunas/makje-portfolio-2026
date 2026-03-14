import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { ProjectCard } from "./item";

export default function FeaturedProjectSection() {
	const { data: projects } = useQuery(getFeaturedProjectListOptions());

	return (
		<section className="mx-auto max-w-(--breakpoint-sm) px-6">
			<ul className="flex flex-col gap-12">
				{projects?.map((project) => (
					<li key={project.id} className="size-full relative">
						<ProjectCard project={project} />
					</li>
				))}
			</ul>
		</section>
	);
}
