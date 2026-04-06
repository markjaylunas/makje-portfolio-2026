import { useSuspenseQuery } from "@tanstack/react-query";
import { useId } from "react";
import SectionHeader from "@/components/common/section-header";
import { getExperienceListOptions } from "@/data/options/experience";
import { ExperienceItem } from "./item";

export default function ExperienceTimelineSection() {
	const sectionHeadingId = useId();

	const { data: experienceList } = useSuspenseQuery(getExperienceListOptions());

	return (
		<section
			className="mx-auto max-w-5xl px-6"
			aria-labelledby={sectionHeadingId}
		>
			<SectionHeader
				id={sectionHeadingId}
				subtitle="Timeline"
				title="My Professional Journey."
				description="A history of companies and roles where I have grown as a developer."
			/>

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
						logo={exp.logo?.url || undefined}
					/>
				))}
			</ol>
		</section>
	);
}
