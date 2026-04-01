import {
	ArrowUpRight,
	Calendar,
	Github,
	Like,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getProjectOptions } from "@/data/options/project";
import { dateToMonthYear, formatCompactCount } from "@/lib/utils";
import ImageCarousel from "../common/image-carousel";
import { MarkdownRenderer } from "../common/md-render";

export type ProjectDetailsProps = {
	projectId: string;
	name: string;
	description: string | null;
	content: string | null;
	createdAt: Date;
	liveUrl: string | null;
	repositoryUrl: string | null;
	likesCount: number;
	technologyList: { id: string; name: string; icon: string; url: string }[];
	tagList: { id: string; name: string }[];
	coverImage?: string;
	photos?: string[];
};

export default function ProjectDetailsData() {
	const { projectId } = useParams({ from: "/_main/project/$projectId" });
	const { data: p } = useSuspenseQuery(getProjectOptions({ projectId }));

	if (!p) return null;

	return (
		<ProjectDetails
			projectId={p.id}
			name={p.name}
			description={p.description}
			content={p.content}
			createdAt={new Date(p.createdAt)}
			liveUrl={p.liveUrl}
			repositoryUrl={p.repositoryUrl}
			likesCount={p.likes.length}
			technologyList={p.technologies.map((t) => ({
				id: t.technology.id,
				name: t.technology.name,
				icon: t.technology.icon.url,
				url: t.technology.url,
			}))}
			tagList={p.tags.map((t) => ({
				id: t.tag.id,
				name: t.tag.name,
			}))}
			coverImage={p.coverImage?.url}
			photos={p.photos.map((p) => p.media.url)}
		/>
	);
}

export function ProjectDetails({
	name,
	description,
	content,
	createdAt,
	liveUrl,
	repositoryUrl,
	likesCount,
	technologyList,
	tagList,
	coverImage,
	photos = [],
}: ProjectDetailsProps) {
	const allPhotos = [coverImage, ...photos].filter(
		(v): v is string => v !== null && v !== undefined,
	);

	return (
		<article className="flex flex-col gap-12 w-full max-w-4xl mx-auto">
			{/* Header Section */}
			<header className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-wrap items-center gap-3">
						{tagList.map((t) => (
							<Badge
								key={t.id}
								variant="outline"
								className="rounded-full px-4 py-1 text-xs font-medium border-emerald-500/20 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors cursor-pointer"
							>
								#{t.name}
							</Badge>
						))}
					</div>
					<h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
						{name}
					</h1>
					{description && (
						<p className="text-xl text-muted-foreground font-medium max-w-2xl">
							{description}
						</p>
					)}
				</div>

				<div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/5">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2 text-muted-foreground">
							<HugeiconsIcon icon={Calendar} className="size-5" />
							<span className="text-sm font-medium">
								{dateToMonthYear(new Date(createdAt))}
							</span>
						</div>
						<Button variant="ghost">
							<HugeiconsIcon icon={Like} />
							{formatCompactCount(likesCount)}
						</Button>
					</div>

					<div className="flex items-center gap-3">
						<ButtonGroup>
							{liveUrl && (
								<Button
									variant="default"
									className="rounded-full px-6 group"
									render={
										<Link to={liveUrl} target="_blank">
											<span>Live</span>
											<HugeiconsIcon
												icon={ArrowUpRight}
												className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
											/>
										</Link>
									}
								/>
							)}
							{repositoryUrl && (
								<Button
									variant="secondary"
									className="rounded-full px-6"
									render={
										<Link to={repositoryUrl} target="_blank">
											<HugeiconsIcon icon={Github} />
											<span>Repo</span>
										</Link>
									}
								/>
							)}
						</ButtonGroup>
					</div>
				</div>
			</header>

			{/* Hero Image / Carousel */}
			<section className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-muted/20">
				<ImageCarousel imageList={allPhotos} autoplay="auto" />
			</section>

			{/* Main Content & Sidebar Layout */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
				<div className="lg:col-span-8 flex flex-col gap-10">
					{content && <MarkdownRenderer content={content} />}
				</div>

				<aside className="lg:col-span-4 flex flex-col gap-8 sticky top-32 h-fit">
					<div className="flex flex-col gap-4 p-6 rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm">
						<h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/60">
							Technologies
						</h3>
						<div className="flex flex-wrap gap-2">
							{technologyList.map((t) => (
								<a
									key={t.id}
									href={t.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group block bg-background outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
								>
									<Badge
										variant="secondary"
										className="rounded-full px-3 py-1.5 flex items-center gap-2 bg-white/5 hover:bg-white/10 transition-colors border-white/5"
									>
										<img src={t.icon} alt={t.name} className="size-4" />
										<span className="text-sm">{t.name}</span>
									</Badge>
								</a>
							))}
						</div>
					</div>
				</aside>
			</div>
		</article>
	);
}
