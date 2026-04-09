import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { DataTable } from "@/components/common/data-table";
import { getProjectListForAdminOptions } from "@/data/options/project";
import { columns } from "./columns";
import ProjectTableSearchDebounced from "./search";

export default function ProjectList() {
	const { query } = useSearch({ from: "/_protected/admin/project/" });
	const params = { query };

	const { data: projectList } = useSuspenseQuery(
		getProjectListForAdminOptions(params),
	);

	return (
		<section className="space-y-2">
			<ProjectTableSearchDebounced />
			<DataTable columns={columns} data={projectList} />
		</section>
	);
}
