import { Close, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, useEffect, useState } from "react";
import { ExperienceItem } from "@/components/home/experience/item";
import { Button } from "@/components/ui/button";
import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { DatePickerInput } from "@/components/ui/date-picker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getTechnologyListOptions } from "@/data/options/technology";
import {
	defaultValues,
	type ExperienceCreateFormSchema,
	experienceCreateFormSchema,
} from "@/form-validators/experience/create";
import type { TechnologyWithRelations } from "@/lib/types";
import { dateToMonthYear } from "@/lib/utils";

export default function CreateExperienceForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({}),
	);

	const { mutate: createExperienceMutation, isPending } = useMutation({
		mutationFn: async (value: ExperienceCreateFormSchema) => {
			return value;
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

	const anchor = useComboboxAnchor();

	const handlePeriodChange = (startDate: Date, endDate?: Date) => {
		const periodDisplay = `${dateToMonthYear(startDate)} - ${endDate ? dateToMonthYear(endDate) : "Present"}`;
		form.setFieldValue("periodDisplay", periodDisplay);
	};

	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-16">
			<ol className="relative ml-3 border-l-2 border-muted">
				<form.Subscribe selector={(state) => [state.values]}>
					{([exp]) => {
						const selectedTechnologyList = technologyList.filter((v) =>
							exp.technologyList.find((x) => x === v.id),
						);

						return (
							<ExperienceItem
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
				className="space-y-6 overflow-x-hidden"
			>
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
					{({ logo }) => <LogoPreview logo={logo} />}
				</form.Subscribe>

				<form.Field name="startDate">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Start Date</FieldLabel>
								<DatePickerInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(v) => {
										if (v === undefined) return;
										field.handleChange(v);
										const endDate = form.state.values.endDate;
										handlePeriodChange(v, endDate);
									}}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="endDate">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>End Date</FieldLabel>
								<DatePickerInput
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(v) => {
										if (v === undefined) return;
										const date = v ? v : new Date();
										field.handleChange(date);
										const startDate = form.state.values.startDate;
										handlePeriodChange(startDate, date);
									}}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="description">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Description</FieldLabel>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Enter description here..."
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="technologyList">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Technologies</FieldLabel>
								<Combobox multiple autoHighlight items={technologyList}>
									<ComboboxChips ref={anchor}>
										<ComboboxValue>
											{(values) => (
												<Fragment>
													{values.map((value: TechnologyWithRelations) => (
														<ComboboxChip key={value.id}>
															<img
																src={value.icon.url}
																alt={value.icon.altText || value.name}
																className="size-4"
															/>
															{value.name}
														</ComboboxChip>
													))}
													<ComboboxChipsInput />
												</Fragment>
											)}
										</ComboboxValue>
									</ComboboxChips>
									<ComboboxContent anchor={anchor}>
										<ComboboxEmpty>No items found.</ComboboxEmpty>
										<ComboboxList>
											{(item: TechnologyWithRelations) => (
												<ComboboxItem key={item.id} value={item}>
													<img
														src={item.icon.url}
														alt={item.icon.altText || item.name}
														className="size-4"
													/>
													{item.name}
												</ComboboxItem>
											)}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>
							</Field>
						);
					}}
				</form.Field>

				<div className="space-y-4">
					<form.Field name="responsibilityList" mode="array">
						{(field) => (
							<>
								<div className="flex items-center justify-between">
									<FieldLabel>Responsibilities</FieldLabel>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={() => field.pushValue("")}
									>
										Add Responsibility
									</Button>
								</div>

								<div className="space-y-3">
									{/* Use field.state.value map to render inputs */}
									{field.state.value.map((_, i) => {
										return (
											<form.Field
												key={`responsibility-${
													// biome-ignore lint/suspicious/noArrayIndexKey: <ignore>
													i
												}`}
												name={`responsibilityList[${i}]`}
											>
												{(subField) => {
													const isInvalid = !subField.state.meta.isValid;
													return (
														<div className="flex gap-2 relative">
															<div className="flex-1">
																<Textarea
																	value={subField.state.value}
																	onChange={(e) =>
																		subField.handleChange(e.target.value)
																	}
																	onBlur={subField.handleBlur}
																	placeholder="Describe a key achievement"
																	aria-invalid={isInvalid}
																/>
																{isInvalid && (
																	<FieldError>
																		{subField.state.meta.errors[0]?.message}
																	</FieldError>
																)}
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
											</form.Field>
										);
									})}

									{field.state.value.length === 0 && (
										<p className="text-sm text-muted-foreground italic text-center py-4 border-2 border-dashed rounded-md">
											No responsibilities added yet.
										</p>
									)}
								</div>
							</>
						)}
					</form.Field>
				</div>

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
		</div>
	);
}

function LogoPreview({ logo }: { logo: File | null | undefined }) {
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (!logo || !(logo instanceof File) || logo.size === 0) {
			setPreviewUrl(null);
			return;
		}

		const objectUrl = URL.createObjectURL(logo);
		setPreviewUrl(objectUrl);

		return () => {
			URL.revokeObjectURL(objectUrl);
		};
	}, [logo]);

	return (
		<div className="size-24 flex items-center justify-center border rounded bg-muted p-2 overflow-x-hidden">
			{previewUrl ? (
				<img
					src={previewUrl}
					alt="Logo preview"
					className="w-full h-full object-contain"
				/>
			) : (
				<p className="text-muted-foreground text-[10px] text-center uppercase font-medium">
					No logo
				</p>
			)}
		</div>
	);
}
