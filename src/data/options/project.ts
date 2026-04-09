import { queryOptions } from "@tanstack/react-query";
import type {
	GetProjectFnSchema,
	GetProjectListFnSchema,
} from "@/form-validators/project";
import { queryKey } from "@/lib/query-key";
import {
	getProjectFn,
	getProjectForAdminFn,
	getProjectListFn,
	getProjectListForAdminFn,
} from "../server/project.server";

export const getProjectListOptions = (params: GetProjectListFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.list(params),
		queryFn: () => getProjectListFn({ data: params }),
	});

export const getProjectListForAdminOptions = (params: GetProjectListFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.listForAdmin(params),
		queryFn: () => getProjectListForAdminFn({ data: params }),
	});

export const getProjectOptions = (params: GetProjectFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.item(params.projectId),
		queryFn: () => getProjectFn({ data: params }),
	});

export const getProjectForAdminOptions = (params: GetProjectFnSchema) =>
	queryOptions({
		queryKey: queryKey.project.itemForAdmin(params.projectId),
		queryFn: () => getProjectForAdminFn({ data: params }),
	});
