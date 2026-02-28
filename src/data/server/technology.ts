import { createServerFn } from "@tanstack/react-start";
import { technologyCreateSchema } from "@/db/schema-validation";
import { authFnMiddleware } from "../middleware/auth";
import { insertTechnology } from "../query/technology";

export const createTechnology = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(technologyCreateSchema)
	.handler(async ({ data }) => {
		return await insertTechnology(data);
	});
