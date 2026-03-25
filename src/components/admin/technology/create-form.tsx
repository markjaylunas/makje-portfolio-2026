import { Close, PlusSignIcon, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/context";
import TechCard from "@/components/home/technology/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { uploadTechnologyIcon } from "@/data/client/storage";
import { createTechnologyFn } from "@/data/server/technology.server";
import type { InsertTechnology } from "@/db/types";
import {
	defaultValues,
	TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES,
	type TechnologyCreateFormSchema,
	technologyCreateFormSchema,
} from "@/form-validators/technology/create";
import { queryKey } from "@/lib/query-key";

export default function CreateTechnologyForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: createMutation, isPending } = useMutation({
		mutationFn: async (value: TechnologyCreateFormSchema) => {
			const newTechnology: InsertTechnology = {
				name: value.name,
				url: value.url,
				brandColor: value.brandColors.join(", "),
				iconId: "",
			};

			const result = await createTechnologyFn({
				data: { newTechnology, newMedia: value.icon },
			});

			return result;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.technology.list(),
			});
			form.reset();
			navigate({ to: "/admin/technology" });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => createMutation(value),
		validators: {
			onSubmit: technologyCreateFormSchema,
		},
	});

	return (
		<>
			<div className="mx-auto max-w-48">
				<form.Subscribe selector={(state) => state.values}>
					{(values) => (
						<TechCard
							icon={values.icon?.url ?? undefined}
							colors={values.brandColors.join(", ")}
							name={values.name}
							url={values.url}
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
				<form.AppField name="name">
					{(field) => <field.TextField label="Name" placeholder="e.g. React" />}
				</form.AppField>

				{/* URL Field */}
				<form.AppField name="url">
					{(field) => (
						<field.TextField label="Website URL" placeholder="https://..." />
					)}
				</form.AppField>

				{/* Icon Field */}
				<form.AppField name="icon">
					{(field) => (
						<field.ImageFileField
							label="Icon"
							accept={TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(",")}
							onUpload={uploadTechnologyIcon}
							placeholder="Click to add icon"
						/>
					)}
				</form.AppField>

				<form.AppField name="brandColors">
					{(field) => (
						<div className="space-y-4">
							<FieldLabel>Brand Colors</FieldLabel>

							<div className="space-y-3">
								{field.state.value.map((_, i) => {
									const key = `brandColors-${i}`;
									return (
										<form.AppField key={key} name={`brandColors[${i}]`}>
											{(subField) => {
												return (
													<subField.TextField
														label={`Brand Color ${i + 1}`}
														placeholder="#hex"
														left={
															<div
																className="size-4.5 rounded-full border border-gray-300"
																style={{
																	backgroundColor: subField.state.value,
																}}
															/>
														}
														right={
															<Button
																type="button"
																variant="destructive"
																size="icon-xs"
																onClick={() => field.removeValue(i)}
															>
																<HugeiconsIcon icon={Close} />
															</Button>
														}
													/>
												);
											}}
										</form.AppField>
									);
								})}

								{field.state.value.length === 0 && (
									<div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg bg-muted/30">
										<p className="text-sm text-muted-foreground italic">
											No brand colors added yet.
										</p>
									</div>
								)}

								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => field.pushValue("")}
									className="gap-2"
								>
									<HugeiconsIcon icon={PlusSignIcon} className="size-4" />
									Add Brand Color
								</Button>
							</div>
						</div>
					)}
				</form.AppField>

				<form.AppForm>
					<form.SubmitButton isPending={isPending} className="w-full">
						Submit
					</form.SubmitButton>
				</form.AppForm>
			</form>
		</>
	);
}

export function IconColorField({
	onBrandColorsChange,
	brandColors,
	isInvalid,
	name,
}: {
	onBrandColorsChange: (colors: string[]) => void;
	brandColors: string[];
	isInvalid: boolean;
	name: string;
}) {
	const [manualColor, setManualColor] = useState("");

	const addManualColor = (currentColors: string[]) => {
		const trimmedColor = manualColor.trim();
		if (!trimmedColor) return;
		const newColors = [...currentColors, trimmedColor];
		onBrandColorsChange(newColors);
		setManualColor("");
	};

	return (
		<div className="flex flex-col flex-wrap gap-2">
			<Field data-invalid={isInvalid}>
				<FieldLabel htmlFor={name}>Brand Colors</FieldLabel>
				<div className="flex items-center gap-2">
					<Input
						id={name}
						value={manualColor}
						onChange={(e) => setManualColor(e.target.value)}
						placeholder="#HEX"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								addManualColor(brandColors);
							}
						}}
					/>
					<button type="button" onClick={() => addManualColor(brandColors)}>
						<HugeiconsIcon
							icon={Tick01Icon}
							className="size-5 cursor-pointer hover:bg-muted rounded-xs"
						/>
						<span className="sr-only">Add</span>
					</button>
				</div>
			</Field>
			<BrandColorsList
				brandColors={brandColors}
				onBrandColorsChange={onBrandColorsChange}
			/>
		</div>
	);
}

function BrandColorsList({
	brandColors,
	onBrandColorsChange,
}: {
	brandColors: string[];
	onBrandColorsChange: (colors: string[]) => void;
}) {
	return (
		<>
			{brandColors.map((color) => (
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
							onBrandColorsChange(brandColors.filter((c) => c !== color))
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
		</>
	);
}
