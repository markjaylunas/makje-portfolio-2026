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
import ProjectCard from "@/components/home/project/item";
import { Button } from "@/components/ui/button";
import { FieldLabel } from "@/components/ui/field";
import {
	uploadProjectCoverImage,
	uploadProjectPhotoImage,
} from "@/data/client/storage";
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

export default function CreateProjectForm() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { data: technologyList } = useSuspenseQuery(
		getTechnologyListOptions({ query: "" }),
	);

	const { data: tagList } = useSuspenseQuery(getTagListOptions());

	const { mutate: createProjectMutation, isPending } = useMutation({
		mutationFn: async (values: ProjectCreateFormSchema) => {
			if (!values.coverImage) {
				throw new Error("Cover image is required");
			}

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
				coverImageId: "",
			};

			const newPhotosMedia =
				values.photos?.filter(
					(media) => media !== null && media !== undefined,
				) ?? undefined;

			const newTags = values.tags.map((t) => t.label);

			return await createProjectFn({
				data: {
					newProject,
					newProjectToTechnologies,
					newTags,
					newCoverMedia: values.coverImage,
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
					queryKey: queryKey.tag.list(),
				}),
			]);
			form.reset();
			navigate({ to: "/admin/project" });
		},
		onError: (error) => {
			console.error(error);
			toast.error("Failed to create project", { description: error.message });
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
					<div className="w-sm mx-auto">
						<ProjectCard
							projectId=""
							coverImage={project.coverImage?.url ?? undefined}
							photos={project.photos.map((img) => img?.url || "")}
							name={project.name}
							description={project.description || ""}
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
						<field.TextField
							label="Name"
							placeholder="e.g. My Project"
							autoFocus
						/>
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
						/>
					)}
				</form.AppField>

				<form.AppField name="photos">
					{(field) => (
						<div className="space-y-4">
							<FieldLabel>Photos</FieldLabel>

							<div className="space-y-3">
								{field.state.value.map((_, i) => {
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

								{field.state.value.length === 0 && (
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
