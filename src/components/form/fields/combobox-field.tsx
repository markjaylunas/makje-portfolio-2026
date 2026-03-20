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

	const isInvalid = !field.state.meta.isValid;
	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Combobox
				multiple
				autoHighlight
				items={optionList}
				value={optionList.filter((v) => field.state.value.includes(v.value))}
				itemToStringValue={(item: (typeof optionList)[number]) => item.value}
				onValueChange={(newValues) =>
					field.handleChange(newValues.map((v) => v.value))
				}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue placeholder={placeholder}>
						{(values: ComboboxOption[]) => (
							<>
								{values.map((value) => (
									<ComboboxChip key={value.value}>
										<img
											src={value.icon}
											alt={value.label}
											className="size-4"
										/>
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
								<img src={item.icon} alt={item.label} className="size-4" />
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
