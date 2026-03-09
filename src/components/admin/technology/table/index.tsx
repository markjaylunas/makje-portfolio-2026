import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { getTechnologyListOptions } from "@/data/options/technology";
import { DataTable } from "../../../common/data-table";
import { columns } from "./columns";
import TechnologyTableSearchDebounced from "./search";

export default function TechnologyTable() {
	const { query } = useSearch({ from: "/_protected/admin/technology/" });
	const params = { query };

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions(params),
	);

	return (
		<section className="space-y-2">
			<TechnologyTableSearchDebounced />
			<DataTable columns={columns} data={technologyList} />
		</section>
	);
}
