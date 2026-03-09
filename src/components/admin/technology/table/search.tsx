import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { InputSearchParamsDebounced } from "@/components/common/input-search-debounced";
import { getTechnologyListOptions } from "@/data/options/technology";
import { Route } from "@/routes/_protected/admin/technology";

export default function TechnologyTableSearchDebounced() {
	const search = useSearch({
		from: "/_protected/admin/technology/",
	});

	const { isPending } = useSuspenseQuery(
		getTechnologyListOptions({ query: search.query }),
	);

	const navigate = Route.useNavigate();

	const handleSearch = (value: string) => {
		navigate({ search: { query: value }, replace: false });
	};

	return (
		<InputSearchParamsDebounced
			onSearch={handleSearch}
			placeholder="Search technology"
			defaultValue={search.query}
			isPending={isPending}
		/>
	);
}
