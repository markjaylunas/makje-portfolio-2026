import { FieldError as FieldErrorComp } from "@/components/ui/field";

export default function FieldError({
	errors,
	isInvalid,
}: {
	errors: string[];
	isInvalid: boolean;
}) {
	if (!isInvalid) return null;
	const errorList = errors.join(", ");

	return <FieldErrorComp key={errorList}>{errorList}</FieldErrorComp>;
}
