import { db } from "@/db";
import { experience, experienceToTechnologies, media } from "@/db/schema";
import type {
	ExperienceWithRelations,
	InsertExperience,
	InsertExperienceToTechnologies,
	InsertMedia,
} from "@/db/types";

export const selectExperienceList = async (): Promise<
	ExperienceWithRelations[]
> => {
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

	await db.insert(experienceToTechnologies).values(
		newExperienceToTechnologies.map((v) => ({
			...v,
			experienceId: experienceResult.id,
		})),
	);

	return experienceResult;
};
