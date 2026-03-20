import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { lazy } from "react";

const TextField = lazy(() => import("./fields/text-field"));
const FileField = lazy(() => import("./fields/file-field"));
const SubmitButton = lazy(() => import("./subscribe/submit-button"));

export const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

export const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		TextField,
		FileField,
	},
	formComponents: {
		SubmitButton,
	},
});
