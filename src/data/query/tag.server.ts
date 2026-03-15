import { eq } from "drizzle-orm";
import { db } from "@/db";
import { tag } from "@/db/schema";

export const selectTagList = async () =>
	await db.select().from(tag).orderBy(eq(tag.name, "asc"));
