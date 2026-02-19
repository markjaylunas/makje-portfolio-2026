import { Building, Calendar } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/lib/types";

export function ExperienceItem({ experience }: { experience: Experience }) {
	const {
		company,
		title,
		period,
		description,
		responsibilities,
		technologies,
	} = experience;

	return (
		<li className="relative mb-12 last:mb-0 pl-8">
			{/* Decorative Dot */}
			<div
				className="absolute top-3 -left-[7px] h-3 w-3 rounded-full border-2 border-primary bg-background"
				aria-hidden="true"
			/>

			<article className="space-y-4">
				<header className="space-y-3">
					<div className="flex items-center gap-2.5">
						<div
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent"
							aria-hidden="true"
						>
							<HugeiconsIcon
								icon={Building}
								size={16}
								className="text-muted-foreground"
							/>
						</div>
						<span className="font-medium text-base">{company}</span>
					</div>

					<div>
						<h3 className="font-semibold text-xl tracking-[-0.01em]">
							{title}
						</h3>
						<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
							<HugeiconsIcon icon={Calendar} size={16} aria-hidden="true" />
							<span className="sr-only">Period:</span>
							<time>{period}</time>
						</div>
					</div>
				</header>

				<div className="space-y-3">
					<p className="text-pretty font-medium text-sm sm:text-base">
						{description}
					</p>
					<ul className="list-disc space-y-2 pl-4 text-sm text-muted-foreground">
						{responsibilities.map((item) => (
							<li key={item}>{item}</li>
						))}
					</ul>
				</div>

				<footer className="pt-2">
					<span className="sr-only">Technologies used:</span>
					<div className="flex flex-wrap gap-2">
						{technologies.map((tech) => (
							<a href={tech.url} key={tech.name}>
								<Badge className="rounded-full" variant="secondary">
									{tech.name}
								</Badge>
							</a>
						))}
					</div>
				</footer>
			</article>
		</li>
	);
}
