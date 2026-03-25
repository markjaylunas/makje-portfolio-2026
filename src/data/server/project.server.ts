import { createServerFn } from "@tanstack/react-start";
import {
	getProjectFnSchema,
	getProjectListFnSchema,
} from "@/form-validators/project";
import { createProjectFnSchema } from "@/form-validators/project/create";
import { deleteProjectFnSchema } from "@/form-validators/project/delete";
import { editProjectFnSchema } from "@/form-validators/project/edit";
import { BUCKET_DIRECTORIES } from "@/lib/bucket-directories";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	deleteProject,
	insertProject,
	selectProject,
	selectProjectList,
	updateProject,
} from "../query/project.server";
import { moveR2File } from "./storage.server";

export const editProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(editProjectFnSchema)
	.handler(async ({ data }) => {
		if (data.newMedia) {
			data.newMedia = await moveR2File(
				data.newMedia,
				BUCKET_DIRECTORIES.PROJECT.COVER_IMAGE,
			);
		}
		return await updateProject(data);
	});

export const createProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createProjectFnSchema)
	.handler(async ({ data }) => {
		data.newMedia = await moveR2File(
			data.newMedia,
			BUCKET_DIRECTORIES.PROJECT.COVER_IMAGE,
		);
		return await insertProject(data);
	});

export const getProjectListFn = createServerFn({ method: "GET" })
	.inputValidator(getProjectListFnSchema)
	.handler(async ({ data }) => {
		return await selectProjectList(data);
	});

export const getProjectFn = createServerFn({ method: "GET" })
	.inputValidator(getProjectFnSchema)
	.handler(async ({ data }) => {
		return await selectProject(data);
	});

export const deleteProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(deleteProjectFnSchema)
	.handler(async ({ data: { projectId } }) => {
		return await deleteProject({ projectId });
	});
