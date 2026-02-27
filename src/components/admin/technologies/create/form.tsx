import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	defaultValues,
	technologiesCreateSchema,
} from "@/validators/technologies-create";

export default function CreateTechnologyForm() {
	const form = useForm({
		defaultValues,
		onSubmit: async ({ value }) => {
			console.log(value);
		},
		validators: {
			onSubmit: technologiesCreateSchema,
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-6 max-w-md"
		>
			{/* Name Field */}
			<form.Field name="name">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !!field.state.meta.errors.length;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Name</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="e.g. React"
								aria-invalid={isInvalid}
							/>
							{isInvalid && (
								<FieldError>{field.state.meta.errors.join(", ")}</FieldError>
							)}
						</Field>
					);
				}}
			</form.Field>

			{/* URL Field */}
			<form.Field name="url">
				{(field) => {
					const isInvalid =
						field.state.meta.isTouched && !!field.state.meta.errors.length;
					return (
						<Field data-invalid={isInvalid}>
							<FieldLabel htmlFor={field.name}>Website URL</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								placeholder="https://..."
								aria-invalid={isInvalid}
							/>
							{isInvalid && (
								<FieldError>{field.state.meta.errors.join(", ")}</FieldError>
							)}
						</Field>
					);
				}}
			</form.Field>

			<div className="grid grid-cols-2 gap-4">
				{/* Icon Field */}
				<form.Field name="icon">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !!field.state.meta.errors.length;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Icon</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors.join(", ")}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* Color Field */}
				{/* <form.Field
					name="color"
					children={(field) => (
						<Field>
							<FieldLabel htmlFor={field.name}>Brand Color</FieldLabel>
							<Input
								id={field.name}
								type="color"
								className="h-10 p-1"
								value={field.state.value}
								
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</Field>
					)}
				/> */}
			</div>

			<form.Subscribe
				selector={(state) => [state.canSubmit, state.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<Button type="submit" className="w-full" disabled={!canSubmit}>
						{isSubmitting ? "Saving..." : "Create Technology"}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
