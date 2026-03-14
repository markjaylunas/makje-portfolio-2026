import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import type { ProjectWithRelations } from "@/lib/types";

export const getProjectListOptions = () =>
	queryOptions({
		queryKey: queryKey.project.list(),
		queryFn: () => [] as ProjectWithRelations[],
	});
