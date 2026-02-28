/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <ignore> */
import { useForm } from "@tanstack/react-form";
import TechCard from "@/components/home/technologies/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { extractColorsFromSVG } from "@/lib/helper";
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
		<>
			<div className="mx-auto max-w-48">
				<form.Subscribe selector={(state) => state.values}>
					{(values) => (
						<TechCard
							tech={{
								icon: values.icon,
								colors: values.brandColors.join(", "),
								name: values.name,
								url: values.url,
							}}
						/>
					)}
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

				{/* Icon Field */}
				<form.Field name="icon">
					{(field) => {
						const handleFileChange = (
							e: React.ChangeEvent<HTMLInputElement>,
						) => {
							const file = e.target.files?.[0];
							if (!file) return;

							const reader = new FileReader();
							reader.onload = (event) => {
								const svgContent = event.target?.result as string;

								// 1. Extract colors as before
								const detectedColors = extractColorsFromSVG(svgContent);
								console.log({ detectedColors });
								field.form.setFieldValue("brandColors", detectedColors);

								// 2. Convert string to a safe Data URL for the preview
								// This encodes the string so it's treated as an image source, not code
								const base64Svg = btoa(
									unescape(encodeURIComponent(svgContent)),
								);
								const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

								field.handleChange(dataUrl);
							};
							reader.readAsText(file);
						};

						return (
							<Field>
								<FieldLabel>Icon (SVG)</FieldLabel>
								<Input
									type="file"
									accept=".svg"
									onChange={handleFileChange}
									onBlur={field.handleBlur}
									className="cursor-pointer"
								/>

								{field.state.meta.errors.length > 0 && (
									<FieldError>{field.state.meta.errors.join(", ")}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Subscribe
					selector={(state) => [state.values.icon, state.values.brandColors]}
				>
					{([icon, brandColors]) => (
						<div className="flex items-center gap-4">
							<div className="size-24 flex items-center justify-center border rounded bg-muted p-2">
								{icon ? (
									<img
										src={icon}
										alt="Icon preview"
										className="w-full h-full object-contain"
									/>
								) : (
									<p className="text-muted-foreground text-xs text-center">
										No icon selected
									</p>
								)}
							</div>
							<div className="flex flex-col flex-wrap gap-2">
								{brandColors.map((color: string) => (
									<Badge key={color} style={{ backgroundColor: color }}>
										{color}
									</Badge>
								))}
							</div>
						</div>
					)}
				</form.Subscribe>

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
		</>
	);
}
