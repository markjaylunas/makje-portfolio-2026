import { createServerFn } from "@tanstack/react-start";
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
	.handler(async () => {
		return await selectProjectList();
	});
