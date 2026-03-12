import { useSuspenseQuery } from "@tanstack/react-query";
import { useId } from "react";
import GradientText from "@/components/common/gradient-text";
import H2 from "@/components/common/H2";
import { getExperienceListOptions } from "@/data/options/experience";
import { ExperienceItem } from "./item";

export default function ExperienceTimelineSection() {
	const sectionHeadingId = useId();

	const { data: experienceList } = useSuspenseQuery(getExperienceListOptions());

	return (
		<section
			className="mx-auto max-w-(--breakpoint-sm) px-6"
			aria-labelledby={sectionHeadingId}
		>
			<H2 id={sectionHeadingId} className="flex justify-start">
				<GradientText>Experience</GradientText>
			</H2>

			<ol className="relative ml-3 border-l-2 border-muted mt-16">
				{experienceList.map((exp) => (
					<ExperienceItem
						key={exp.id}
						title={exp.title}
						company={exp.company}
						description={exp.description || ""}
						period={exp.periodDisplay || ""}
						responsibilities={JSON.parse(exp.responsibilities) || ""}
						technologies={exp.technologies.flatMap((v) => v.technology)}
					/>
				))}
			</ol>
		</section>
	);
}
