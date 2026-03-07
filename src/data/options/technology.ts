import { queryOptions } from "@tanstack/react-query";
import type {
	GetTechnologyFnSchema,
	GetTechnologyListFnSchema,
} from "@/form-validators/technologies";
import {
	getTechnologyFn,
	getTechnologyListFn,
} from "../server/technology.server";

export const getTechnologyOptions = (params: GetTechnologyFnSchema) =>
	queryOptions({
		queryKey: ["technologies", params.technologyId],
		queryFn: () => getTechnologyFn({ data: params }),
	});

export const getTechnologyListOptions = (params: GetTechnologyListFnSchema) =>
	queryOptions({
		queryKey: ["technologies", "list", params],
		queryFn: () => getTechnologyListFn({ data: params }),
	});
