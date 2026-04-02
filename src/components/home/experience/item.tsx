import { Calendar } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge } from "@/components/ui/badge";
import type { TechnologyWithIcon } from "@/lib/types";

export function ExperienceItem({
	company,
	description,
	period,
	responsibilities,
	technologies,
	title,
	logo,
}: {
	company: string;
	title: string;
	period: string;
	description: string;
	logo?: string;
	responsibilities: string[];
	technologies: TechnologyWithIcon[];
}) {
	return (
		<li className="relative mb-12 last:mb-0 pl-8">
			{/* Decorative Dot */}
			<div
				className="absolute top-3 -left-1.75 h-3 w-3 rounded-full border-2 border-primary bg-background"
				aria-hidden="true"
			/>

			<article className="flex flex-col gap-4 md:flex-row md:items-end md:gap-8">
				<div className="flex-1 space-y-4">
					<header className="space-y-3">
						<div className="flex items-center gap-2.5">
							<div
								className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent"
								aria-hidden="true"
							>
								<img
									src={logo}
									alt={company}
									className="text-muted-foreground rounded-full overflow-hidden"
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
							{responsibilities.map((item: string) => (
								<li key={item}>
									<p className="text-left md:text-justify">{item}</p>
								</li>
							))}
						</ul>
					</div>
				</div>

				<aside className="w-full shrink-0 pt-2 md:w-48 md:pt-0 lg:w-64">
					<span className="sr-only">Technology used:</span>
					<ul className="flex flex-wrap gap-2">
						{technologies.map((tech) => (
							<li key={tech.id}>
								<a
									href={tech.url}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`Learn more about ${tech.name}`}
								>
									<Badge
										className="rounded-full hover:opacity-80"
										variant="secondary"
									>
										<img
											src={tech.icon.url}
											alt={tech.icon.altText || tech.name}
											className="size-4"
										/>
										{tech.name}
									</Badge>
								</a>
							</li>
						))}
					</ul>
				</aside>
			</article>
		</li>
	);
}
