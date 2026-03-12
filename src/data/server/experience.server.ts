import { createServerFn } from "@tanstack/react-start";
import { createExperienceFnSchema } from "@/form-validators/experience/create";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	insertExperience,
	selectExperienceList,
} from "../query/experience.server";

export const getExperienceListFn = createServerFn({ method: "GET" }).handler(
	async () => await selectExperienceList(),
);

export const createExperienceFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(createExperienceFnSchema)
	.handler(async ({ data }) => {
		return await insertExperience(data);
	});
