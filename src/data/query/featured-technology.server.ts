import { desc, eq, inArray, sql } from "drizzle-orm";
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

export const updateTechnologyOrder = async ({
	featuredTechnologyIdList,
}: {
	featuredTechnologyIdList: string[];
}) => {
	// 1. Fetch current items to handle reconciliation
	const currentItems = await db.query.featuredTechnology.findMany({
		columns: { id: true, updatedAt: true },
	});

	const currentIds = currentItems.map((f) => f.id);

	// 2. Identify missing IDs and sort by updatedAt
	const missingIds = currentItems
		.filter((f) => !featuredTechnologyIdList.includes(f.id))
		.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
		.map((f) => f.id);

	// 3. Create the final ordered array of IDs
	const finalOrder = [...featuredTechnologyIdList, ...missingIds].filter((id) =>
		currentIds.includes(id),
	);

	if (finalOrder.length === 0) return;

	// 4. Build the CASE statement for a single UPDATE
	// SQL: UPDATE featured_technology SET order = CASE id WHEN 'id1' THEN 1 WHEN 'id2' THEN 2 END...
	const sqlChunks = [];
	sqlChunks.push(sql`CASE ${featuredTechnology.id}`);

	finalOrder.forEach((id, index) => {
		sqlChunks.push(sql`WHEN ${id} THEN ${index + 1}`);
	});

	sqlChunks.push(sql`END`);

	// 5. Execute as one single statement
	const result = await db
		.update(featuredTechnology)
		.set({
			order: sql.join(sqlChunks, sql.raw(" ")),
			updatedAt: new Date(),
		})
		.where(inArray(featuredTechnology.id, finalOrder))
		.returning();

	return result;
};
