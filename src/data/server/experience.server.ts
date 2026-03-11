import { createServerFn } from "@tanstack/react-start";
import { selectExperienceList } from "../query/experience.server";

export const getExperienceListFn = createServerFn({ method: "GET" }).handler(
	async () => await selectExperienceList(),
);
