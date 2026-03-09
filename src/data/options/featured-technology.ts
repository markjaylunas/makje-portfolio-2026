import { queryOptions } from "@tanstack/react-query";
import { getFeaturedTechnologyFn } from "../server/featured-technology.server";

export const getFeaturedTechnologyListOptions = () =>
	queryOptions({
		queryKey: ["featured-technology", "list"],
		queryFn: () => getFeaturedTechnologyFn(),
	});
