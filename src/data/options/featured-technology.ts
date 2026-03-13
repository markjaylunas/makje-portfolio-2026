import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import { getFeaturedTechnologyFn } from "../server/featured-technology.server";

export const getFeaturedTechnologyListOptions = () =>
	queryOptions({
		queryKey: queryKey.featuredTechnology.list(),
		queryFn: () => getFeaturedTechnologyFn(),
	});
