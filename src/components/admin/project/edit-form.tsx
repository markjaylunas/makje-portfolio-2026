import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import FileImagePreview from "@/components/common/file-image-preview";
import ImagePreview from "@/components/common/image-preview";
import { useAppForm } from "@/components/form/context";
import ProjectCard from "@/components/home/project/item";
import { uploadProjectCoverImage } from "@/data/client/storage";
import { getTagListOptions } from "@/data/options/tag";
import { getTechnologyListOptions } from "@/data/options/technology";
import { editProjectFn } from "@/data/server/project.server";
import type {
	InsertMedia,
	InsertProjectToTechnologies,
	ProjectWithRelations,
	UpdateProject,
} from "@/db/types";
import { PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES } from "@/form-validators/project/create";
import {
	type ProjectEditFormSchema,
	projectEditFormSchema,
} from "@/form-validators/project/edit";
import { queryKey } from "@/lib/query-key";

export default function EditProjectForm({
	defaultProject,
}: {
	defaultProject: ProjectWithRelations;
}) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({ query: "" }),
	);

	const { data: tagList } = useSuspenseQuery(getTagListOptions());

	const { mutate: editProjectMutation, isPending } = useMutation({
		mutationFn: async (values: ProjectEditFormSchema) => {
			let newMedia: InsertMedia | undefined;
			if (values.coverImage) {
				newMedia = await uploadProjectCoverImage(values.coverImage);
			}

			const newProjectToTechnologies: InsertProjectToTechnologies[] =
				values.technologyList.map((v, index) => ({
					technologyId: v,
					projectId: defaultProject.id,
					order: index + 1,
				}));

			const updatedProject: UpdateProject = {
				id: defaultProject.id,
				name: values.name,
				description: values.description,
				content: values.content,
				repositoryUrl: values.repositoryUrl,
				liveUrl: values.liveUrl,
				likesCount: values.likesCount,
				coverImageId: defaultProject.coverImageId,
			};

			return await editProjectFn({
				data: {
					updatedProject,
					newProjectToTechnologies,
					newTags: values.tags,
					newMedia,
				},
			});
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.project.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.item(defaultProject.id),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.tag.list(),
				}),
			]);
			form.reset();
			navigate({ to: "/admin/project" });
		},
	});

	const defaultValues: ProjectEditFormSchema = {
		id: defaultProject.id,
		name: defaultProject.name,
		description: defaultProject.description || "",
		content: defaultProject.content || "",
		repositoryUrl: defaultProject.repositoryUrl || "",
		liveUrl: defaultProject.liveUrl || "",
		likesCount: defaultProject.likesCount || 0,
		technologyList: defaultProject.technologies.map((v) => v.technologyId),
		tags: defaultProject.tags.map((v) => ({
			label: v.tag.name,
			value: v.tag.id,
		})),
		coverImageUrl: defaultProject.coverImage?.url,
		coverImage: null,
	};

	const form = useAppForm({
		defaultValues,
		onSubmit: ({ value }) => editProjectMutation(value),
		validators: {
			onSubmit: projectEditFormSchema,
		},
	});

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-between relative">
			<form.Subscribe selector={(state) => state.values}>
				{(project) => (
					<FileImagePreview file={project.coverImage}>
						{(coverImageUrl) => (
							<div className="w-sm mx-auto">
								<ProjectCard
									coverImage={coverImageUrl || project.coverImageUrl}
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
										name: t.label,
										slug: t.label,
									}))}
								/>
							</div>
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
							{(url) => (
								<ImagePreview
									url={url || defaultValues.coverImageUrl}
									alt="Cover"
								/>
							)}
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
						<field.ComboboxInsertField
							label="Tags"
							optionList={tagList.map((v) => ({
								label: v.name,
								value: v.id,
								isInsert: false,
							}))}
						/>
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
