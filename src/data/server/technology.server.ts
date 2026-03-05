import { createServerFn } from "@tanstack/react-start";
import { createTechnologyFnSchema } from "@/form-validators/technologies/create";
import { authFnMiddleware } from "../middleware/auth";
import {
	insertTechnology,
	selectTechnologyListWithMedia,
} from "../query/technology.server";

export const createTechnologyFn = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(createTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await insertTechnology(data.newTechnology, data.newMedia);
	});

export const getTechnologyListFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return await selectTechnologyListWithMedia();
	},
);
