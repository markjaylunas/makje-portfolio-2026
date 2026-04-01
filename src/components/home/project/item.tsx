import { ArrowUpRight, Github, Like } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import ImageCarousel from "@/components/common/image-carousel";
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
	technologyList: { name: string; icon: string }[];
	tagList?: { name: string; slug: string }[];
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
}: ProjectCardProps) {
	const allPhotos = [coverImage, ...photos].filter(
		(v) => v !== null && v !== undefined,
	);

	return (
		<Item
			variant="default"
			role="listitem"
			className="p-0 rounded-none border-2 items-stretch"
		>
			<section className="relative">
				<ItemMedia variant="image" className="size-48 bg-muted">
					<ImageCarousel
						imageList={allPhotos}
						autoplay="onHover"
						delay={2000}
					/>
				</ItemMedia>
			</section>
			<ItemContent className="flex flex-col justify-between px-4 py-1.5">
				<div className="flex flex-col">
					<Link to="/project/$projectId" params={{ projectId }}>
						<ItemTitle className="line-clamp-1 text-xl">{name}</ItemTitle>
						<ItemDescription className="line-clamp-1 mt-2">
							{description}
						</ItemDescription>
					</Link>

					{tagList.length > 0 && (
						<div className="flex flex-wrap gap-2 mt-1">
							{tagList.map((tag) => (
								<Link
									key={tag.slug}
									to="/project/$projectId"
									params={{ projectId }}
									search={{ tag: tag.slug }} //TODO: Add tag search in project list loader
								>
									<Badge
										variant="outline"
										className="text-xs text-muted-foreground"
									>
										#{tag.name}
									</Badge>
								</Link>
							))}
						</div>
					)}
				</div>

				<div className="flex flex-col items-start gap-4">
					<ItemActions className="flex items-center justify-start gap-2 w-full flex-wrap">
						<ButtonGroup>
							{liveUrl && (
								<Button
									variant="default"
									size="sm"
									render={
										<Link to={liveUrl} target="_blank">
											<span className="sr-only md:not-sr-only">
												Live Preview
											</span>
											<HugeiconsIcon icon={ArrowUpRight} />
										</Link>
									}
								/>
							)}
							{repositoryUrl && (
								<Button
									variant="secondary"
									size="sm"
									render={
										<Link to={repositoryUrl} target="_blank">
											<HugeiconsIcon icon={Github} />
											<span className="sr-only md:not-sr-only">Repository</span>
										</Link>
									}
								/>
							)}
						</ButtonGroup>

						<Button variant="ghost">
							<HugeiconsIcon icon={Like} />
							{formatCompactCount(likesCount)}
						</Button>
					</ItemActions>

					<div className="flex flex-wrap gap-2">
						{technologyList.map((tech) => (
							<Badge variant="secondary" key={tech.name}>
								<img src={tech.icon} alt={tech.name} className="size-4" />
								{tech.name}
							</Badge>
						))}
					</div>
				</div>
			</ItemContent>
		</Item>
	);
}
