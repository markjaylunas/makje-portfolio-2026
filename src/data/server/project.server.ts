import { createServerFn } from "@tanstack/react-start";
import { getProjectListFnSchema } from "@/form-validators/project";
import { createProjectFnSchema } from "@/form-validators/project/create";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import { insertProject, selectProjectList } from "../query/project.server";

export const createProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createProjectFnSchema)
	.handler(async ({ data }) => {
		return await insertProject(data);
	});

export const getProjectListFn = createServerFn({ method: "GET" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(getProjectListFnSchema)
	.handler(async ({ data }) => {
		return await selectProjectList(data);
	});
