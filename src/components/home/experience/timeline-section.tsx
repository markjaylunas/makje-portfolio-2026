import { useId } from "react";
import { experiences } from "@/assets/home/experiences";
import H2 from "@/components/common/H2";
import { ExperienceItem } from "./timeline-item";

export default function ExperienceTimelineSection() {
	const sectionHeadingId = useId();

	return (
		<section
			className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20"
			aria-labelledby={sectionHeadingId}
		>
			<H2 id={sectionHeadingId}>Work Experience</H2>
			<p className="prose text-pretty text-muted-foreground mt-4">
				I have worked on a variety of projects, from small personal projects to
				large enterprise applications. Here are some of my recent projects:
			</p>

			<ol className="relative ml-3 border-l-2 border-muted mt-12">
				{experiences.map((exp) => (
					<ExperienceItem
						key={`${exp.company}-${exp.title}-${exp.period}`}
						experience={exp}
					/>
				))}
			</ol>
		</section>
	);
}
