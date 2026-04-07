import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { getProjectListOptions } from "@/data/options/project";
import { getSessionOptions } from "@/data/options/user";
import ProjectCard from "../home/project/item";
import { ItemGroup } from "../ui/item";

export default function ProjectList() {
	const { query, tag } = useSearch({ from: "/_main/project/" });
	const { data: projects } = useSuspenseQuery(
		getProjectListOptions({ query, tag }),
	);
	const { data: session } = useSuspenseQuery(getSessionOptions());

	return (
		<ItemGroup className="gap-12">
			{projects?.map((project, index) => (
				<ProjectCard
					key={project.id}
					projectId={project.id}
					name={project.name}
					coverImage={project.coverImage?.url}
					photos={project.photos.map((p) => p.media.url)}
					description={project.description}
					repositoryUrl={project.repositoryUrl}
					liveUrl={project.liveUrl}
					likesCount={project.likesCount}
					priority={index < 2}
					isLiked={
						project.likes.filter((v) => v.userId === session?.user.id).length >
						0
					}
					technologyList={project.technologies.map((t) => ({
						name: t.technology.name,
						icon: t.technology.icon.url,
						url: t.technology.url,
					}))}
					tagList={project.tags.map((t) => ({
						name: t.tag.name,
						slug: t.tag.slug,
					}))}
					session={session}
				/>
			))}
		</ItemGroup>
	);
}
