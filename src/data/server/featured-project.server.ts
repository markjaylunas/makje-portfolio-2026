import { createServerFn } from "@tanstack/react-start";
import { createFeaturedProjectFnSchema } from "@/form-validators/featured-project/create";
import { deleteFeaturedProjectFnSchema } from "@/form-validators/featured-project/delete";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	deleteFeaturedProject,
	insertFeaturedProject,
	selectFeaturedProjectList,
} from "../query/featured-project.server";

export const createFeaturedProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createFeaturedProjectFnSchema)
	.handler(async ({ data: { projectId } }) => {
		return await insertFeaturedProject({ projectId });
	});

export const deleteFeaturedProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(deleteFeaturedProjectFnSchema)
	.handler(async ({ data: { featuredProjectId } }) => {
		return await deleteFeaturedProject({ featuredProjectId });
	});

export const getFeaturedProjectListFn = createServerFn({
	method: "GET",
}).handler(async () => {
	return await selectFeaturedProjectList();
});
