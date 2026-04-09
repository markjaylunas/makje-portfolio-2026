import { createServerFn } from "@tanstack/react-start";
import {
	getProjectFnSchema,
	getProjectListFnSchema,
	toggleProjectDisabledFnSchema,
	toggleProjectLikeFnSchema,
} from "@/form-validators/project";
import { createProjectFnSchema } from "@/form-validators/project/create";
import { deleteProjectFnSchema } from "@/form-validators/project/delete";
import { editProjectFnSchema } from "@/form-validators/project/edit";
import { BUCKET_DIRECTORIES } from "@/lib/bucket-directories";
import {
	authFnMiddleware,
	ensureAdminFnMiddleware,
	optionalAuthFnMiddleware,
} from "../middleware/auth";
import {
	deleteProject,
	insertProject,
	selectProject,
	selectProjectForAdmin,
	selectProjectList,
	selectProjectListForAdmin,
	toggleProjectDisabled,
	toggleProjectLike,
	updateProject,
} from "../query/project.server";
import { moveR2File } from "./storage.server";

export const editProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(editProjectFnSchema)
	.handler(async ({ data }) => {
		if (data.newCoverMedia) {
			if (data.newCoverMedia.keyDirectory !== BUCKET_DIRECTORIES.TEMP) {
				return data.newCoverMedia;
			}
			data.newCoverMedia = await moveR2File(
				data.newCoverMedia,
				BUCKET_DIRECTORIES.PROJECT.COVER_IMAGE,
			);
		}
		if (data.newPhotosMedia) {
			const photosMedia = data.newPhotosMedia.filter((media) => media !== null);
			const newPhotosMedia = await Promise.all(
				photosMedia.map((newMedia) => {
					if (newMedia.keyDirectory === BUCKET_DIRECTORIES.TEMP) {
						return moveR2File(newMedia, BUCKET_DIRECTORIES.PROJECT.PHOTO_IMAGE);
					}
					return newMedia;
				}),
			);
			data.newPhotosMedia = newPhotosMedia;
		}
		return await updateProject(data);
	});

export const createProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createProjectFnSchema)
	.handler(async ({ data }) => {
		const photosMedia = (data.newPhotosMedia ?? []).filter(
			(media) => media !== null,
		);
		const newCoverMedia = await moveR2File(
			data.newCoverMedia,
			BUCKET_DIRECTORIES.PROJECT.COVER_IMAGE,
		);
		const newPhotosMedia = await Promise.all(
			photosMedia.map((newMedia) =>
				moveR2File(newMedia, BUCKET_DIRECTORIES.PROJECT.PHOTO_IMAGE),
			),
		);

		return await insertProject({
			...data,
			newCoverMedia,
			newPhotosMedia,
		});
	});

export const getProjectListFn = createServerFn({ method: "GET" })
	.inputValidator(getProjectListFnSchema)
	.handler(async ({ data }) => {
		return await selectProjectList(data);
	});

export const getProjectFn = createServerFn({ method: "GET" })
	.middleware([optionalAuthFnMiddleware])
	.inputValidator(getProjectFnSchema)
	.handler(async ({ data, context }) => {
		const userId = context.session?.user.id;
		return await selectProject({ ...data, userId });
	});

export const deleteProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(deleteProjectFnSchema)
	.handler(async ({ data: { projectId } }) => {
		return await deleteProject({ projectId });
	});

export const toggleProjectLikeFn = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(toggleProjectLikeFnSchema)
	.handler(async ({ data: { projectId }, context }) => {
		return await toggleProjectLike({
			projectId,
			userId: context.session?.user.id,
		});
	});

export const getProjectListForAdminFn = createServerFn({ method: "GET" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(getProjectListFnSchema)
	.handler(async ({ data }) => {
		return await selectProjectListForAdmin(data);
	});

export const getProjectForAdminFn = createServerFn({ method: "GET" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(getProjectFnSchema)
	.handler(async ({ data, context }) => {
		const userId = context.session?.user.id;
		return await selectProjectForAdmin({ ...data, userId });
	});

export const toggleProjectDisabledFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(toggleProjectDisabledFnSchema)
	.handler(async ({ data: { projectId } }) => {
		return await toggleProjectDisabled({ projectId });
	});
