import { ArrowUpRight, Github, Like } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemFooter,
	ItemTitle,
} from "@/components/ui/item";
import { formatCompactCount } from "@/lib/utils";
import ProjectCardImage from "./item-image";

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
		<Item variant="outline">
			<ProjectCardImage projectId={projectId} allPhotos={allPhotos} />

			<ItemContent>
				{tagList.length > 0 && (
					<div className="flex flex-wrap gap-2">
						{tagList.map((tag) => (
							<Link
								key={tag.slug}
								to="/project/$projectId"
								params={{ projectId }}
								search={{ tag: tag.slug }} //TODO: Add tag search in project list loader
							>
								<Badge
									variant="ghost"
									className="text-xs text-muted-foreground"
								>
									#{tag.name}
								</Badge>
							</Link>
						))}
					</div>
				)}

				<Link to="/project/$projectId" params={{ projectId }}>
					<ItemTitle className="truncate">{name}</ItemTitle>
				</Link>
				<ItemDescription className="truncate">{description}</ItemDescription>
			</ItemContent>

			<ItemFooter className="flex flex-col items-start gap-4">
				<div className="flex flex-wrap gap-2">
					{technologyList.map((tech) => (
						<Badge variant="secondary" key={tech.name}>
							<img src={tech.icon} alt={tech.name} className="size-4" />
							{tech.name}
						</Badge>
					))}
				</div>

				<ItemActions className="flex items-center justify-between gap-2 w-full flex-wrap">
					<Button variant="outline" size="xs" className="text-xs font-normal">
						<HugeiconsIcon icon={Like} />
						{formatCompactCount(likesCount)}
					</Button>

					<ButtonGroup>
						{liveUrl && (
							<Button
								variant="default"
								size="sm"
								render={
									<Link to={liveUrl} target="_blank">
										<HugeiconsIcon icon={ArrowUpRight} />
										<span className="sr-only md:not-sr-only">Live</span>
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
				</ItemActions>
			</ItemFooter>
		</Item>
	);
}
