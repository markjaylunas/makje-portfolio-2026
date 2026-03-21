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
	isInsert?: boolean;
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

	const isInvalid = !field.state.meta.isValid;

	const hasExactMatch = optionList.some(
		(v) => v.label.toLowerCase() === inputValue.toLowerCase(),
	);

	const items = [...optionList];

	// Ensure already selected "New" items are included in the items list
	// so they are visible and can be unselected from the dropdown
	for (const sv of field.state.value || []) {
		if (sv.isInsert && !items.some((item) => item.value === sv.value)) {
			items.push(sv);
		}
	}

	if (inputValue && !hasExactMatch) {
		const isAlreadySelected = items.some(
			(item) => item.label.toLowerCase() === inputValue.toLowerCase(),
		);

		if (!isAlreadySelected) {
			items.unshift({
				label: inputValue,
				value: inputValue,
				isInsert: true,
			});
		}
	}

	const selectedValues = field.state.value || [];
	const value = items.filter((v) =>
		selectedValues.some((sv) => sv.value === v.value),
	);

	for (const sv of selectedValues) {
		if (!value.some((v) => v.value === sv.value)) {
			value.push(sv);
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
										{value.isInsert && (
											<span className="text-[10px] bg-primary/20 text-primary px-1 rounded-full ml-1">
												New
											</span>
										)}
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
								{item.isInsert && (
									<span className="text-[10px] bg-primary/20 text-primary px-1 rounded-full ml-auto">
										New
									</span>
								)}
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
