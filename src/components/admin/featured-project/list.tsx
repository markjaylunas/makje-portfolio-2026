import ProjectCard from "@/components/home/project/item";
import { ItemGroup } from "@/components/ui/item";
import type { FeaturedProjectWithRelations } from "@/lib/types";

export default function FeaturedProjectList({
	featuredProjectList,
}: {
	featuredProjectList: FeaturedProjectWithRelations[];
}) {
	return (
		<ItemGroup className="grid grid-cols-3 gap-4">
			{featuredProjectList?.map((featuredProject) => {
				const p = featuredProject.project;
				const technologyList = p.technologies.map((t) => ({
					name: t.technology.name,
					icon: t.technology.icon.url,
				}));
				const tagList = p.tags.map((t) => ({
					name: t.tag.name,
					slug: t.tag.slug,
				}));

				return (
					<ProjectCard
						key={featuredProject.id}
						projectId={p.id}
						coverImage={p.coverImage?.url}
						photos={p.photos.map((p) => p.media.url)}
						name={p.name}
						description={p.description}
						repositoryUrl={p.repositoryUrl}
						liveUrl={p.liveUrl}
						likesCount={p.likesCount}
						technologyList={technologyList}
						tagList={tagList}
					/>
				);
			})}
		</ItemGroup>
	);
}
