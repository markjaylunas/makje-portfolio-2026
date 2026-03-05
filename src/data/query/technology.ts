import { db } from "@/db";
import { media, technology } from "@/db/schema";
import type { NewMedia, NewTechnology } from "@/db/types";

export const insertTechnology = async (newTechnology: NewTechnology) => {
	return await db.insert(technology).values(newTechnology).returning();
};

export const insertMedia = async (newMedia: NewMedia) => {
	console.log("in insert media");
	const data = await db.insert(media).values(newMedia).returning();
	console.log({ data }, "data");
	return data;
};
