import { ArrowLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	createFileRoute,
	isNotFound,
	Link,
	notFound,
} from "@tanstack/react-router";
import PageHeaderAurora from "@/components/common/page-header-aurora";
import ContentMotion from "@/components/motion/content-motion";
import FadeDownMotion from "@/components/motion/fade-down-motion";
import ProjectDetailsData from "@/components/project/details";
import { buttonVariants } from "@/components/ui/button";
import { getProjectOptions } from "@/data/options/project";
import { getSessionOptions } from "@/data/options/user";
import { getProjectFnSchema } from "@/form-validators/project";

export const Route = createFileRoute("/_main/project/$projectId")({
	params: getProjectFnSchema,
	loader: async ({ context, params: { projectId } }) => {
		try {
			const [sessionData, data] = await Promise.all([
				context.queryClient.ensureQueryData(getSessionOptions()),
				context.queryClient.ensureQueryData(getProjectOptions({ projectId })),
			]);

			if (!data) {
				throw notFound();
			}

			return {
				project: data,
				session: sessionData,
			};
		} catch (error) {
			if (isNotFound(error)) {
				throw error;
			}
			throw notFound();
		}
	},
	head: ({ loaderData }) => {
		const title = loaderData
			? `${loaderData.project.name} | Makje Projects`
			: "Project | Makje";
		const description =
			loaderData?.project.description ?? "Project details and overview.";
		const image = loaderData?.project.coverImage?.url ?? ""; // fallback if image exists
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
	const { projectId } = Route.useParams();
	return (
		<main className="relative min-h-screen pt-16 sm:pt-42">
			<div className="dark-dot-matrix-background absolute inset-0 h-full z-0" />
			<PageHeaderAurora title="Project" height="h-[80dvh]" as="p" />

			<div className="relative mx-auto max-w-5xl min-h-dvh px-4 py-24 sm:py-36">
				<div className="flex justify-end mb-6">
					<FadeDownMotion>
						<Link
							to="/project"
							className={buttonVariants({
								variant: "secondary",
								size: "sm",
							})}
						>
							<HugeiconsIcon icon={ArrowLeft} />
							<span className="sr-only sm:not-sr-only">Back to Projects</span>
						</Link>
					</FadeDownMotion>
				</div>

				<ContentMotion>
					<ProjectDetailsData projectId={projectId} />
				</ContentMotion>
			</div>
		</main>
	);
}
