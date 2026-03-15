import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import { getTagListFn } from "../server/tag.server";

export const getTagListOptions = () =>
	queryOptions({
		queryKey: queryKey.tag.list(),
		queryFn: () => getTagListFn(),
	});
