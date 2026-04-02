/** biome-ignore-all lint/suspicious/noExplicitAny: <ignore> */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectLikeFn } from "@/data/server/project.server";
import type { Session } from "@/lib/auth.server";

/**
 * Optimistic like toggle for projects.
 *
 * The UI displays `project.likesCount` (an integer column on the project table).
 * The optimistic update increments that value in every cached query so the
 * change is reflected instantly, then rolls back on error and refetches on settle.
 */
export function useToggleProjectLike(
	projectId: string,
	isLiked: boolean,
	session?: Session,
) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => toggleProjectLikeFn({ data: { projectId } }),

		onMutate: async () => {
			// 1. Cancel in-flight queries so they don't overwrite the optimistic update
			await queryClient.cancelQueries({ queryKey: ["project"] });
			await queryClient.cancelQueries({ queryKey: ["featured-project"] });

			// 2. Snapshot for rollback
			const previousProjectQueries = queryClient.getQueriesData({
				queryKey: ["project"],
			});
			const previousFeaturedQueries = queryClient.getQueriesData({
				queryKey: ["featured-project"],
			});
			/**
			 * Helper: Updates both the likesCount and the likes array.
			 * If isLiked is true, we are currently "unliking", so we remove the like.
			 * If isLiked is false, we are "liking", so we add a mock like object.
			 */
			const updateProjectData = (proj: Record<string, any>) => {
				const isNowLiking = !isLiked;

				// Update the counter
				const newCount =
					((proj.likesCount as number) ?? 0) + (isNowLiking ? 1 : -1);

				// Update the likes array for UI highlighting
				let newLikes = Array.isArray(proj.likes) ? [...proj.likes] : [];

				if (isNowLiking) {
					// Add a temporary optimistic like object
					newLikes.push({
						id: crypto.randomUUID(),
						userId: session?.user?.id ?? "",
						projectId: projectId,
						createdAt: new Date().toISOString(),
						user: session?.user,
					});
				} else {
					// Remove the like (optimistically remove all or the one matching current user)
					// Adjust the filter if you have a specific 'currentUserId' available
					newLikes = [];
				}

				return {
					...proj,
					likesCount: Math.max(0, newCount),
					likes: newLikes,
				};
			};

			// Helper: walk a list and update the matching project
			const updateList = (old: unknown): unknown => {
				if (!old || !Array.isArray(old)) return old;
				return old.map((item: Record<string, any>) => {
					// Featured project list shape
					if (item.project?.id === projectId) {
						return {
							...item,
							project: updateProjectData(item.project),
						};
					}
					// Normal project list shape
					if (item.id === projectId) {
						return updateProjectData(item);
					}
					return item;
				});
			};

			// 3. Optimistically update all list queries
			queryClient.setQueriesData({ queryKey: ["project", "list"] }, updateList);
			queryClient.setQueriesData(
				{ queryKey: ["featured-project", "list"] },
				updateList,
			);

			// 4. Optimistically update the single project detail query
			queryClient.setQueriesData(
				{ queryKey: ["project", "item", projectId] },
				(old: unknown) => {
					if (!old || typeof old !== "object") return old;
					return updateProjectData(old as Record<string, unknown>);
				},
			);

			return { previousProjectQueries, previousFeaturedQueries };
		},

		onError: (_err, _variables, context) => {
			// Roll back to snapshotted data
			if (context?.previousProjectQueries) {
				for (const [key, data] of context.previousProjectQueries) {
					queryClient.setQueryData(key, data);
				}
			}
			if (context?.previousFeaturedQueries) {
				for (const [key, data] of context.previousFeaturedQueries) {
					queryClient.setQueryData(key, data);
				}
			}
		},

		onSettled: () => {
			// Refetch to get the real server state
			queryClient.invalidateQueries({ queryKey: ["project"] });
			queryClient.invalidateQueries({ queryKey: ["featured-project"] });
		},
	});
}
