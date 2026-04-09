import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "@tanstack/react-router";
import { getProjectForAdminOptions } from "@/data/options/project";
import type { ProjectWithRelations } from "@/lib/types";

export default function EditProjectData({
	children,
}: {
	children: (defaultProject: ProjectWithRelations) => React.ReactNode;
}) {
	const { projectId } = useParams({
		from: "/_protected/admin/project/$projectId/edit",
	});

	const { data: defaultProject } = useSuspenseQuery(
		getProjectForAdminOptions({ projectId }),
	);

	if (!defaultProject) {
		throw notFound();
	}

	return <>{children(defaultProject)}</>;
}
