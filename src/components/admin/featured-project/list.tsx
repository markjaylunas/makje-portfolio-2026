import ProjectCard from "@/components/home/project/item";
import { ItemGroup } from "@/components/ui/item";
import type { Session } from "@/lib/auth.server";
import type { FeaturedProjectWithRelations } from "@/lib/types";

export default function FeaturedProjectList({
	featuredProjectList,
	session,
}: {
	featuredProjectList: FeaturedProjectWithRelations[];
	session?: Session;
}) {
	return (
		<ItemGroup className="flex flex-col gap-6">
			{featuredProjectList?.map((featuredProject) => {
				const p = featuredProject.project;
				const technologyList = p.technologies.map((t) => ({
					name: t.technology.name,
					icon: t.technology.icon.url,
					url: t.technology.url,
				}));
				const tagList = p.tags.map((t) => ({
					name: t.tag.name,
					slug: t.tag.slug,
				}));

				const isLiked =
					p.likes.filter((v) => v.userId === session?.user.id).length > 0;

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
						session={session}
						isLiked={isLiked}
					/>
				);
			})}
		</ItemGroup>
	);
}
