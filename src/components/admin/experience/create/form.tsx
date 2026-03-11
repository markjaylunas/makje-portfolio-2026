import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	defaultValues,
	type ExperienceCreateFormSchema,
	experienceCreateFormSchema,
} from "@/form-validators/experience/create";

export default function CreateExperienceForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createExperienceMutation, isPending } = useMutation({
		mutationFn: async (value: ExperienceCreateFormSchema) => {
			console.log({ value });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["experience"] });
			form.reset();
			navigate({ to: "/admin/experience" });
		},
	});

	const form = useForm({
		defaultValues,
		onSubmit: ({ value }) => createExperienceMutation(value),
		validators: {
			onSubmit: experienceCreateFormSchema,
		},
	});

	return (
		<>
			<div className="mx-auto max-w-48">
				<form.Subscribe selector={(state) => state.values}>
					{(values) => <pre>{JSON.stringify(values, null, 2)}</pre>}
				</form.Subscribe>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void form.handleSubmit();
				}}
				className="space-y-6 max-w-md"
			>
				{/* Name Field */}
				<form.Field name="title">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Title</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. Software Engineer"
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* URL Field */}
				<form.Field name="company">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Company</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="e.g. Google"
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* Icon Field */}
				<form.Field name="logo">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
							const file = e.target.files?.[0];
							if (!file) {
								field.form.resetField("logo");
								return;
							}
							field.handleChange(file);
						};

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Company Logo</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="file"
									accept=".png,.jpg,.jpeg,.webp"
									onChange={fileHandler}
									onBlur={field.handleBlur}
									className="cursor-pointer"
									aria-invalid={isInvalid}
								/>

								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Subscribe
					selector={(state) => ({
						logo: state.values.logo,
					})}
				>
					{({ logo }) => (
						<div className="size-24 flex items-center justify-center border rounded bg-muted p-2">
							{logo ? (
								<img
									src={URL.createObjectURL(logo)}
									alt="Icon preview"
									className="w-full h-full object-contain"
								/>
							) : (
								<p className="text-muted-foreground text-xs text-center">
									No logo selected
								</p>
							)}
						</div>
					)}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							className="w-full"
							disabled={!canSubmit || isSubmitting || isPending}
						>
							{(isSubmitting || isPending) && (
								<HugeiconsIcon icon={Loading03Icon} className="animate-spin" />
							)}
							Submit
						</Button>
					)}
				</form.Subscribe>
			</form>
		</>
	);
}
