import { Edit } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ExperienceItem } from "@/components/home/experience/item";
import { buttonVariants } from "@/components/ui/button";
import { getExperienceListOptions } from "@/data/options/experience";
import { cn } from "@/lib/utils";

export default function ExperienceList() {
	const { data } = useSuspenseQuery(getExperienceListOptions());

	return (
		<ol className="relative ml-3 border-l-2 border-muted mt-16 space-y-16">
			{data.map((exp) => (
				<li key={exp.id} className="relative">
					<Link
						to={`/admin/experience/$experienceId/edit`}
						params={{
							experienceId: exp.id,
						}}
						className={cn(
							"cursor-pointer",
							buttonVariants({
								variant: "secondary",
								size: "sm",
								className: "absolute z-10 top-0 right-0 ",
							}),
						)}
					>
						<HugeiconsIcon icon={Edit} />
						Edit
					</Link>
					<ExperienceItem
						title={exp.title}
						company={exp.company}
						description={exp.description || ""}
						period={exp.periodDisplay || ""}
						responsibilities={JSON.parse(exp.responsibilities) || ""}
						technologies={exp.technologies.flatMap((v) => v.technology)}
						logo={exp.logo?.url || undefined}
					/>
				</li>
			))}
		</ol>
	);
}
