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
import type { FeaturedProjectWithRelations } from "@/lib/types";

export function ProjectCard({
	project,
}: {
	project: FeaturedProjectWithRelations;
}) {
	const p = project.project;
	return (
		<Card className="relative mx-auto w-full pt-0">
			<div className="absolute inset-0 z-30 aspect-video bg-black/35" />
			<img
				src={p.coverImage.url}
				alt="Event cover"
				className="relative z-20 aspect-video w-full object-cover"
			/>
			<CardHeader>
				<CardAction>
					<Badge variant="secondary">{p.likesCount} likes</Badge>
				</CardAction>
				<CardTitle>{p.name}</CardTitle>
				<CardDescription>{p.description}</CardDescription>
			</CardHeader>

			<CardContent>
				<p>{p.content}</p>
			</CardContent>

			<CardFooter className="flex flex-col items-start gap-4">
				<div className="flex flex-wrap gap-2">
					{p.technologies.map((tech) => (
						<Badge variant="secondary" key={tech.technology.id}>
							<img
								src={tech.technology.icon.url}
								alt={tech.technology.name}
								className="size-4"
							/>
							{tech.technology.name}
						</Badge>
					))}
				</div>

				<ButtonGroup>
					{p.liveUrl && (
						<Button
							render={
								<Link to={p.liveUrl} target="_blank">
									<HugeiconsIcon icon={ArrowUpRight} />
									Live
								</Link>
							}
							size="sm"
							variant="default"
						/>
					)}
					{p.repositoryUrl && (
						<Button
							render={
								<Link to={p.repositoryUrl} target="_blank">
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
					{p.tags.map((t) => (
						<Badge variant="secondary" key={t.id}>
							{t.name}
						</Badge>
					))}
				</div>
			</CardFooter>
		</Card>
	);
}
