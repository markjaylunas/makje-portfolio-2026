import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import ProjectCard from "@/components/home/project/item";
import { getProjectOptions } from "@/data/options/project";

export default function ProjectItemSection() {
	const params = useParams({ from: "/_protected/admin/project/$projectId/" });
	const { data: p } = useSuspenseQuery(
		getProjectOptions({ projectId: params.projectId }),
	);

	if (!p) return null;

	return (
		<ProjectCard
			projectId={p.id}
			name={p.name}
			coverImage={p.coverImage?.url}
			photos={p.photos.map((p) => p.media.url)}
			description={p.description}
			repositoryUrl={p.repositoryUrl}
			liveUrl={p.liveUrl}
			likesCount={p.likesCount}
			technologyList={p.technologies.map((t) => ({
				name: t.technology.name,
				icon: t.technology.icon.url,
			}))}
			tagList={p.tags.map((t) => ({
				name: t.tag.name,
				slug: t.tag.slug,
			}))}
		/>
	);
}
