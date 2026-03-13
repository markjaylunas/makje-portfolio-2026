import { createServerFn } from "@tanstack/react-start";
import { getExperienceFnSchema } from "@/form-validators/experience";
import { createExperienceFnSchema } from "@/form-validators/experience/create";
import { editExperienceFnSchema } from "@/form-validators/experience/edit";
import { ensureAdminFnMiddleware } from "../middleware/auth";
import {
	editExperience,
	insertExperience,
	selectExperience,
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

export const getExperienceFn = createServerFn({ method: "GET" })
	.inputValidator(getExperienceFnSchema)
	.handler(async ({ data }) => await selectExperience(data));

export const editExperienceFn = createServerFn({ method: "POST" })
	.middleware([ensureAdminFnMiddleware])
	.inputValidator(editExperienceFnSchema)
	.handler(async ({ data }) => await editExperience(data));
