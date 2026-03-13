import { queryOptions } from "@tanstack/react-query";
import type { GetExperienceFnSchema } from "@/form-validators/experience";
import { queryKey } from "@/lib/query-key";
import {
	getExperienceFn,
	getExperienceListFn,
} from "../server/experience.server";

export const getExperienceListOptions = () =>
	queryOptions({
		queryKey: queryKey.experience.list(),
		queryFn: () => getExperienceListFn(),
	});
export const getExperienceOptions = (params: GetExperienceFnSchema) =>
	queryOptions({
		queryKey: queryKey.experience.item(params.experienceId),
		queryFn: () => getExperienceFn({ data: params }),
	});
