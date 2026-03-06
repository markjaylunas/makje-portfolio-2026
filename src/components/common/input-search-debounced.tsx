import { Loading03Icon, Search } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { debounce } from "@tanstack/pacer";
import type { ComponentProps } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "../ui/input-group";

export function InputSearchParamsDebounced({
	onSearch,
	wait = 200,
	isPending = false,
	...props
}: ComponentProps<"input"> & {
	onSearch: (value: string) => void;
	wait?: number;
	isPending?: boolean;
}) {
	const debouncedSearch = debounce(
		(searchTerm: string) => onSearch(searchTerm),
		{
			wait,
		},
	);

	return (
		<InputGroup className="max-w-xs">
			<InputGroupInput
				{...props}
				placeholder="Search..."
				className="max-w-xs"
				onChange={(e) => {
					const value = e.target.value;
					debouncedSearch(value);
				}}
			/>
			<InputGroupAddon>
				<HugeiconsIcon icon={Search} />
			</InputGroupAddon>
			<InputGroupAddon align="inline-end">
				{isPending && (
					<HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
				)}
			</InputGroupAddon>
		</InputGroup>
	);
}
