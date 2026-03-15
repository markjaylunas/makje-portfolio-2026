import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { InputSearchParamsDebounced } from "@/components/common/input-search-debounced";
import { getProjectListOptions } from "@/data/options/project";
import { Route } from "@/routes/_protected/admin/project";

export default function ProjectTableSearchDebounced() {
	const search = useSearch({
		from: "/_protected/admin/project/",
	});

	const { isPending } = useSuspenseQuery(
		getProjectListOptions({ query: search.query }),
	);

	const navigate = Route.useNavigate();

	const handleSearch = (value: string) => {
		navigate({ search: { query: value }, replace: false });
	};

	return (
		<InputSearchParamsDebounced
			onSearch={handleSearch}
			placeholder="Search project"
			defaultValue={search.query}
			isPending={isPending}
		/>
	);
}
