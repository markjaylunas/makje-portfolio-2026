import { queryOptions } from "@tanstack/react-query";
import type { GetExperienceFnSchema } from "@/form-validators/experience";
import {
	getExperienceFn,
	getExperienceListFn,
} from "../server/experience.server";

export const getExperienceListOptions = () =>
	queryOptions({
		queryKey: ["experience", "list"],
		queryFn: () => getExperienceListFn(),
	});
export const getExperienceOptions = (params: GetExperienceFnSchema) =>
	queryOptions({
		queryKey: ["experience", params.experienceId],
		queryFn: () => getExperienceFn({ data: params }),
	});
