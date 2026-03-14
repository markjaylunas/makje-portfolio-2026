import { db } from "@/db";

export const selectProjectList = async () => {
	return await db.query.project.findMany({
		with: {
			coverImage: true,
			tags: true,
			featured: true,
			likes: {
				with: {
					user: true,
				},
			},
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
		orderBy: (project, { desc }) => desc(project.createdAt),
	});
};

export const selectProject = async ({ projectId }: { projectId: string }) => {
	return await db.query.project.findFirst({
		with: {
			coverImage: true,
			tags: true,
			featured: true,
			likes: {
				with: {
					user: true,
				},
			},
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
		where: (project, { eq }) => eq(project.id, projectId),
	});
};
