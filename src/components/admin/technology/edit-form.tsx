import { Close, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/context";
import TechCard from "@/components/home/technology/card";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
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
						<field.ImageFileField
							label="Icon"
							accept={TECHNOLOGY_ICON_ACCEPTED_MIME_TYPES.join(",")}
							onUpload={uploadTechnologyIcon}
							placeholder="Click to add icon"
							previewUrl={defaultValues.iconUrl}
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
