import { queryOptions } from "@tanstack/react-query";
import { getTechnologyListFn } from "../server/technology.server";

export const getTechnologyListOptions = queryOptions({
	queryKey: ["technologies", "all"],
	queryFn: getTechnologyListFn,
});
