import { createServerFn } from "@tanstack/react-start";
import { createFeaturedTechnologyFnSchema } from "@/form-validators/featured-technology/create";
import { deleteFeaturedTechnologyFnSchema } from "@/form-validators/featured-technology/delete";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	deleteFeaturedTechnology,
	insertFeaturedTechnology,
	selectFeatureTechnologyList,
} from "../query/featured-technology.server";

export const getFeaturedTechnologyFn = createServerFn({
	method: "GET",
}).handler(async () => await selectFeatureTechnologyList());

export const createFeaturedTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createFeaturedTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await insertFeaturedTechnology(data);
	});

export const deleteFeaturedTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(deleteFeaturedTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await deleteFeaturedTechnology(data);
	});
