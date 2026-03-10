import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { featuredTechnology } from "@/db/schema";
import type { InsertFeaturedTechnology } from "@/db/types";

export const insertFeaturedTechnology = async (
	newFeaturedTechnology: InsertFeaturedTechnology,
) => {
	const isAlreadyExist = await selectFeatureTechnologyById({
		technologyId: newFeaturedTechnology.technologyId,
	});

	if (isAlreadyExist) {
		throw Error("Technology is already featured");
	}

	let order = newFeaturedTechnology.order;

	if (order === undefined || order === null) {
		const [lastItem] = await db
			.select({ order: featuredTechnology.order })
			.from(featuredTechnology)
			.orderBy(desc(featuredTechnology.order))
			.limit(1);

		order = lastItem?.order ? lastItem.order + 1 : 1;
	}

	const [result] = await db
		.insert(featuredTechnology)
		.values({
			...newFeaturedTechnology,
			order: order,
		})
		.returning();

	return result;
};

export async function selectFeatureTechnologyById({
	technologyId,
}: {
	technologyId: string;
}) {
	return await db.query.featuredTechnology.findFirst({
		where: (technology, { eq }) => eq(technology.technologyId, technologyId),
	});
}

export const selectFeatureTechnologyList = async () => {
	const featuredTechnologyList = await db.query.featuredTechnology.findMany({
		with: {
			technology: {
				with: { icon: true },
			},
		},
		orderBy: (technology, { asc }) => asc(technology.order),
	});
	return featuredTechnologyList;
};

export const deleteFeaturedTechnology = async ({
	featuredTechnologyId,
}: {
	featuredTechnologyId: string;
}) => {
	const [result] = await db
		.delete(featuredTechnology)
		.where(eq(featuredTechnology.id, featuredTechnologyId))
		.returning();

	return result;
};
