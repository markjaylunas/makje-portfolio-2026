import { db } from "@/db";
import type { ExperienceWithRelations } from "@/db/types";

export const selectExperienceList = async (): Promise<
	ExperienceWithRelations[]
> => {
	return await db.query.experience.findMany({
		with: {
			logo: true,
			technologies: {
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
