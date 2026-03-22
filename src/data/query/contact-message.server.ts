import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessage } from "@/db/schema";
import type { InsertContactMessage } from "@/db/types";

export const selectContactMessage = async ({
	contactMessageId,
}: {
	contactMessageId: string;
}) => {
	return await db.query.contactMessage.findFirst({
		with: {
			sender: true,
		},
		where: (contactMessage, { eq }) => eq(contactMessage.id, contactMessageId),
	});
};

export const selectContactMessageList = async () => {
	return await db.query.contactMessage.findMany({
		with: {
			sender: true,
		},
		orderBy: (contactMessage, { desc }) => desc(contactMessage.createdAt),
	});
};

export const insertContactMessage = async (
	newContactMessage: InsertContactMessage,
) => {
	return await db.insert(contactMessage).values(newContactMessage).returning();
};

export const deleteContactMessage = async (contactMessageId: string) => {
	const [result] = await db
		.delete(contactMessage)
		.where(eq(contactMessage.id, contactMessageId))
		.returning();
	return result;
};
