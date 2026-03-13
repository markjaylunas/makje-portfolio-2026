import { eq } from "drizzle-orm";
import { db } from "@/db";
import { media, technology } from "@/db/schema";
import type {
	InsertMedia,
	InsertTechnology,
	Media,
	UpdateTechnology,
} from "@/db/types";
import type { TechnologyDeleteFormSchema } from "@/form-validators/technology/delete";

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
		if (updateTechnology.iconId) {
			await db.delete(media).where(eq(media.id, updateTechnology.iconId));
		}

		const [newMediaResult] = await db
			.insert(media)
			.values(newMedia)
			.returning();
		mediaResult = newMediaResult;
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

export const deleteTechnology = async ({
	technologyId,
}: TechnologyDeleteFormSchema) => {
	const [deleted] = await db
		.delete(technology)
		.where(eq(technology.id, technologyId))
		.limit(1)
		.returning();
	return deleted;
};

export const selectTechnology = async ({
	technologyId,
}: {
	technologyId: string;
}) =>
	await db.query.technology.findFirst({
		where: (technology, { eq }) => eq(technology.id, technologyId),
		with: { icon: true },
	});

export const selectTechnologyList = async ({
	query = "",
}: {
	query?: string;
}) => {
	return await db.query.technology.findMany({
		with: { icon: true, featured: true },
		where: (technology, { like }) => like(technology.name, `%${query}%`),
		orderBy: (technology, { desc }) => [desc(technology.createdAt)],
	});
};
