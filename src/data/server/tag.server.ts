import { createServerFn } from "@tanstack/react-start";
import { selectTagList } from "../query/tag.server";

export const getTagListFn = createServerFn({ method: "GET" }).handler(
	async () => await selectTagList(),
);
