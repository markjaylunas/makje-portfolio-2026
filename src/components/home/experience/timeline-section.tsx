import { useId } from "react";
import { experiences } from "@/assets/home/experiences";
import GradientText from "@/components/common/gradient-text";
import H2 from "@/components/common/H2";
import { ExperienceItem } from "./timeline-item";

export default function ExperienceTimelineSection() {
	const sectionHeadingId = useId();

	return (
		<section
			className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20"
			aria-labelledby={sectionHeadingId}
		>
			<H2 id={sectionHeadingId} className="flex justify-start">
				<GradientText>Experience</GradientText>
			</H2>

			<ol className="relative ml-3 border-l-2 border-muted mt-16">
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
