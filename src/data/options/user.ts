import { queryOptions } from "@tanstack/react-query";
import { getSessionFn } from "@/lib/auth.server";
import { queryKey } from "@/lib/query-key";

export const getSessionOptions = () =>
	queryOptions({
		queryKey: queryKey.session,
		queryFn: () => getSessionFn(),
	});
