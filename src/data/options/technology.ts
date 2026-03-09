import { queryOptions } from "@tanstack/react-query";
import type {
	GetTechnologyFnSchema,
	GetTechnologyListFnSchema,
} from "@/form-validators/technology";
import {
	getTechnologyFn,
	getTechnologyListFn,
} from "../server/technology.server";

export const getTechnologyOptions = (params: GetTechnologyFnSchema) =>
	queryOptions({
		queryKey: ["technology", params.technologyId],
		queryFn: () => getTechnologyFn({ data: params }),
	});

export const getTechnologyListOptions = (params: GetTechnologyListFnSchema) =>
	queryOptions({
		queryKey: ["technology", "list", params],
		queryFn: () => getTechnologyListFn({ data: params }),
	});
