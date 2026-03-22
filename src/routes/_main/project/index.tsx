import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ProjectCard from "@/components/home/project/item";
import ContentMotion from "@/components/motion/content-motion";
import { getProjectListOptions } from "@/data/options/project";
import { searchSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/")({
	component: RouteComponent,
	validateSearch: (search) => searchSchema.parse(search),
	loaderDeps: ({ search: { query } }) => ({ query }),
	loader: async ({ context, deps: { query } }) => {
		return await context.queryClient.ensureQueryData(
			getProjectListOptions({ query }),
		);
	},
});

function RouteComponent() {
	const { query } = Route.useSearch();
	const { data: projects } = useSuspenseQuery(getProjectListOptions({ query }));

	return (
		<main className="relative min-h-screen">
			<PageHeaderAurora title="Projects" />

			<div className="relative mx-auto max-w-(--breakpoint-lg) px-4 pt-32 sm:px-6">
				<ContentMotion>
					<div className="relative z-10 grid grid-cols-1 gap-12 mb-24 mt-32 sm:mt-42 overflow-hidden">
						{projects?.map((project) => (
							<article key={project.id} className="w-full">
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
						))}
					</div>
				</ContentMotion>
			</div>
		</main>
	);
}
