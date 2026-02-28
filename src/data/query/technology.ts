import { db } from "@/db";
import { technology } from "@/db/schema";
import type { NewTechnology } from "@/db/types";

export const insertTechnology = async (newTechnology: NewTechnology) => {
	return await db.insert(technology).values(newTechnology).returning();
};
