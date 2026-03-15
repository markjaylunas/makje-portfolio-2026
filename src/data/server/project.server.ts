import { createServerFn } from "@tanstack/react-start";
import { createProjectFnSchema } from "@/form-validators/project/create";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import { insertProject } from "../query/project.server";

export const createProjectFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createProjectFnSchema)
	.handler(async ({ data }) => {
		return await insertProject(data);
	});
