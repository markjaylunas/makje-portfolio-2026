import { DatePickerInput } from "@/components/ui/date-picker";
import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "../context";
import FieldError from "./error";

export default function DatePickerField({
	label,
	onChangeExt,
}: {
	label: string;
	onChangeExt?: (value: Date | undefined) => void;
}) {
	const field = useFieldContext<Date>();

	const isInvalid = !field.state.meta.isValid;
	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<DatePickerInput
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(v) => {
					if (v === undefined) return;
					field.handleChange(v);
					onChangeExt?.(v);
				}}
				aria-invalid={isInvalid}
			/>

			<FieldError
				errors={field.state.meta.errors.map((v) => v.message)}
				isInvalid={isInvalid}
			/>
		</Field>
	);
}
