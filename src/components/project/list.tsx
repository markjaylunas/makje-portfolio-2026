import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { getProjectListOptions } from "@/data/options/project";
import ProjectCard from "../home/project/item";
import { ItemGroup } from "../ui/item";

export default function ProjectList() {
	const { query } = useSearch({ from: "/_main/project/" });
	const { data: projects } = useSuspenseQuery(getProjectListOptions({ query }));

	return (
		<ItemGroup className="gap-12">
			{projects?.map((project) => (
				<ProjectCard
					key={project.id}
					projectId={project.id}
					name={project.name}
					coverImage={project.coverImage?.url}
					photos={project.photos.map((p) => p.media.url)}
					description={project.description}
					repositoryUrl={project.repositoryUrl}
					liveUrl={project.liveUrl}
					likesCount={project.likes.length}
					technologyList={project.technologies.map((t) => ({
						name: t.technology.name,
						icon: t.technology.icon.url,
						url: t.technology.url,
					}))}
					tagList={project.tags.map((t) => ({
						name: t.tag.name,
						slug: t.tag.slug,
					}))}
				/>
			))}
		</ItemGroup>
	);
}
