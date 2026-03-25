import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import ImagePreview from "@/components/common/image-preview";
import { useAppForm } from "@/components/form/context";
import FieldError from "@/components/form/fields/error";
import TechCard from "@/components/home/technology/card";
import { uploadTechnologyIcon } from "@/data/client/storage";
import { editTechnologyFn } from "@/data/server/technology.server";
import type { InsertMedia, UpdateTechnology } from "@/db/types";
import { TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES } from "@/form-validators/technology/create";
import {
	type TechnologyEditFormSchema,
	technologyEditFormSchema,
} from "@/form-validators/technology/edit";
import { queryKey } from "@/lib/query-key";
import type { TechnologyWithRelations } from "@/lib/types";
import { IconColorField } from "./create-form";

export default function EditTechnologyForm({
	defaultTechnology,
}: {
	defaultTechnology: TechnologyWithRelations;
}) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const defaultValues: TechnologyEditFormSchema = {
		id: defaultTechnology.id,
		name: defaultTechnology.name,
		url: defaultTechnology.url,
		iconUrl: defaultTechnology.icon.url,
		brandColors: defaultTechnology.brandColor.split(", "),
	};

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => createMutation(value),
		validators: {
			onSubmit: technologyEditFormSchema,
		},
	});

	const { mutate: createMutation, isPending } = useMutation({
		mutationFn: async (value: TechnologyEditFormSchema) => {
			const insertMedia: InsertMedia | undefined = value.icon
				? value.icon
				: undefined;

			const editTechnology: UpdateTechnology = {
				id: defaultTechnology.id,
				name: value.name,
				url: value.url,
				brandColor: value.brandColors.join(", "),
				iconId: insertMedia?.id ? insertMedia.id : defaultTechnology.iconId,
			};

			const result = await editTechnologyFn({
				data: { editTechnology, newMedia: insertMedia },
			});

			return result;
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.technology.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.featuredTechnology.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.technology.item(defaultTechnology.id),
				}),
			]);
			form.reset();
			navigate({ to: "/admin/technology" });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<>
			<div className="mx-auto max-w-48">
				<form.Subscribe selector={(state) => state.values}>
					{(values) => (
						<TechCard
							icon={
								values.icon ? values.icon.url : (values.iconUrl ?? undefined)
							}
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
						<field.FileField
							label="Icon"
							accept={TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(",")}
							onUpload={uploadTechnologyIcon}
							placeholder="Click to add icon"
						/>
					)}
				</form.AppField>

				<form.Subscribe
					selector={(state) => ({
						icon: state.values.icon,
						iconUrl: state.values.iconUrl,
					})}
				>
					{({ icon, iconUrl }) => {
						if (icon) {
							return <ImagePreview url={icon.url} alt="Icon" />;
						}

						return <ImagePreview url={iconUrl || undefined} alt="Icon" />;
					}}
				</form.Subscribe>

				<form.Subscribe
					selector={(state) => ({
						brandColors: state.values.brandColors,
						isInvalid:
							state.fieldMeta.brandColors?.errorMap.onSubmit?.length > 0,
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
					<div className="flex gap-2 w-full">
						<form.ResetButton isPending={isPending}>Reset</form.ResetButton>
						<form.SubmitButton isPending={isPending}>
							Submit Changes
						</form.SubmitButton>
					</div>
				</form.AppForm>
			</form>
		</>
	);
}
