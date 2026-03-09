import { desc } from "drizzle-orm";
import { db } from "@/db";
import { featuredTechnology } from "@/db/schema";
import type { InsertFeaturedTechnology } from "@/db/types";

export const insertFeaturedTechnology = async (
	newFeaturedTechnology: InsertFeaturedTechnology,
) => {
	let values = { ...newFeaturedTechnology };

	if (newFeaturedTechnology.order === 0) {
		const [lastFeaturedTechnology] = await db
			.select()
			.from(featuredTechnology)
			.orderBy(desc(featuredTechnology.order))
			.limit(1);

		const order = lastFeaturedTechnology?.order
			? lastFeaturedTechnology.order + 1
			: 1;

		values = { ...values, order };
	}

	const [result] = await db
		.insert(featuredTechnology)
		.values(values)
		.returning();

	return result;
};

export const selectFeatureTechnologyList = async () => {
	const featuredTechnologyList = await db.query.featuredTechnology.findMany({
		with: {
			technology: true,
		},
		orderBy: (technology, { asc }) => asc(technology.order),
	});
	return featuredTechnologyList;
};
