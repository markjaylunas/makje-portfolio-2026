import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { toast } from "sonner";
import type z from "zod";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { mediaInsertSchema } from "@/db/schema-validation";
import { useFieldContext } from "../context";
import FieldError from "./error";

type FileFieldType = z.infer<typeof mediaInsertSchema>;

export default function FileField({
	label,
	placeholder,
	accept,
	onChangeExt,
	onUpload,
}: {
	label: string;
	placeholder?: string;
	accept: string;
	onChangeExt?: (file: File | undefined) => void;
	onUpload?: (file: File) => Promise<FileFieldType>;
}) {
	const field = useFieldContext<FileFieldType | File>();
	const [isUploading, setIsUploading] = useState(false);

	const isInvalid = !field.state.meta.isValid;
	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		onChangeExt?.(file);

		if (!file) {
			return;
		}

		if (onUpload) {
			setIsUploading(true);
			try {
				const uploadedData = await onUpload(file);
				field.handleChange(uploadedData);
				field.validate("blur");
			} catch (_error) {
				toast.error("Failed to upload file");
			} finally {
				setIsUploading(false);
			}
		} else {
			field.handleChange(file);
			field.validate("blur");
		}
	};

	return (
		<Field data-invalid={isInvalid}>
			<FieldLabel htmlFor={field.name} className="flex gap-2 items-center">
				{label}{" "}
				{isUploading && (
					<HugeiconsIcon icon={Loading03Icon} className="animate-spin size-4" />
				)}
			</FieldLabel>
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
				disabled={isUploading}
			/>

			<FieldError
				errors={field.state.meta.errors.map((v) => v.message)}
				isInvalid={isInvalid}
			/>
		</Field>
	);
}
