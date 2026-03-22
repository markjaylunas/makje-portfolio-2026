import { Close, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import FileImagePreview from "@/components/common/file-image-preview";
import ImagePreview from "@/components/common/image-preview";
import { useAppForm } from "@/components/form/context";
import { ExperienceItem } from "@/components/home/experience/item";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { uploadExperienceLogo } from "@/data/client/storage";
import { getTechnologyListOptions } from "@/data/options/technology";
import { editExperienceFn } from "@/data/server/experience.server";
import type {
	InsertExperienceToTechnologies,
	InsertMedia,
	UpdateExperience,
} from "@/db/types";
import { COMPANY_LOGO_ACCEPTED_MIME_TYPES } from "@/form-validators/experience/create";
import {
	type ExperienceEditFormSchema,
	experienceEditFormSchema,
} from "@/form-validators/experience/edit";
import { queryKey } from "@/lib/query-key";
import type { ExperienceWithRelations } from "@/lib/types";
import { dateToMonthYear } from "@/lib/utils";

export default function EditExperienceForm({
	defaultExperience,
}: {
	defaultExperience: ExperienceWithRelations;
}) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({}),
	);

	const { mutate: editExperienceMutation, isPending } = useMutation({
		mutationFn: async (values: ExperienceEditFormSchema) => {
			let newMedia: InsertMedia | undefined;
			if (values.logo) {
				newMedia = await uploadExperienceLogo(values.logo);
			}
			const newExperienceToTechnologies: InsertExperienceToTechnologies[] =
				values.technologyList.map((v, index) => ({
					technologyId: v,
					experienceId: defaultExperience.id,
					order: index + 1,
				}));

			const updatedExperience: UpdateExperience = {
				id: defaultExperience.id,
				title: values.title,
				company: values.company,
				description: values.description,
				periodDisplay: values.periodDisplay,
				startDate: values.startDate,
				endDate: values.endDate,
				responsibilities: JSON.stringify(values.responsibilityList || []),
				logoId: defaultExperience.logoId,
			};

			return await editExperienceFn({
				data: {
					updatedExperience,
					newExperienceToTechnologies,
					newMedia,
				},
			});
		},
		onSuccess: async (data) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.experience.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.experience.item(data.id),
				}),
			]);
			form.reset();
			navigate({ to: "/admin/experience" });
		},
	});

	const defaultValues: ExperienceEditFormSchema = {
		id: defaultExperience.id,
		title: defaultExperience.title,
		company: defaultExperience.company,
		startDate: defaultExperience.startDate,
		endDate: defaultExperience.endDate || undefined,
		periodDisplay: defaultExperience.periodDisplay || "",
		description: defaultExperience.description || "",
		responsibilityList: JSON.parse(defaultExperience.responsibilities),
		technologyList: defaultExperience.technologies.map((v) => v.technologyId),
		logoUrl: defaultExperience.logo?.url,
		logo: null,
	};

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => editExperienceMutation(value),
		validators: {
			onSubmit: experienceEditFormSchema,
		},
	});

	const handlePeriodChange = (startDate: Date, endDate?: Date) => {
		const periodDisplay = `${dateToMonthYear(startDate)} - ${
			endDate ? dateToMonthYear(endDate) : "Present"
		}`;
		form.setFieldValue("periodDisplay", periodDisplay);
	};

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-between">
			<ol className="relative ml-3 border-l-2 border-muted max-w-lg w-full">
				<form.Subscribe selector={(state) => [state.values]}>
					{([exp]) => {
						const selectedTechnologyList = technologyList.filter((v) =>
							exp.technologyList.find((x) => x === v.id),
						);

						return (
							<FileImagePreview file={exp.logo}>
								{(url) => (
									<ExperienceItem
										title={exp.title}
										company={exp.company}
										description={exp.description || ""}
										period={exp.periodDisplay || ""}
										responsibilities={exp.responsibilityList}
										technologies={selectedTechnologyList}
										logo={url || exp.logoUrl}
									/>
								)}
							</FileImagePreview>
						);
					}}
				</form.Subscribe>
			</ol>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void form.handleSubmit();
				}}
				className="space-y-6 "
			>
				<form.AppField name="title">
					{(field) => (
						<field.TextField
							label="Title"
							placeholder="e.g. Software Engineer"
						/>
					)}
				</form.AppField>

				<form.AppField name="company">
					{(field) => (
						<field.TextField label="Company" placeholder="e.g. Google" />
					)}
				</form.AppField>

				<form.AppField name="logo">
					{(field) => (
						<field.FileField
							label="Company Logo"
							accept={COMPANY_LOGO_ACCEPTED_MIME_TYPES.join(",")}
						/>
					)}
				</form.AppField>

				<form.Subscribe selector={(state) => state.values.logo}>
					{(logo) => (
						<FileImagePreview file={logo}>
							{(url) => (
								<ImagePreview url={url || defaultValues.logoUrl} alt="Logo" />
							)}
						</FileImagePreview>
					)}
				</form.Subscribe>

				<form.AppField name="startDate">
					{(field) => (
						<field.DatePickerField
							label="Start Date"
							onChangeExt={(v) => {
								if (!v) return;
								const endDate = form.state.values.endDate;
								handlePeriodChange(v, endDate);
							}}
						/>
					)}
				</form.AppField>

				<form.AppField name="endDate">
					{(field) => (
						<field.DatePickerField
							label="End Date"
							onChangeExt={(v) => {
								const date = v ? v : new Date();
								const startDate = form.state.values.startDate;
								handlePeriodChange(startDate, date);
							}}
						/>
					)}
				</form.AppField>

				<form.AppField name="description">
					{(field) => (
						<field.TextareaField
							label="Description"
							placeholder="Describe your role..."
						/>
					)}
				</form.AppField>

				<form.AppField name="technologyList">
					{(field) => (
						<field.ComboboxField
							label="Technologies"
							optionList={technologyList.map((v) => ({
								icon: v.icon.url,
								label: v.name,
								value: v.id,
							}))}
						/>
					)}
				</form.AppField>

				<form.AppField name="responsibilityList">
					{(field) => (
						<div className="space-y-4">
							<FieldLabel>Responsibilities</FieldLabel>

							<div className="space-y-3">
								{field.state.value.map((_, i) => {
									return (
										<form.AppField
											key={`responsibility-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <ignore>
												i
											}`}
											name={`responsibilityList[${i}]`}
										>
											{(subField) => {
												return (
													<div className="flex gap-2 relative">
														<div className="flex-1">
															<subField.TextareaField
																label={`Responsibility ${i + 1}`}
																placeholder="Describe responsibility"
															/>
														</div>
														<Button
															type="button"
															variant="destructive"
															size="icon-xs"
															className="absolute bottom-2 right-2"
															onClick={() => field.removeValue(i)}
														>
															<HugeiconsIcon icon={Close} />
														</Button>
													</div>
												);
											}}
										</form.AppField>
									);
								})}

								{field.state.value.length === 0 && (
									<div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg bg-muted/30">
										<p className="text-sm text-muted-foreground italic">
											No responsibilities added yet.
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
									Add Responsibility
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
		</div>
	);
}
