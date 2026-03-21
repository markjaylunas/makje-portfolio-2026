import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "@tanstack/react-router";
import { getProjectOptions } from "@/data/options/project";
import type { ProjectWithRelations } from "@/db/types";

export default function EditProjectData({
	children,
}: {
	children: (defaultProject: ProjectWithRelations) => React.ReactNode;
}) {
	const { projectId } = useParams({
		from: "/_protected/admin/project/$projectId/edit",
	});

	const { data: defaultProject } = useSuspenseQuery(
		getProjectOptions({ projectId }),
	);

	if (!defaultProject) {
		throw notFound();
	}

	return <>{children(defaultProject)}</>;
}
