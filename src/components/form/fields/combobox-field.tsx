import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "../context";
import FieldError from "./error";

type ComboboxOption = {
	icon?: string;
	label: string;
	value: string;
};

type ComboboxFieldProps = {
	label: string;
	placeholder?: string;
	optionList: ComboboxOption[];
};

export default function ComboboxField({
	label,
	placeholder,
	optionList,
}: ComboboxFieldProps) {
	const field = useFieldContext<string[]>();
	const anchor = useComboboxAnchor();

	const value = getOrderedSelection(field.state.value, optionList, "value");
	const isInvalid = !field.state.meta.isValid;
	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Combobox
				multiple
				autoHighlight
				items={optionList}
				value={value}
				itemToStringValue={(item: (typeof optionList)[number]) => item.value}
				onValueChange={(newValues) =>
					field.handleChange(newValues.map((v) => v.value))
				}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue placeholder={placeholder}>
						{(values: ComboboxOption[]) => (
							<>
								{values.map((value: ComboboxOption) => (
									<ComboboxChip key={value.value}>
										{value.icon && (
											<img
												src={value.icon}
												alt={value.label}
												className="size-4"
											/>
										)}
										{value.label}
									</ComboboxChip>
								))}
								<ComboboxChipsInput />
							</>
						)}
					</ComboboxValue>
				</ComboboxChips>
				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>No items found.</ComboboxEmpty>
					<ComboboxList>
						{(item: ComboboxOption) => (
							<ComboboxItem key={item.value} value={item}>
								{item.icon && (
									<img src={item.icon} alt={item.label} className="size-4" />
								)}
								{item.label}
							</ComboboxItem>
						)}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>

			<FieldError
				errors={field.state.meta.errors.map((v) => v.message)}
				isInvalid={isInvalid}
			/>
		</Field>
	);
}

/**
 * Maps an array of IDs to their full objects while preserving the order of the IDs.
 * @template T - The type of the objects in your source list.
 * @template K - The type of the key being used for matching (usually string | number).
 * * @param selectedIds - The array of IDs from your field state (e.g., field.state.value).
 * @param optionList - The source of truth array containing the full objects.
 * @param key - The property on the objects to match against the IDs (default: 'value').
 */
export const getOrderedSelection = <
	T extends Record<string, unknown>,
	K extends keyof T,
>(
	selectedIds: T[K][],
	optionList: T[],
	key: K,
): T[] => {
	if (!selectedIds.length) return [];

	// 1. Create a lookup map for O(n) performance
	// Using T[K] as the map key ensures it matches the type of your ID
	const lookup = new Map<T[K], T>(optionList.map((opt) => [opt[key], opt]));

	// 2. Map the state's order and filter out missing matches
	return selectedIds
		.map((id) => lookup.get(id))
		.filter((v): v is T => v !== undefined);
};
