import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import FileImagePreview from "@/components/common/file-image-preview";
import ImagePreview from "@/components/common/image-preview";
import { useAppForm } from "@/components/form/context";
import ProjectCard from "@/components/home/project/item";
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
import { FieldLabel } from "@/components/ui/field";
import { uploadProjectCoverImage } from "@/data/client/storage";
import { getTagListOptions } from "@/data/options/tag";
import { getTechnologyListOptions } from "@/data/options/technology";
import { createProjectFn } from "@/data/server/project.server";
import type { InsertProject, InsertProjectToTechnologies } from "@/db/types";
import {
	defaultValues,
	PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES,
	type ProjectCreateFormSchema,
	projectCreateFormSchema,
} from "@/form-validators/project/create";
import { queryKey } from "@/lib/query-key";
import { slugify } from "@/lib/utils";

export default function CreateProjectForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({ query: "" }),
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

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => createProjectMutation(value),
		validators: {
			onSubmit: projectCreateFormSchema,
		},
	});

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-between relative">
			<form.Subscribe selector={(state) => state.values}>
				{(project) => (
					<FileImagePreview file={project.coverImage}>
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
				className="space-y-6 overflow-x-hidden flex-1"
			>
				<form.AppField name="name">
					{(field) => (
						<field.TextField label="Name" placeholder="e.g. My Project" />
					)}
				</form.AppField>

				<form.AppField name="description">
					{(field) => (
						<field.TextareaField
							label="Description"
							placeholder="A short summary..."
						/>
					)}
				</form.AppField>

				<form.AppField name="content">
					{(field) => (
						<field.TextareaField
							label="Content"
							placeholder="Detailed information..."
						/>
					)}
				</form.AppField>

				<form.AppField name="repositoryUrl">
					{(field) => (
						<field.TextField
							label="Repository URL"
							placeholder="https://github.com/..."
						/>
					)}
				</form.AppField>

				<form.AppField name="liveUrl">
					{(field) => (
						<field.TextField label="Live URL" placeholder="https://..." />
					)}
				</form.AppField>

				<form.AppField name="coverImage">
					{(field) => (
						<field.FileField
							label="Cover Image"
							accept={PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.join(",")}
						/>
					)}
				</form.AppField>

				<form.Subscribe selector={(state) => state.values.coverImage}>
					{(coverImage) => (
						<FileImagePreview file={coverImage}>
							{(url) => <ImagePreview url={url} alt="Cover" />}
						</FileImagePreview>
					)}
				</form.Subscribe>

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

				<form.AppField name="tags">
					{(field) => (
						<TagField field={field} initialTags={tagList.map((t) => t.name)} />
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

function TagField({
	field,
	initialTags,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: React form field types are too deep
	field: any;
	initialTags: string[];
}) {
	const tagsAnchor = useComboboxAnchor();
	const [tagInput, setTagInput] = useState("");
	const [existingTags, setExistingTags] = useState(initialTags);

	const exactTagMatch = existingTags.some(
		(tag) => tag.toLowerCase() === tagInput.toLowerCase(),
	);
	const filteredTags = existingTags.filter((tag) =>
		tag.toLowerCase().includes(tagInput.toLowerCase()),
	);

	return (
		<div className="space-y-2">
			<FieldLabel htmlFor={field.name}>Tags</FieldLabel>
			<Combobox
				multiple
				autoHighlight
				onInputValueChange={(val) => setTagInput(val)}
				onValueChange={(val: string[]) => {
					const newTags = val.filter((v) => !existingTags.includes(v));
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
							<ComboboxItem value={tagInput} className="italic text-primary">
								<HugeiconsIcon icon={PlusSignIcon} className="size-4 mr-2" />
								Add "{tagInput}"
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
		</div>
	);
}
