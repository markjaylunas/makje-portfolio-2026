import { db } from "@/db";

export const selectFeaturedProjectList = async () => {
	return await db.query.featuredProject.findMany({
		with: {
			project: {
				with: {
					coverImage: true,
					tags: true,
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
			},
		},
		orderBy: (featuredProject, { asc }) => asc(featuredProject.order),
	});
};
