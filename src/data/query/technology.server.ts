import { eq, like } from "drizzle-orm";
import { db } from "@/db";
import { media, technology } from "@/db/schema";
import type {
	InsertMedia,
	InsertTechnology,
	Media,
	UpdateTechnology,
} from "@/db/types";

export const insertTechnology = async (
	newTechnology: InsertTechnology,
	newMedia: InsertMedia,
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

export const updateTechnology = async ({
	data: { updateTechnology, newMedia },
}: {
	data: { updateTechnology: UpdateTechnology; newMedia?: InsertMedia };
}) => {
	let mediaResult: Media | undefined;
	if (newMedia) {
		[mediaResult] = await db.insert(media).values(newMedia).returning();
	} else {
		const [{ media: mediaSelectResult }] = await db
			.select({ media })
			.from(technology)
			.where(eq(technology.id, updateTechnology.id))
			.leftJoin(media, eq(media.id, technology.iconId))
			.limit(1);
		if (!mediaSelectResult) {
			throw new Error("Media not found");
		}

		mediaResult = mediaSelectResult;
	}
	const [technologyResult] = await db
		.update(technology)
		.set({
			...updateTechnology,
			iconId: mediaResult?.id ? mediaResult.id : updateTechnology.iconId,
		})
		.where(eq(technology.id, updateTechnology.id))
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
