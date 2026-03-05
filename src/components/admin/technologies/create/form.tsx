import { Close, Loading03Icon, Refresh } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import TechCard from "@/components/home/technologies/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { uploadTechnologyIcon } from "@/data/client/storage";
import { createTechnologyFn } from "@/data/server/technology.server";
import type { NewTechnology } from "@/db/types";
import {
	defaultValues,
	type TechnologiesCreateFormSchema,
	technologiesCreateFormSchema,
} from "@/form-validators/technologies/create";
import { extractColorsFromSVG } from "@/lib/helper";

export default function CreateTechnologyForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createMutation, isPending } = useMutation({
		mutationFn: async (value: TechnologiesCreateFormSchema) => {
			const newMedia = await uploadTechnologyIcon(value.icon);

			const newTechnology: NewTechnology = {
				name: value.name,
				url: value.url,
				brandColor: value.brandColors.join(", "),
				iconId: "",
			};

			const result = await createTechnologyFn({
				data: { newTechnology, newMedia },
			});

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["technologies"] });
			form.reset();
			navigate({ to: "/admin/technologies" });
		},
	});

	const form = useForm({
		defaultValues,
		onSubmit: ({ value }) => createMutation(value),
		validators: {
			onSubmit: technologiesCreateFormSchema,
		},
	});

	return (
		<>
			<div className="mx-auto max-w-48">
				<form.Subscribe selector={(state) => state.values}>
					{(values) => (
						<TechCard
							tech={{
								icon: values.iconSVG || undefined,
								colors: values.brandColors.join(", "),
								name: values.name,
								url: values.url || undefined,
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
						const isInvalid = !field.state.meta.isValid;
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
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* URL Field */}
				<form.Field name="url">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
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
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				{/* Icon Field */}
				<form.Field name="icon">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						const handleFileChange = (
							e: React.ChangeEvent<HTMLInputElement>,
						) => {
							const file = e.target.files?.[0];
							if (!file) {
								field.form.resetField("brandColors");
								field.form.resetField("brandColorsDefault");
								field.form.resetField("iconSVG");
								return;
							}

							const reader = new FileReader();
							reader.onload = (event) => {
								const svgContent = event.target?.result as string;

								// 1. Extract colors as before
								const detectedColors = extractColorsFromSVG(svgContent);
								field.form.setFieldValue("brandColors", detectedColors);
								field.form.setFieldValue("brandColorsDefault", detectedColors);

								// 2. Convert string to a safe Data URL for the preview
								// This encodes the string so it's treated as an image source, not code
								const base64Svg = btoa(
									unescape(encodeURIComponent(svgContent)),
								);
								const dataUrl = `data:image/svg+xml;base64,${base64Svg}`;

								field.handleChange(file);
								field.form.setFieldValue("iconSVG", dataUrl);
								field.validate("blur");
							};
							reader.readAsText(file);
						};

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Icon (SVG)</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="file"
									accept=".svg"
									onChange={handleFileChange}
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
						iconSVG: state.values.iconSVG,
						brandColors: state.values.brandColors,
					})}
				>
					{({ iconSVG, brandColors }) => (
						<div className="flex items-center gap-4">
							<div className="size-24 flex items-center justify-center border rounded bg-muted p-2">
								{iconSVG ? (
									<img
										src={iconSVG}
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
									<Badge
										key={color}
										style={{
											backgroundColor: color,
											color: color === "#ffffff" ? "#000000" : "#ffffff",
										}}
										className="text-shadow-2xs"
									>
										{color}
										<button
											type="button"
											onClick={() =>
												form.setFieldValue(
													"brandColors",
													brandColors.filter((c: string) => c !== color),
												)
											}
										>
											<HugeiconsIcon
												icon={Close}
												data-icon="inline-end"
												className="size-5 cursor-pointer hover:bg-muted rounded-xs"
											/>
											<span className="sr-only">Remove</span>
										</button>
									</Badge>
								))}
								{/* reset button for color */}
								{iconSVG && (
									<Button
										type="button"
										variant="secondary"
										size="icon"
										className="cursor-pointer"
										onClick={() => {
											const defaultBrandColors =
												form.state.values.brandColorsDefault;
											form.setFieldValue("brandColors", defaultBrandColors);
										}}
									>
										<HugeiconsIcon icon={Refresh} />
										<span className="sr-only">Reset Colors</span>
									</Button>
								)}
							</div>
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
