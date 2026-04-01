import { useSuspenseQuery } from "@tanstack/react-query";
import { useId } from "react";
import SectionHeader from "@/components/common/section-header";
import { ItemGroup } from "@/components/ui/item";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import ProjectCard from "./item";

export default function FeaturedProjectSection() {
	const { data: projects } = useSuspenseQuery(getFeaturedProjectListOptions());
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
						likesCount={project.likes.length}
						technologyList={project.technologies.map((t) => ({
							name: t.technology.name,
							icon: t.technology.icon?.url,
							url: t.technology.url,
						}))}
						tagList={project.tags.map((t) => ({
							name: t.tag.name,
							slug: t.tag.slug,
						}))}
					/>
				))}
			</ItemGroup>
		</section>
	);
}
