import { Close, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAppForm } from "@/components/form/context";
import { ProjectDetails } from "@/components/project/details";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import {
	uploadProjectCoverImage,
	uploadProjectPhotoImage,
} from "@/data/client/storage";
import { getTagListOptions } from "@/data/options/tag";
import { getTechnologyListOptions } from "@/data/options/technology";
import { editProjectFn } from "@/data/server/project.server";
import type {
	InsertMedia,
	InsertProjectToTechnologies,
	UpdateProject,
} from "@/db/types";
import { PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES } from "@/form-validators/project/create";
import {
	type ProjectEditFormSchema,
	projectEditFormSchema,
} from "@/form-validators/project/edit";
import { queryKey } from "@/lib/query-key";
import type { ProjectWithRelations } from "@/lib/types";

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
		mutationFn: async ({
			values,
			isDirty,
		}: {
			values: ProjectEditFormSchema;
			isDirty: {
				coverImage: boolean;
				photos: boolean;
				tags: boolean;
				technologyList: boolean;
			};
		}) => {
			const newCoverMedia: InsertMedia | undefined =
				isDirty.coverImage && values.coverImage ? values.coverImage : undefined;

			const newPhotosMedia: InsertMedia[] | undefined =
				isDirty.photos && values.photos
					? values.photos.filter((v) => typeof v !== "undefined" && v !== null)
					: undefined;

			const newProjectToTechnologies: InsertProjectToTechnologies[] =
				isDirty.technologyList && values.technologyList
					? values.technologyList.map((v, index) => ({
							technologyId: v,
							projectId: defaultProject.id,
							order: index + 1,
						}))
					: [];

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

			const newTags: string[] | [] =
				isDirty.tags && values.tags ? values.tags.map((v) => v.label) : [];

			return await editProjectFn({
				data: {
					updatedProject,
					newProjectToTechnologies,
					newTags,
					newCoverMedia,
					newPhotosMedia,
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
		onError: (error) => {
			console.error(error);
			toast.error("Failed to edit project", { description: error.message });
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
		coverImage: defaultProject.coverImage,
		photos: defaultProject.photos.map((p) => p.media),
	};

	const form = useAppForm({
		defaultValues,
		onSubmit: ({
			value,
			formApi: {
				state: { fieldMetaBase },
			},
		}) =>
			editProjectMutation({
				values: value,
				isDirty: {
					coverImage: fieldMetaBase.coverImage?.isDirty || false,
					photos: fieldMetaBase.photos?.isDirty || false,
					tags: fieldMetaBase.tags?.isDirty || false,
					technologyList: fieldMetaBase.technologyList?.isDirty || false,
				},
			}),
		validators: {
			onSubmit: projectEditFormSchema,
		},
	});

	return (
		<div className="flex flex-col md:flex-row-reverse gap-4 md:gap-16 justify-between relative">
			<form.Subscribe selector={(state) => state.values}>
				{(project) =>
					project.coverImage ? (
						<div className="w-sm mx-auto">
							<ProjectDetails
								projectId={project.id}
								coverImage={project.coverImage.url}
								photos={project.photos
									.map((p) => p?.url)
									.filter((p) => p !== null && p !== undefined)}
								name={project.name}
								description={project.description || ""}
								repositoryUrl={project.repositoryUrl || ""}
								liveUrl={project.liveUrl || ""}
								likesCount={project.likesCount || 0}
								technologyList={technologyList
									.filter((t) => project.technologyList.includes(t.id))
									.map((t) => ({
										id: t.id,
										name: t.name,
										icon: t.icon.url,
									}))}
								tagList={project.tags.map((t) => ({
									id: t.value,
									name: t.label,
								}))}
								content={project.content || ""}
								createdAt={new Date()}
							/>
						</div>
					) : null
				}
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
						<field.ImageFileField
							label="Cover Image"
							accept={PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.join(",")}
							onUpload={uploadProjectCoverImage}
							previewUrl={defaultValues.coverImage?.url || undefined}
						/>
					)}
				</form.AppField>

				<form.AppField name="photos">
					{(field) => (
						<div className="space-y-4">
							<FieldLabel>Photos</FieldLabel>

							<div className="space-y-3">
								{field.state.value?.map((_, i) => {
									const key = `photos-${i}`;
									return (
										<form.AppField key={key} name={`photos[${i}]`}>
											{(subField) => {
												return (
													<div className="relative">
														<subField.ImageFileField
															label={`Photo ${i + 1}`}
															placeholder=""
															accept={PROJECT_COVER_IMAGE_ACCEPTED_MIME_TYPES.join(
																",",
															)}
															onUpload={uploadProjectPhotoImage}
														/>
														<Button
															type="button"
															variant="destructive"
															size="icon-xs"
															className="absolute top-0 right-0"
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

								{field.state.value?.length === 0 && (
									<div className="flex flex-col items-center justify-center py-8 border-2 border-dashed rounded-lg bg-muted/30">
										<p className="text-sm text-muted-foreground italic">
											No photos added yet.
										</p>
									</div>
								)}

								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => field.pushValue(undefined)}
									className="gap-2"
								>
									<HugeiconsIcon icon={PlusSignIcon} className="size-4" />
									Add Photo
								</Button>
							</div>
						</div>
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

				<form.AppField name="tags">
					{(field) => (
						<field.ComboboxInsertField
							label="Tags"
							optionList={tagList.map((v) => ({
								label: v.name,
								value: v.id,
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
