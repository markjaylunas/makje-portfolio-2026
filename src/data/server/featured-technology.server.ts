import { createServerFn } from "@tanstack/react-start";
import { createFeaturedTechnologyFnSchema } from "@/form-validators/featured-technology/create";
import { deleteFeaturedTechnologyFnSchema } from "@/form-validators/featured-technology/delete";
import { updateTechnologyOrderFnSchema } from "@/form-validators/featured-technology/order";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	deleteFeaturedTechnology,
	insertFeaturedTechnology,
	selectFeatureTechnologyList,
	updateTechnologyOrder,
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

export const updateTechnologyOrderFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(updateTechnologyOrderFnSchema)
	.handler(async ({ data }) => {
		return await updateTechnologyOrder(data);
	});
