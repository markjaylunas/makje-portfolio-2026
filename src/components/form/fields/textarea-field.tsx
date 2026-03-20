import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "../context";
import FieldError from "./error";

export default function TextareaField({
	label,
	placeholder,
}: {
	label: string;
	placeholder?: string;
}) {
	const field = useFieldContext<string>();

	const isInvalid = !field.state.meta.isValid;
	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				placeholder={placeholder}
				aria-invalid={isInvalid}
			/>

			<FieldError
				errors={field.state.meta.errors.map((v) => v.message)}
				isInvalid={isInvalid}
			/>
		</Field>
	);
}
