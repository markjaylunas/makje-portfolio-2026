import { queryOptions } from "@tanstack/react-query";
import type { GetProjectListFnSchema } from "@/form-validators/project";
import { queryKey } from "@/lib/query-key";
import { getProjectListFn } from "../server/project.server";

export const getProjectListOptions = (params: GetProjectListFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.list(params),
		queryFn: () => getProjectListFn({ data: params }),
	});
