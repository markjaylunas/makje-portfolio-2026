import { ChevronRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useId } from "react";
import SectionHeader from "@/components/common/section-header";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@/components/ui/item";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { getSessionOptions } from "@/data/options/user";
import ProjectCard from "./item";

export default function FeaturedProjectSection() {
	const { data: projects } = useSuspenseQuery(getFeaturedProjectListOptions());
	const { data: session } = useSuspenseQuery(getSessionOptions());

	const sectionHeadingId = useId();

	return (
		<section
			className="mx-auto max-w-(--breakpoint-lg) px-4"
			aria-labelledby={sectionHeadingId}
		>
			<SectionHeader
				id={sectionHeadingId}
				subtitle="Featured Projects"
				title="Crafting digital experiences."
				description="A collection of web applications, experiments, and some pieces of code that I have worked on."
			/>
			<ItemGroup className="gap-12">
				{projects?.map(({ project }) => (
					<ProjectCard
						key={project.id}
						projectId={project.id}
						coverImage={project.coverImage?.url}
						photos={project.photos.map((p) => p.media.url)}
						name={project.name}
						description={project.description}
						repositoryUrl={project.repositoryUrl}
						liveUrl={project.liveUrl}
						likesCount={project.likesCount}
						technologyList={project.technologies.map((t) => ({
							name: t.technology.name,
							icon: t.technology.icon?.url,
							url: t.technology.url,
						}))}
						tagList={project.tags.map((t) => ({
							name: t.tag.name,
							slug: t.tag.slug,
						}))}
						session={session}
						isLiked={project.likes.length > 0}
					/>
				))}

				<Item
					variant="muted"
					className="transition-all duration-300 ease-in-out"
					render={
						<Link to="/project">
							<ItemContent>
								<ItemTitle>View all projects</ItemTitle>
								<ItemDescription>
									Explore the full collection of projects I've worked on.
								</ItemDescription>
							</ItemContent>
							<ItemActions>
								<HugeiconsIcon icon={ChevronRight} className="size-4" />
							</ItemActions>
						</Link>
					}
				/>
			</ItemGroup>
		</section>
	);
}
