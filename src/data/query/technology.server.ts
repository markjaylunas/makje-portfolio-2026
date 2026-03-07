import { eq, like } from "drizzle-orm";
import { db } from "@/db";
import { media, technology } from "@/db/schema";
import type { NewMedia, NewTechnology } from "@/db/types";

export const insertTechnology = async (
	newTechnology: NewTechnology,
	newMedia: NewMedia,
) => {
	const [mediaResult] = await db.insert(media).values(newMedia).returning();
	const [technologyResult] = await db
		.insert(technology)
		.values({
			...newTechnology,
			iconId: mediaResult.id,
		})
		.returning();

	return { ...technologyResult, icon: mediaResult };
};

export type SelectTechnologyWithMedia = Awaited<
	ReturnType<typeof selectTechnologyWithMedia>
>;

export const selectTechnologyWithMedia = async ({
	technologyId,
}: {
	technologyId: string;
}) => {
	const [{ media: mediaResult, technology: technologyResult }] = await db
		.select({
			technology,
			media,
		})
		.from(technology)
		.where(eq(technology.id, technologyId))
		.leftJoin(media, eq(media.id, technology.iconId))
		.limit(1);

	return { ...technologyResult, icon: mediaResult };
};

export type SelectTechnologyListWithMedia = Awaited<
	ReturnType<typeof selectTechnologyListWithMedia>
>[0];

export const selectTechnologyListWithMedia = async ({
	query = "",
}: {
	query?: string;
}) => {
	const qb = db
		.select({
			technology,
			media,
		})
		.from(technology)
		.leftJoin(media, eq(media.id, technology.iconId))
		.$dynamic();

	if (query) {
		qb.where(like(technology.name, `%${query}%`));
	}

	const rawList = await qb;

	const technologyList = rawList.map((row) => ({
		...row.technology,
		icon: row.media,
	}));
	return technologyList;
};
