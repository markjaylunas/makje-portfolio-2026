import { ArrowUpRight, Github, Like } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import ImageCarousel from "@/components/common/image-carousel";
import { OverflowList } from "@/components/common/overflow-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "@/components/ui/item";
import { useToggleProjectLike } from "@/hooks/use-toggle-project-like";
import type { Session } from "@/lib/auth.server";
import { formatCompactCount } from "@/lib/utils";

type ProjectCardProps = {
	projectId: string;
	coverImage?: string;
	photos?: string[];
	name: string;
	description: string | null;
	repositoryUrl: string | null;
	liveUrl: string | null;
	likesCount: number;
	technologyList: { name: string; icon: string; url: string }[];
	tagList?: { name: string; slug: string }[];
	isLiked?: boolean;
	session?: Session;
};

export default function ProjectCard({
	projectId,
	coverImage,
	photos = [],
	name,
	description,
	repositoryUrl,
	liveUrl,
	likesCount,
	technologyList,
	tagList = [],
	isLiked = false,
	session,
}: ProjectCardProps) {
	const navigate = useNavigate();
	const pathname = useLocation({
		select: (location) => location.pathname,
	});
	const allPhotos = [coverImage, ...photos].filter(
		(v) => v !== null && v !== undefined,
	);

	const { mutate: toggleLike, isPending } = useToggleProjectLike(
		projectId,
		isLiked,
		session,
	);

	const handleToggleLike = () => {
		if (!session)
			return navigate({ to: "/login", search: { callbackURL: pathname } });
		toggleLike();
	};

	return (
		<Item
			variant="default"
			role="listitem"
			className="p-0 rounded-none border-2 items-stretch gap-6"
		>
			<div className="relative">
				<ItemMedia
					variant="image"
					className="h-auto w-full sm:h-48  aspect-video sm:w-auto bg-muted border border-muted"
				>
					<ImageCarousel
						imageList={allPhotos}
						autoplay="onHover"
						delay={2000}
					/>
				</ItemMedia>
			</div>
			<ItemContent className="flex flex-col gap-6 py-1.5">
				<Link
					to="/project/$projectId"
					params={{ projectId }}
					className="group/project-link"
				>
					<ItemTitle className="line-clamp-1 text-xl transition-all group-hover/project-link:text-chart-2 duration-300 ease-in-out">
						{name}
					</ItemTitle>
					<ItemDescription className="line-clamp-2 mt-2 transition-opacity group-hover/project-link:opacity-70">
						{description}
					</ItemDescription>
				</Link>

				<ItemActions className="flex items-center justify-start gap-2 w-full flex-wrap">
					<ButtonGroup>
						{liveUrl && (
							<Button
								variant="default"
								size="sm"
								nativeButton={false}
								render={
									<Link to={liveUrl} target="_blank">
										View Site
										<HugeiconsIcon icon={ArrowUpRight} />
									</Link>
								}
							/>
						)}
						{repositoryUrl && (
							<Button
								variant="secondary"
								size="sm"
								nativeButton={false}
								render={
									<Link to={repositoryUrl} target="_blank">
										<HugeiconsIcon icon={Github} />
										Repo
									</Link>
								}
							/>
						)}
					</ButtonGroup>

					<Button
						variant={isLiked ? "default" : "ghost"}
						size="sm"
						onClick={(e) => {
							e.preventDefault();
							handleToggleLike();
						}}
						className="cursor-pointer"
						disabled={isPending}
					>
						<HugeiconsIcon
							icon={Like}
							className={`size-4 ${isLiked ? "fill-primary" : ""}`}
						/>
						{formatCompactCount(likesCount)}
					</Button>
				</ItemActions>

				<OverflowList
					listName="technology"
					initial={3}
					list={technologyList.map((tech) => (
						<a
							key={tech.name}
							href={tech.url}
							target="_blank"
							rel="noopener noreferrer"
						>
							<Badge variant="secondary" className="whitespace-nowrap">
								<img src={tech.icon} alt={tech.name} className="size-4" />
								{tech.name}
							</Badge>
						</a>
					))}
				/>

				<div className="flex flex-wrap gap-2 sr-only">
					{tagList.map((tag) => (
						<Link key={tag.slug} to="/project" search={{ tag: tag.slug }}>
							<Badge
								variant="outline"
								className="text-xs text-muted-foreground whitespace-nowrap"
							>
								#{tag.name}
							</Badge>
						</Link>
					))}
				</div>
			</ItemContent>
		</Item>
	);
}
