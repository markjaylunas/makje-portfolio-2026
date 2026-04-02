import {
	ArrowUpRight,
	Calendar,
	Github,
	Like,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	Link,
	useLocation,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getProjectOptions } from "@/data/options/project";
import { getSessionOptions } from "@/data/options/user";
import { useToggleProjectLike } from "@/hooks/use-toggle-project-like";
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
	tagList: { id: string; name: string; slug: string }[];
	coverImage?: string;
	photos?: string[];
	onToggleLike?: () => void;
	isLikePending?: boolean;
	isLiked?: boolean;
};

export default function ProjectDetailsData() {
	const navigate = useNavigate();
	const pathname = useLocation({
		select: (location) => location.pathname,
	});

	const { projectId } = useParams({ from: "/_main/project/$projectId" });
	const { data: p } = useSuspenseQuery(getProjectOptions({ projectId }));
	const { data: session } = useSuspenseQuery(getSessionOptions());

	const isLiked = p
		? p.likes.filter((v) => v.userId === session?.user.id).length > 0
		: false;

	const { mutate: toggleLike, isPending } = useToggleProjectLike(
		projectId,
		isLiked,
	);

	if (!p) return null;

	const handleToggleLike = () => {
		if (!session)
			return navigate({ to: "/login", search: { callbackURL: pathname } });
		toggleLike();
	};

	return (
		<ProjectDetails
			projectId={p.id}
			name={p.name}
			description={p.description}
			content={p.content}
			createdAt={new Date(p.createdAt)}
			liveUrl={p.liveUrl}
			repositoryUrl={p.repositoryUrl}
			likesCount={p.likesCount}
			isLiked={isLiked}
			technologyList={p.technologies.map((t) => ({
				id: t.technology.id,
				name: t.technology.name,
				icon: t.technology.icon.url,
				url: t.technology.url,
			}))}
			tagList={p.tags.map((t) => ({
				id: t.tag.id,
				name: t.tag.name,
				slug: t.tag.slug,
			}))}
			coverImage={p.coverImage?.url}
			photos={p.photos.map((p) => p.media.url)}
			onToggleLike={handleToggleLike}
			isLikePending={isPending}
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
	onToggleLike,
	isLikePending = false,
	isLiked = false,
}: ProjectDetailsProps) {
	const allPhotos = [coverImage, ...photos].filter(
		(v): v is string => v !== null && v !== undefined,
	);

	return (
		<article className="flex flex-col gap-12 w-full">
			{/* Header Section */}
			<header className="flex flex-col gap-6">
				<div className="flex flex-col gap-4">
					<div className="flex flex-wrap items-center gap-3">
						{tagList.map((t) => (
							<Link key={t.id} to="/project" search={{ tag: t.slug }}>
								<Badge variant="outline">#{t.name}</Badge>
							</Link>
						))}
					</div>
					<h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
						{name}
					</h1>
					{description && (
						<p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium max-w-2xl leading-relaxed">
							{description}
						</p>
					)}
				</div>

				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/5">
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2 text-muted-foreground/80">
							<HugeiconsIcon icon={Calendar} className="size-4 sm:size-5" />
							<span className="text-xs sm:text-sm font-medium">
								{dateToMonthYear(new Date(createdAt))}
							</span>
						</div>
						<Button
							variant={isLiked ? "default" : "outline"}
							size="sm"
							className="h-8 sm:h-9 px-2 sm:px-3"
							onClick={(e) => {
								e.preventDefault();
								onToggleLike?.();
							}}
							disabled={isLikePending}
						>
							<HugeiconsIcon
								icon={Like}
								className={isLiked ? "fill-primary" : ""}
							/>
							<span className="text-xs sm:text-sm">
								{formatCompactCount(likesCount)}
							</span>
						</Button>
					</div>

					<div className="flex items-center gap-3 w-full sm:w-auto">
						<ButtonGroup className="w-full sm:w-auto">
							{liveUrl && (
								<Button
									variant="default"
									nativeButton={false}
									className="flex-1 sm:flex-none rounded-full px-6 group"
									render={
										<Link to={liveUrl} target="_blank">
											<span className="text-sm">Live</span>
											<HugeiconsIcon icon={ArrowUpRight} className="size-4" />
										</Link>
									}
								/>
							)}
							{repositoryUrl && (
								<Button
									variant="secondary"
									nativeButton={false}
									className="flex-1 sm:flex-none rounded-full px-6"
									render={
										<Link to={repositoryUrl} target="_blank">
											<HugeiconsIcon icon={Github} className="size-4" />
											<span className="text-sm">Repo</span>
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
