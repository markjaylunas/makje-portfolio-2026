import { desc, eq, inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { featuredProject } from "@/db/schema";
import type { InsertFeaturedProject } from "@/db/types";

export const insertFeaturedProject = async (
	newFeaturedProject: InsertFeaturedProject,
) => {
	const isAlreadyExist = await selectFeatureProjectById({
		projectId: newFeaturedProject.projectId,
	});

	if (isAlreadyExist) {
		throw Error("Project is already featured");
	}

	let order = newFeaturedProject.order;

	if (order === undefined || order === null) {
		const [lastItem] = await db
			.select({ order: featuredProject.order })
			.from(featuredProject)
			.orderBy(desc(featuredProject.order))
			.limit(1);

		order = lastItem?.order ? lastItem.order + 1 : 1;
	}

	const [result] = await db
		.insert(featuredProject)
		.values({
			...newFeaturedProject,
			order: order,
		})
		.returning();

	return result;
};

export async function selectFeatureProjectById({
	projectId,
}: {
	projectId: string;
}) {
	return await db.query.featuredProject.findFirst({
		where: (project, { eq }) => eq(project.projectId, projectId),
	});
}

export const selectFeaturedProjectList = async ({
	userId,
}: {
	userId?: string;
}) => {
	return await db.query.featuredProject.findMany({
		with: {
			project: {
				with: {
					coverImage: true,
					photos: {
						with: {
							media: true,
						},
					},
					tags: {
						with: {
							tag: true,
						},
					},
					likes: {
						...(userId
							? {
									with: {
										user: true,
									},
									where: (like, { eq }) => eq(like.userId, userId),
								}
							: false),
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

export const deleteFeaturedProject = async ({
	featuredProjectId,
}: {
	featuredProjectId: string;
}) => {
	const [result] = await db
		.delete(featuredProject)
		.where(eq(featuredProject.id, featuredProjectId))
		.returning();

	return result;
};

export const updateProjectOrder = async ({
	featuredProjectIdList,
}: {
	featuredProjectIdList: string[];
}) => {
	// 1. Fetch current items to handle reconciliation
	const currentItems = await db.query.featuredProject.findMany({
		columns: { id: true, updatedAt: true },
	});

	const currentIds = currentItems.map((f) => f.id);

	// 2. Identify missing IDs and sort by updatedAt
	const missingIds = currentItems
		.filter((f) => !featuredProjectIdList.includes(f.id))
		.sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
		.map((f) => f.id);

	// 3. Create the final ordered array of IDs
	const finalOrder = [...featuredProjectIdList, ...missingIds].filter((id) =>
		currentIds.includes(id),
	);

	if (finalOrder.length === 0) return;

	// 4. Build the CASE statement for a single UPDATE
	const sqlChunks = [];
	sqlChunks.push(sql`CASE ${featuredProject.id}`);

	finalOrder.forEach((id, index) => {
		sqlChunks.push(sql`WHEN ${id} THEN ${index + 1}`);
	});

	sqlChunks.push(sql`END`);

	// 5. Execute as one single statement
	const result = await db
		.update(featuredProject)
		.set({
			order: sql.join(sqlChunks, sql.raw(" ")),
			updatedAt: new Date(),
		})
		.where(inArray(featuredProject.id, finalOrder))
		.returning();

	return result;
};
