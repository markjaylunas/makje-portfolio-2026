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

export type SelectTechnologyListWithMedia = Awaited<
	ReturnType<typeof selectTechnologyListWithMedia>
>[0];

export const selectTechnologyListWithMedia = async () => {
	return await db.query.technology.findMany({
		with: {
			icon: true,
		},
	});
};
