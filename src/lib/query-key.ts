type Params =
	| Record<string, string | number | boolean | null | undefined>
	| undefined;

const paramsSerializer = (params: Params) => {
	if (!params) return "";
	return Object.entries(params)
		.filter(([_, value]) => value !== null && value !== undefined)
		.map(([key, value]) => `${key}=${value}`)
		.join("&");
};
export const queryKey = {
	project: {
		list: (params?: Params) => [
			"project",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["project", "item", id],
	},
	experience: {
		list: (params?: Params) => [
			"experience",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["experience", "item", id],
	},
	technology: {
		list: (params?: Params) => [
			"technology",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["technology", "item", id],
	},
	featuredTechnology: {
		list: (params?: Params) => [
			"featured-technology",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["featured-technology", "item", id],
	},
	featuredProject: {
		list: (params?: Params) => [
			"featured-project",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["featured-project", "item", id],
	},
	tag: {
		list: (params?: Params) => [
			"tag",
			"list",
			...(params ? [paramsSerializer(params)] : []),
		],
		item: (id: string) => ["tag", "item", id],
	},
};
