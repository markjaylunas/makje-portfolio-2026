import { ArrowUpRight, Github } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function ProjectCard({
	coverImage,
	name,
	description,
	content,
	repositoryUrl,
	liveUrl,
	likesCount,
	technologyList,
	tagList,
}: {
	coverImage?: string;
	name: string;
	description: string | null;
	content: string | null;
	repositoryUrl: string | null;
	liveUrl: string | null;
	likesCount: number;
	technologyList: { name: string; icon: string }[];
	tagList: { name: string; slug: string | null }[];
}) {
	return (
		<Card className="relative mx-auto w-full pt-0">
			<div className="absolute inset-0 z-30 aspect-video bg-black/35" />
			<img
				src={coverImage}
				alt="Event cover"
				className="relative z-20 aspect-video w-full object-cover"
			/>
			<CardHeader>
				<CardAction>
					<Badge variant="secondary">{likesCount} likes</Badge>
				</CardAction>
				<CardTitle>{name}</CardTitle>
				<CardDescription className="line-clamp-2 text-pretty">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<p className="line-clamp-5 text-pretty">{content}</p>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<div className="flex flex-wrap gap-2">
					{technologyList.map((tech) => (
						<Badge variant="secondary" key={tech.name}>
							<img src={tech.icon} alt={tech.name} className="size-4" />
							{tech.name}
						</Badge>
					))}
				</div>

				<ButtonGroup>
					{liveUrl && (
						<Button
							render={
								<Link to={liveUrl} target="_blank">
									<HugeiconsIcon icon={ArrowUpRight} />
									Live
								</Link>
							}
							size="sm"
							variant="default"
						/>
					)}
					{repositoryUrl && (
						<Button
							render={
								<Link to={repositoryUrl} target="_blank">
									<HugeiconsIcon icon={Github} />
									Repository
								</Link>
							}
							size="sm"
							variant="outline"
						/>
					)}
				</ButtonGroup>

				<div className="flex flex-wrap gap-2">
					{tagList.map((t) => (
						<Badge variant="secondary" key={t.slug}>
							{t.name}
						</Badge>
					))}
				</div>
			</CardFooter>
		</Card>
	);
}
