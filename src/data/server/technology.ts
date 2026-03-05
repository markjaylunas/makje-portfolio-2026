import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { technologyCreateSchema } from "@/db/schema-validation";
import { authFnMiddleware } from "../middleware/auth";
import { insertMedia, insertTechnology } from "../query/technology";

export const createTechnology = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(technologyCreateSchema)
	.handler(async ({ data }) => {
		return await insertTechnology(data);
	});

const mediaCreateSchema = z.object({
	keyDirectory: z.string().min(1),
	keyPath: z.string().min(1),
	url: z.string().min(1),
	fileName: z.string().min(1),
	contentType: z.string().optional(),
	size: z.number().optional(),
	altText: z.string().optional(),
});

export const createMedia = createServerFn({ method: "POST" })
	.middleware([authFnMiddleware])
	.inputValidator(mediaCreateSchema)
	.handler(async ({ data }) => {
		console.log("in media create server fn");
		return await insertMedia(data);
	});
