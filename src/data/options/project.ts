import { queryOptions } from "@tanstack/react-query";
import type {
	GetProjectFnSchema,
	GetProjectListFnSchema,
} from "@/form-validators/project";
import { queryKey } from "@/lib/query-key";
import { getProjectFn, getProjectListFn } from "../server/project.server";

export const getProjectListOptions = (params: GetProjectListFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.list(params),
		queryFn: () => getProjectListFn({ data: params }),
	});

export const getProjectOptions = (params: GetProjectFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.item(params.projectId),
		queryFn: () => getProjectFn({ data: params }),
	});
