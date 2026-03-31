import { Close, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useAppForm } from "@/components/form/context";
import { getOrderedSelection } from "@/components/form/fields/combobox-field";
import { ExperienceItem } from "@/components/home/experience/item";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import { uploadExperienceLogo } from "@/data/client/storage";
import { getTechnologyListOptions } from "@/data/options/technology";
import { createExperienceFn } from "@/data/server/experience.server";
import type {
	InsertExperience,
	InsertExperienceToTechnologies,
} from "@/db/types";
import {
	COMPANY_LOGO_ACCEPTED_MIME_TYPES,
	defaultValues,
	type ExperienceCreateFormSchema,
	experienceCreateFormSchema,
} from "@/form-validators/experience/create";
import { queryKey } from "@/lib/query-key";
import { dateToMonthYear } from "@/lib/utils";

export default function CreateExperienceForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({ query: "" }),
	);

	const { mutate: createExperienceMutation, isPending } = useMutation({
		mutationFn: async (values: ExperienceCreateFormSchema) => {
			const newExperienceToTechnologies: InsertExperienceToTechnologies[] =
				values.technologyList.map((v, index) => ({
					technologyId: v,
					experienceId: "",
					order: index + 1,
				}));

			const newExperience: InsertExperience = {
				title: values.title,
				company: values.company,
				description: values.description,
				periodDisplay: values.periodDisplay,
				startDate: values.startDate,
				endDate: values.endDate,
				responsibilities: JSON.stringify(values.responsibilityList),
			};

			return await createExperienceFn({
				data: {
					newExperience,
					newExperienceToTechnologies,
					newMedia: values.logo,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.experience.list(),
			});
			form.reset();
			navigate({ to: "/admin/experience" });
		},
	});

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => createExperienceMutation(value),
		validators: {
			onSubmit: experienceCreateFormSchema,
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
						const selectedTechnologyList = getOrderedSelection(
							exp.technologyList,
							technologyList,
							"id",
						);

						return (
							<ExperienceItem
								logo={exp.logo?.url ? exp.logo?.url : undefined}
								title={exp.title}
								company={exp.company}
								description={exp.description || ""}
								period={exp.periodDisplay || ""}
								responsibilities={exp.responsibilityList}
								technologies={selectedTechnologyList}
							/>
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
							autoFocus
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
						<field.ImageFileField
							label="Company Logo"
							accept={COMPANY_LOGO_ACCEPTED_MIME_TYPES.join(",")}
							onUpload={uploadExperienceLogo}
						/>
					)}
				</form.AppField>

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
