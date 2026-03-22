import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { getProjectListOptions } from "@/data/options/project";
import ProjectCard from "../home/project/item";

export default function ProjectList() {
	const { query } = useSearch({ from: "/_main/project/" });
	const { data: projects } = useSuspenseQuery(getProjectListOptions({ query }));

	return (
		<ul className="relative z-10 grid grid-cols-2 sm:gap-12 mb-24 mt-32 sm:mt-42 overflow-hidden">
			{projects?.map((project) => (
				<li key={project.id}>
					<article className="w-full">
						<ProjectCard
							projectId={project.id}
							name={project.name}
							coverImage={project.coverImage?.url}
							description={project.description}
							content={project.content}
							repositoryUrl={project.repositoryUrl}
							liveUrl={project.liveUrl}
							likesCount={project.likes.length}
							technologyList={project.technologies.map((t) => ({
								name: t.technology.name,
								icon: t.technology.icon.url,
							}))}
							tagList={project.tags.map((t) => ({
								name: t.tag.name,
								slug: t.tag.slug,
							}))}
						/>
					</article>
				</li>
			))}
		</ul>
	);
}
