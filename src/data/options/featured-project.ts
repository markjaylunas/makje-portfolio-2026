import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import { getFeaturedProjectListFn } from "../server/featured-project.server";

export const getFeaturedProjectListOptions = () =>
	queryOptions({
		queryKey: queryKey.featuredProject.list(),
		queryFn: () => getFeaturedProjectListFn(),
	});
