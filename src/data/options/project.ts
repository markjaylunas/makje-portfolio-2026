import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import { getProjectListFn } from "../server/project.server";

export const getProjectListOptions = () =>
	queryOptions({
		queryKey: queryKey.project.list(),
		queryFn: () => getProjectListFn(),
	});
