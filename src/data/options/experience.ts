import { queryOptions } from "@tanstack/react-query";
import { getExperienceListFn } from "../server/experience.server";

export const getExperienceListOptions = () =>
	queryOptions({
		queryKey: ["experience", "list"],
		queryFn: () => getExperienceListFn(),
	});
