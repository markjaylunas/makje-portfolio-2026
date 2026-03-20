import { Close, Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import FileImagePreview from "@/components/common/file-image-preview";
import { useAppForm } from "@/components/form/context";
import FieldError from "@/components/form/fields/error";
import TechCard from "@/components/home/technology/card";
import { Badge } from "@/components/ui/badge";
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
			const newMedia = await uploadTechnologyIcon(value.icon);

			const newTechnology: InsertTechnology = {
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
						<FileImagePreview file={values.icon}>
							{(url) => (
								<TechCard
									icon={url}
									colors={values.brandColors.join(", ")}
									name={values.name}
									url={values.url}
								/>
							)}
						</FileImagePreview>
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
						<field.FileField
							label="Icon"
							accept={TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(",")}
							onChangeExt={(file) => {
								if (!file) {
									form.resetField("brandColors");
									return;
								}
							}}
							placeholder="Click to add icon"
						/>
					)}
				</form.AppField>

				<form.Subscribe
					selector={(state) => ({
						icon: state.values.icon,
					})}
				>
					{({ icon }) => <IconPreview icon={icon} />}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => ({
						brandColors: state.values.brandColors,
						isInvalid: !state.fieldMeta.brandColors?.isValid,
					})}
				>
					{({ brandColors, isInvalid }) => (
						<IconColorField
							name="brandColors"
							isInvalid={isInvalid}
							onBrandColorsChange={(colors) =>
								form.setFieldValue("brandColors", colors)
							}
							brandColors={brandColors}
						/>
					)}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => ({
						brandColorsErrors: state.fieldMeta.brandColors?.errors,
					})}
				>
					{({ brandColorsErrors }) => {
						const errors = [...(brandColorsErrors ?? [])];

						if (!errors.length) return null;

						return (
							<FieldError
								errors={errors.map((v) => v.message)}
								isInvalid={true}
							/>
						);
					}}
				</form.Subscribe>

				<form.AppForm>
					<form.SubmitButton isPending={isPending} className="w-full">
						Submit
					</form.SubmitButton>
				</form.AppForm>
			</form>
		</>
	);
}

export function IconPreview({ icon }: { icon: File | null | undefined }) {
	return (
		<div className="size-24 flex items-center justify-center border rounded bg-muted p-2">
			{icon && icon.size > 0 ? (
				<FileImagePreview file={icon}>
					{(url) => (
						<img
							src={url}
							alt="Icon preview"
							className="w-full h-full object-contain"
						/>
					)}
				</FileImagePreview>
			) : (
				<p className="text-muted-foreground text-xs text-center">
					No icon selected
				</p>
			)}
		</div>
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
