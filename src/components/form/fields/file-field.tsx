import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useFieldContext } from "../context";
import FieldError from "./error";

export default function FileField({
	label,
	placeholder,
	accept,
	onChangeExt,
}: {
	label: string;
	placeholder?: string;
	accept: string;
	onChangeExt?: (file: File | undefined) => void;
}) {
	const field = useFieldContext<File>();

	const isInvalid = !field.state.meta.isValid;
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		onChangeExt?.(file);

		if (!file) {
			return;
		}

		field.handleChange(file);
		field.validate("blur");
	};

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				type="file"
				placeholder={placeholder}
				accept={accept}
				onChange={handleFileChange}
				onBlur={field.handleBlur}
				className="cursor-pointer"
				aria-invalid={isInvalid}
			/>

			<FieldError
				errors={field.state.meta.errors.map((v) => v.message)}
				isInvalid={isInvalid}
			/>
		</Field>
	);
}
