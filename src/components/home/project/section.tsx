import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import ProjectCard from "./item";

export default function FeaturedProjectSection() {
	const { data: projects } = useQuery(getFeaturedProjectListOptions());

	return (
		<section className="mx-auto max-w-(--breakpoint-sm) px-6">
			<ul className="flex flex-col gap-12">
				{projects?.map(({ project }) => (
					<li key={project.id} className="size-full relative">
						<ProjectCard
							coverImage={project.coverImage?.url}
							name={project.name}
							description={project.description}
							content={project.content}
							repositoryUrl={project.repositoryUrl}
							liveUrl={project.liveUrl}
							likesCount={project.likes.length}
							technologyList={project.technologies.map((t) => ({
								name: t.technology.name,
								icon: t.technology.icon?.url,
							}))}
							tagList={project.tags.map((t) => ({
								name: t.tag.name,
								slug: t.tag.slug,
							}))}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
