import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getProjectOptions } from "@/data/options/project";
import ProjectCard from "../home/project/item";

export default function ProjectDetails() {
	const { projectId } = useParams({ from: "/_main/project/$projectId" });
	const { data: p } = useSuspenseQuery(getProjectOptions({ projectId }));

	if (!p) return null;
	return (
		<article className="relative z-10 flex flex-col items-center justify-center mb-24 overflow-hidden">
			<ProjectCard
				projectId={p.id}
				name={p.name}
				coverImage={p.coverImage?.url}
				photos={p.photos.map((p) => p.media.url)}
				description={p.description}
				repositoryUrl={p.repositoryUrl}
				liveUrl={p.liveUrl}
				likesCount={p.likes.length}
				technologyList={p.technologies.map((t) => ({
					name: t.technology.name,
					icon: t.technology.icon.url,
				}))}
				tagList={p.tags.map((t) => ({
					name: t.tag.name,
					slug: t.tag.slug,
				}))}
			/>
		</article>
	);
}
