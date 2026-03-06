import { queryOptions } from "@tanstack/react-query";
import type { GetTechnologyListFnSchema } from "@/form-validators/technologies";
import { getTechnologyListFn } from "../server/technology.server";

export const getTechnologyListOptions = (params: GetTechnologyListFnSchema) =>
	queryOptions({
		queryKey: ["technologies", "list", params],
		queryFn: () => getTechnologyListFn({ data: params }),
	});
