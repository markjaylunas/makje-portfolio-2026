import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "@tanstack/react-router";
import { getExperienceOptions } from "@/data/options/experience";
import type { ExperienceWithRelations } from "@/lib/types";

export default function EditExperienceData({
	children,
}: {
	children: (defaultExperience: ExperienceWithRelations) => React.ReactNode;
}) {
	const { experienceId } = useParams({
		from: "/_protected/admin/experience/$experienceId/edit",
	});

	const { data: defaultExperience } = useSuspenseQuery(
		getExperienceOptions({ experienceId }),
	);

	if (!defaultExperience) {
		throw notFound();
	}

	return <>{children(defaultExperience)}</>;
}
