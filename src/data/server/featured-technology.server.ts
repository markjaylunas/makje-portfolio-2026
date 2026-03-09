import { createServerFn } from "@tanstack/react-start";
import { createFeaturedTechnologyFnSchema } from "@/form-validators/featured-technology/create";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import { insertFeaturedTechnology } from "../query/featured-technology.server";

export const createFeaturedTechnologyFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createFeaturedTechnologyFnSchema)
	.handler(async ({ data }) => {
		return await insertFeaturedTechnology(data);
	});
