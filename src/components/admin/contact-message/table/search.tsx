import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { InputSearchParamsDebounced } from "@/components/common/input-search-debounced";
import { getContactMessageListOptions } from "@/data/options/contact-message";
import { Route } from "@/routes/_protected/admin/contact-message";

export default function ContactMessageTableSearchDebounced() {
	const search = useSearch({
		from: "/_protected/admin/contact-message/",
	});

	const { isPending } = useSuspenseQuery(
		getContactMessageListOptions({ query: search.query }),
	);

	const navigate = Route.useNavigate();

	const handleSearch = (value: string) => {
		navigate({ search: { query: value }, replace: false });
	};

	return (
		<InputSearchParamsDebounced
			onSearch={handleSearch}
			placeholder="Search messages..."
			defaultValue={search.query}
			isPending={isPending}
		/>
	);
}
