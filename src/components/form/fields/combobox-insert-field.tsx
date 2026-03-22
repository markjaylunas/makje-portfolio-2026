import * as React from "react";
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

export type ComboboxInsertOption = {
	icon?: string;
	label: string;
	value: string;
};

type ComboboxInsertFieldProps = {
	label: string;
	placeholder?: string;
	optionList: ComboboxInsertOption[];
};

export default function ComboboxInsertField({
	label,
	placeholder,
	optionList,
}: ComboboxInsertFieldProps) {
	const field = useFieldContext<ComboboxInsertOption[]>();
	const anchor = useComboboxAnchor();
	const [inputValue, setInputValue] = React.useState("");

	const selectedValues = field.state.value || [];
	const isInvalid = !field.state.meta.isValid;

	// Construct the list of items to display in the dropdown.
	// We use a Map to ensure uniqueness by 'value' while preserving the original options.
	const itemMap = new Map<string, ComboboxInsertOption>();
	for (const opt of optionList) {
		itemMap.set(opt.value, opt);
	}
	for (const sv of selectedValues) {
		if (!itemMap.has(sv.value)) {
			itemMap.set(sv.value, sv);
		}
	}

	const items = Array.from(itemMap.values());
	const value = selectedValues
		.map((sv) => itemMap.get(sv.value))
		.filter((v): v is ComboboxInsertOption => !!v);

	// If there's input that doesn't match any existing items, offer it as a new item at the top
	const trimmedInput = inputValue.trim();
	if (trimmedInput) {
		const lowerInput = trimmedInput.toLowerCase();
		const hasMatch = items.some(
			(item) => item.label.toLowerCase() === lowerInput,
		);
		if (!hasMatch) {
			items.unshift({
				label: trimmedInput,
				value: trimmedInput,
			});
		}
	}

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Combobox
				multiple
				autoHighlight
				items={items}
				value={value}
				onInputValueChange={setInputValue}
				itemToStringValue={(item: ComboboxInsertOption) => item.value}
				onValueChange={(newValues) => {
					field.handleChange(newValues);
					setInputValue("");
				}}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue placeholder={placeholder}>
						{(values: ComboboxInsertOption[]) => (
							<>
								{values.map((value) => (
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
						{(item: ComboboxInsertOption) => (
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
