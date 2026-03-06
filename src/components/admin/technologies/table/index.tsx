import { useSuspenseQuery } from "@tanstack/react-query";
import { getTechnologyListOptions } from "@/data/options/technology";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function TechnologyTable() {
	const { data: technologyList } = useSuspenseQuery(getTechnologyListOptions);

	return (
		<section className="space-y-2">
			<DataTable columns={columns} data={technologyList} />
		</section>
	);
}
