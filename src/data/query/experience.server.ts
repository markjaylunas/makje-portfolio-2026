import { eq } from "drizzle-orm";
import { db } from "@/db";
import { experience, experienceToTechnologies, media } from "@/db/schema";
import type {
	InsertExperience,
	InsertExperienceToTechnologies,
	InsertMedia,
	Media,
} from "@/db/types";
import type { EditExperienceFnSchema } from "@/form-validators/experience/edit";
import { deleteMedia } from "./media.server";

export const selectExperienceList = async () => {
	return await db.query.experience.findMany({
		with: {
			logo: true,
			technologies: {
				orderBy: (experienceToTechnologies, { asc }) =>
					asc(experienceToTechnologies.order),
				with: {
					technology: {
						with: {
							icon: true,
						},
					},
				},
			},
		},
		orderBy: (experience, { desc }) => desc(experience.startDate),
	});
};

export const selectExperience = async ({
	experienceId,
}: {
	experienceId: string;
}) => {
	return await db.query.experience.findFirst({
		with: {
			logo: true,
			technologies: {
				orderBy: (experienceToTechnologies, { asc }) =>
					asc(experienceToTechnologies.order),
				with: {
					technology: {
						with: {
							icon: true,
						},
					},
				},
			},
		},
		where: (experience, { eq }) => eq(experience.id, experienceId),
	});
};

export const insertExperience = async ({
	newExperience,
	newExperienceToTechnologies,
	newMedia,
}: {
	newExperience: InsertExperience;
	newExperienceToTechnologies: InsertExperienceToTechnologies[];
	newMedia: InsertMedia;
}) => {
	const [mediaResult] = await db.insert(media).values(newMedia).returning();

	const [experienceResult] = await db
		.insert(experience)
		.values({
			...newExperience,
			logoId: mediaResult.id,
		})
		.returning();

	const technologiesWithId = newExperienceToTechnologies.map((v) => ({
		...v,
		experienceId: experienceResult.id,
	}));

	for (let i = 0; i < technologiesWithId.length; i += 10) {
		const batch = technologiesWithId.slice(i, i + 10);
		await db.insert(experienceToTechnologies).values(batch);
	}

	return experienceResult;
};

export const editExperience = async ({
	updatedExperience,
	newExperienceToTechnologies,
	newMedia,
}: EditExperienceFnSchema) => {
	let newMediaResult: Media | undefined;

	if (newMedia) {
		const [mediaResult] = await db.insert(media).values(newMedia).returning();
		newMediaResult = mediaResult;
	}

	const [experienceResult] = await db
		.update(experience)
		.set({
			...updatedExperience,
			logoId: newMediaResult?.id ?? updatedExperience.logoId,
			updatedAt: new Date(),
		})
		.where(eq(experience.id, updatedExperience.id))
		.returning();

	if (newExperienceToTechnologies) {
		await db
			.delete(experienceToTechnologies)
			.where(eq(experienceToTechnologies.experienceId, updatedExperience.id));

		if (newExperienceToTechnologies.length > 0) {
			for (let i = 0; i < newExperienceToTechnologies.length; i += 10) {
				const batch = newExperienceToTechnologies.slice(i, i + 10);
				await db.insert(experienceToTechnologies).values(batch);
			}
		}
	}

	return experienceResult;
};

export const deleteExperience = async ({
	experienceId,
}: {
	experienceId: string;
}) => {
	const [deleted] = await db
		.delete(experience)
		.where(eq(experience.id, experienceId))
		.returning();

	if (deleted.logoId) {
		await deleteMedia({ mediaId: deleted.logoId });
	}

	return deleted;
};
