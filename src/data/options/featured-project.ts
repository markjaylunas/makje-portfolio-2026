import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import { mockFeaturedProjectList } from "../mock-data/featured-project";

export const getFeaturedProjectListOptions = () =>
	queryOptions({
		queryKey: queryKey.featuredProject.list(),
		queryFn: () => mockFeaturedProjectList,
	});
