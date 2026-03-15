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
import { deleteMedia } from "./media.server";

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
	// check if technology is featured
	const featuredTechnologyExists = await db.query.featuredTechnology.findFirst({
		where: (featuredTechnology, { eq }) =>
			eq(featuredTechnology.technologyId, technologyId),
	});

	if (featuredTechnologyExists) {
		throw new Error(
			"Technology is featured, please remove it from featured technologies first",
		);
	}

	// check if technology is used in projects
	const projectToTechnologiesExists =
		await db.query.projectToTechnologies.findFirst({
			where: (projectToTechnologies, { eq }) =>
				eq(projectToTechnologies.technologyId, technologyId),
		});

	if (projectToTechnologiesExists) {
		throw new Error("Technology is used in projects");
	}

	// check if technology is used in experience
	const experienceToTechnologiesExists =
		await db.query.experienceToTechnologies.findFirst({
			where: (experienceToTechnologies, { eq }) =>
				eq(experienceToTechnologies.technologyId, technologyId),
		});

	if (experienceToTechnologiesExists) {
		throw new Error("Technology is used in experience");
	}

	const [deleted] = await db
		.delete(technology)
		.where(eq(technology.id, technologyId))
		.returning();

	await deleteMedia({ mediaId: deleted.iconId });

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
