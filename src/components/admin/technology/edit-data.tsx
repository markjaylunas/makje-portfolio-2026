import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "@tanstack/react-router";
import { getTechnologyOptions } from "@/data/options/technology";
import type { TechnologyWithIcon } from "@/lib/types";

export default function EditTechnologyData({
	children,
}: {
	children: (defaultTechnology: TechnologyWithIcon) => React.ReactNode;
}) {
	const { technologyId } = useParams({
		from: "/_protected/admin/technology/$technologyId/edit",
	});

	const { data: defaultTechnology } = useSuspenseQuery(
		getTechnologyOptions({ technologyId }),
	);

	if (!defaultTechnology) {
		throw notFound();
	}

	return <>{children(defaultTechnology)}</>;
}
