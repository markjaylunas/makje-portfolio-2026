import ProjectCard from "@/components/home/project/item";
import type { FeaturedProjectWithRelations } from "@/lib/types";

export default function FeaturedProjectList({
	featuredProjectList,
}: {
	featuredProjectList: FeaturedProjectWithRelations[];
}) {
	return (
		<ul className="flex flex-col gap-4">
			{featuredProjectList?.map((featuredProject) => {
				const p = featuredProject.project;
				const technologyList = p.technologies.map((t) => ({
					name: t.technology.name,
					icon: t.technology.icon.url,
				}));
				const tagList = p.tags.map((t) => ({
					name: t.name,
					slug: t.slug,
				}));

				return (
					<li key={featuredProject.id}>
						<ProjectCard
							coverImage={p.coverImage.url}
							name={p.name}
							description={p.description}
							content={p.content}
							repositoryUrl={p.repositoryUrl}
							liveUrl={p.liveUrl}
							likesCount={p.likesCount}
							technologyList={technologyList}
							tagList={tagList}
						/>
					</li>
				);
			})}
		</ul>
	);
}
