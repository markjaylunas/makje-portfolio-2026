import { createServerFn } from "@tanstack/react-start";
import {
	getTechnologyFnSchema,
	getTechnologyListFnSchema,
} from "@/form-validators/technologies";
import { createTechnologyFnSchema } from "@/form-validators/technologies/create";
import { editTechnologyFnSchema } from "@/form-validators/technologies/edit";
import { authFnMiddleware } from "../middleware/auth";
import {
	insertTechnology,
	selectTechnologyListWithMedia,
	selectTechnologyWithMedia,
	updateTechnology,
} from "../query/technology.server";

export const createTechnologyFn = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(createTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await insertTechnology(data.newTechnology, data.newMedia);
	});

export const editTechnologyFn = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(editTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await updateTechnology({
			data: { updateTechnology: data.editTechnology, newMedia: data.newMedia },
		});
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
