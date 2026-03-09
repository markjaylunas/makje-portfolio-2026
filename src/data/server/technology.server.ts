import { createServerFn } from "@tanstack/react-start";
import {
	getTechnologyFnSchema,
	getTechnologyListFnSchema,
} from "@/form-validators/technologies";
import { createTechnologyFnSchema } from "@/form-validators/technologies/create";
import { deleteTechnologyFnSchema } from "@/form-validators/technologies/delete";
import { editTechnologyFnSchema } from "@/form-validators/technologies/edit";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	deleteTechnology,
	insertTechnology,
	selectTechnologyListWithMedia,
	selectTechnologyWithMedia,
	updateTechnology,
} from "../query/technology.server";

export const createTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await insertTechnology(data.newTechnology, data.newMedia);
	});

export const editTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(editTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await updateTechnology({
			data: { updateTechnology: data.editTechnology, newMedia: data.newMedia },
		});
	});

export const deleteTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(deleteTechnologyFnSchema)
	.handler(async ({ data: { technologyId } }) => {
		return await deleteTechnology({ technologyId });
	});
export const getTechnologyFn = createServerFn({ method: "GET" })
	.inputValidator(getTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await selectTechnologyWithMedia(data);
	});

export const getTechnologyListFn = createServerFn({ method: "GET" })
	.inputValidator(getTechnologyListFnSchema)
	.handler(async ({ data }) => {
		return await selectTechnologyListWithMedia(data);
	});
