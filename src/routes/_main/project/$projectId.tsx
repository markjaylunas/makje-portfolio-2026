import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ProjectCard from "@/components/home/project/item";
import ContentMotion from "@/components/motion/content-motion";
import { getProjectOptions } from "@/data/options/project";
import { getProjectFnSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/$projectId")({
	params: getProjectFnSchema,
	loader: async ({ context, params: { projectId } }) => {
		const data = await context.queryClient.ensureQueryData(
			getProjectOptions({ projectId }),
		);

		if (!data) {
			throw notFound();
		}

		return data;
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { projectId } = Route.useParams();
	const { data: p } = useSuspenseQuery(getProjectOptions({ projectId }));

	if (!p) return null;

	return (
		<main className="relative min-h-screen pt-32 sm:pt-42">
			<PageHeaderAurora title={p.name} height="h-[80dvh]" />

			<div className="relative mx-auto max-w-(--breakpoint-lg) px-4">
				<ContentMotion>
					<div className="relative z-10 flex flex-col items-center justify-center mb-24 overflow-hidden">
						<ProjectCard
							projectId={p.id}
							name={p.name}
							coverImage={p.coverImage?.url}
							description={p.description}
							content={p.content}
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
					</div>
				</ContentMotion>
			</div>
		</main>
	);
}
