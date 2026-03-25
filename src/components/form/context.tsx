import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("./fields/text-field"));
const TextareaField = lazy(() => import("./fields/textarea-field"));
const DatePickerField = lazy(() => import("./fields/date-picker-field"));
const ImageFileField = lazy(() => import("./fields/image-file-field"));
const ComboboxField = lazy(() => import("./fields/combobox-field"));
const ComboboxInsertField = lazy(
	() => import("./fields/combobox-insert-field"),
);
const SubmitButton = lazy(() => import("./subscribe/submit-button"));
const ResetButton = lazy(() => import("./subscribe/reset-button"));

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		TextareaField,
		DatePickerField,
		ImageFileField,
		ComboboxField,
		ComboboxInsertField,
	},
	formComponents: {
		SubmitButton,
		ResetButton,
	},
});
