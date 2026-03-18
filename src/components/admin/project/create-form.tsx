import { Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import FileImagePreview from "@/components/common/file-image-preview";
import ProjectCard from "@/components/home/project/item";
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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { uploadProjectCoverImage } from "@/data/client/storage";
import { getTagListOptions } from "@/data/options/tag";
import { getTechnologyListOptions } from "@/data/options/technology";
import { createProjectFn } from "@/data/server/project.server";
import type { InsertProject, InsertProjectToTechnologies } from "@/db/types";
import {
	defaultValues,
	type ProjectCreateFormSchema,
	projectCreateFormSchema,
} from "@/form-validators/project/create";
import { queryKey } from "@/lib/query-key";
import type { TechnologyWithRelations } from "@/lib/types";
import { slugify } from "@/lib/utils";

export default function CreateProjectForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({}),
	);

	const { data: tagList } = useSuspenseQuery(getTagListOptions());

	const { mutate: createProjectMutation, isPending } = useMutation({
		mutationFn: async (values: ProjectCreateFormSchema) => {
			const newCoverImageMedia = await uploadProjectCoverImage(
				values.coverImage,
			);

			const newProjectToTechnologies: InsertProjectToTechnologies[] =
				values.technologyList.map((v, index) => ({
					technologyId: v,
					projectId: "",
					order: index + 1,
				}));

			const newProject: InsertProject = {
				name: values.name,
				description: values.description,
				content: values.content,
				repositoryUrl: values.repositoryUrl,
				liveUrl: values.liveUrl,
				likesCount: values.likesCount,
				coverImageId: newCoverImageMedia.id,
			};

			return await createProjectFn({
				data: {
					newProject,
					newProjectToTechnologies,
					newTags: values.tags,
					newMedia: newCoverImageMedia,
				},
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: queryKey.project.list(),
			});
			form.reset();
			navigate({ to: "/admin/project" });
		},
	});

	const form = useForm({
		defaultValues,
		onSubmit: ({ value }) => createProjectMutation(value),
		validators: {
			onSubmit: projectCreateFormSchema,
		},
	});

	const anchor = useComboboxAnchor();
	const tagsAnchor = useComboboxAnchor();
	const [tagInput, setTagInput] = useState("");
	const [existingTags, setExistingTags] = useState(tagList.map((t) => t.name));

	const exactTagMatch = existingTags.some(
		(tag) => tag.toLowerCase() === tagInput.toLowerCase(),
	);
	const filteredTags = existingTags.filter((tag) =>
		tag.toLowerCase().includes(tagInput.toLowerCase()),
	);

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-between relative">
			<form.Subscribe selector={(state) => state.values}>
				{(project) => (
					<FileImagePreview file={project.coverImage as File | string | null}>
						{(coverImageUrl) => (
							<ProjectCard
								coverImage={coverImageUrl}
								name={project.name}
								description={project.description || ""}
								content={project.content || ""}
								repositoryUrl={project.repositoryUrl || ""}
								liveUrl={project.liveUrl || ""}
								likesCount={project.likesCount || 0}
								technologyList={technologyList
									.filter((t) => project.technologyList.includes(t.id))
									.map((t) => ({
										name: t.name,
										icon: t.icon.url,
									}))}
								tagList={project.tags.map((t) => ({
									name: t,
									slug: slugify(t),
								}))}
							/>
						)}
					</FileImagePreview>
				)}
			</form.Subscribe>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					void form.handleSubmit();
				}}
				className="space-y-6 overflow-x-hidden"
			>
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
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="content">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Content</FieldLabel>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="repositoryUrl">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Repository URL</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="liveUrl">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Live URL</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
								/>
								{isInvalid && (
									<FieldError>{field.state.meta.errors[0]?.message}</FieldError>
								)}
							</Field>
						);
					}}
				</form.Field>

				<form.Field name="coverImage">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
							const file = e.target.files?.[0];
							if (!file) {
								field.form.resetField("coverImage");
								return;
							}
							field.handleChange(file);
							field.handleBlur();
						};

						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Cover Image</FieldLabel>
								<Input
									id={field.name}
									name={field.name}
									type="file"
									accept=".png,.jpg,.jpeg,.webp,.svg"
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

				<form.Field name="technologyList">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Technologies</FieldLabel>
								<Combobox
									multiple
									autoHighlight
									items={technologyList}
									onValueChange={(v: TechnologyWithRelations[]) => {
										const ids = v.map((v) => v.id);
										field.handleChange(ids);
									}}
								>
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

				<form.Field name="tags">
					{(field) => {
						const isInvalid = !field.state.meta.isValid;
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Tags</FieldLabel>
								<Combobox
									multiple
									autoHighlight
									onInputValueChange={(val) => setTagInput(val)}
									onValueChange={(val: string[]) => {
										const newTags = val.filter(
											(v) => !existingTags.includes(v),
										);
										if (newTags.length > 0) {
											setExistingTags((prev) => [...prev, ...newTags]);
										}
										field.handleChange(val);
										setTagInput("");
									}}
								>
									<ComboboxChips ref={tagsAnchor}>
										<ComboboxValue>
											{(values) => (
												<Fragment>
													{values.map((value: string) => (
														<ComboboxChip key={value}>{value}</ComboboxChip>
													))}
													<ComboboxChipsInput />
												</Fragment>
											)}
										</ComboboxValue>
									</ComboboxChips>
									<ComboboxContent anchor={tagsAnchor}>
										<ComboboxEmpty>No items found.</ComboboxEmpty>
										<ComboboxList>
											{tagInput && !exactTagMatch && (
												<ComboboxItem
													value={tagInput}
													className="italic text-primary"
												>
													+ Add "{tagInput}"
												</ComboboxItem>
											)}
											{filteredTags.map((tag) => (
												<ComboboxItem key={tag} value={tag}>
													{tag}
												</ComboboxItem>
											))}
										</ComboboxList>
									</ComboboxContent>
								</Combobox>
							</Field>
						);
					}}
				</form.Field>

				<form.Subscribe selector={(state) => [state.canSubmit]}>
					{([canSubmit]) => (
						<Button
							type="submit"
							className="w-full"
							disabled={!canSubmit || isPending}
						>
							{isPending && (
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
