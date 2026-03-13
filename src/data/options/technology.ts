import { queryOptions } from "@tanstack/react-query";
import type {
	GetTechnologyFnSchema,
	GetTechnologyListFnSchema,
} from "@/form-validators/technology";
import { queryKey } from "@/lib/query-key";
import {
	getTechnologyFn,
	getTechnologyListFn,
} from "../server/technology.server";

export const getTechnologyOptions = (params: GetTechnologyFnSchema) =>
	queryOptions({
		queryKey: queryKey.technology.item(params.technologyId),
		queryFn: () => getTechnologyFn({ data: params }),
	});

export const getTechnologyListOptions = (params: GetTechnologyListFnSchema) =>
	queryOptions({
		queryKey: queryKey.technology.list(params),
		queryFn: () => getTechnologyListFn({ data: params }),
	});
