import { createFileRoute, notFound } from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import ProjectDetails from "@/components/project/details";
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
	head: ({ loaderData }) => {
		const title = loaderData
			? `${loaderData.name} | Makje Projects`
			: "Project | Makje";
		const description =
			loaderData?.description ?? "Project details and overview.";
		const image = loaderData?.coverImage?.url ?? ""; // fallback if image exists
		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				...(image ? [{ property: "og:image", content: image }] : []),
				{ property: "og:type", content: "article" },
				{
					name: "twitter:card",
					content: image ? "summary_large_image" : "summary",
				},
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				...(image ? [{ name: "twitter:image", content: image }] : []),
			],
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="relative min-h-screen pt-16 sm:pt-42">
			<PageHeaderAurora title="Project" height="h-[80dvh]" as="p" />

			<div className="relative mx-auto max-w-(--breakpoint-lg) min-h-dvh px-4 py-36">
				<ContentMotion>
					<ProjectDetails />
				</ContentMotion>
			</div>
		</main>
	);
}
