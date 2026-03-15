import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tag } from "@/db/schema";
import { slugify } from "@/lib/utils";

export const selectTagList = async () =>
	await db.select().from(tag).orderBy(eq(tag.name, "asc"));

export const insertTags = async ({ newTags }: { newTags: string[] }) => {
	const uniqueNames = [
		...new Set(newTags.map((t) => t.trim()).filter(Boolean)),
	];
	if (uniqueNames.length === 0) return [];

	const tagsToInsert = uniqueNames.map((name) => ({
		name,
		slug: slugify(name),
	}));

	await db.insert(tag).values(tagsToInsert).onConflictDoNothing().run();

	return await db.query.tag.findMany({
		where: (tag, { inArray }) => inArray(tag.name, uniqueNames),
	});
};
