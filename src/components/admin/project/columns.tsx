import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	createFeaturedProjectFn,
	deleteFeaturedProjectFn,
} from "@/data/server/featured-project.server";
import {
	deleteProjectFn,
	toggleProjectDisabledFn,
} from "@/data/server/project.server";
import type { Media } from "@/db/types";
import { getOptimizedImageUrl, IMAGE_VARIANTS } from "@/lib/cloudflare-images";
import { queryKey } from "@/lib/query-key";
import type { ProjectWithRelations } from "@/lib/types";

export const columns: ColumnDef<ProjectWithRelations>[] = [
	{
		accessorKey: "coverImage",
		header: "Cover Image",
		cell: ({ row }) => {
			const project = row.original;
			const coverImage = project.coverImage;
			if (!coverImage) return null;
			return (
				<ProjectCoverImageImage
					coverImage={coverImage}
					projectId={project.id}
				/>
			);
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "liveUrl",
		header: "Live URL",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const project = row.original;

			return <ProjectActions project={project} />;
		},
	},
];

export const ProjectCoverImageImage = ({
	coverImage,
	projectId,
}: {
	coverImage: Media;
	projectId: string;
}) => {
	return (
		<Link
			to="/admin/project/$projectId"
			params={{ projectId }}
			className="cursor-pointer"
		>
			<img
				src={getOptimizedImageUrl(coverImage.url, IMAGE_VARIANTS.ICON)}
				alt={coverImage.altText ?? undefined}
				className="size-12 p-1"
			/>
		</Link>
	);
};

export const ProjectActions = ({
	project,
}: {
	project: ProjectWithRelations;
}) => {
	const queryClient = useQueryClient();

	const { mutate: deleteProject } = useMutation({
		mutationFn: async () => {
			return await deleteProjectFn({
				data: { projectId: project.id },
			});
		},
		onSuccess: async (data) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.project.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.listForAdmin(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.featuredProject.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.item(project.id),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.itemForAdmin(project.id),
				}),
			]);
			toast.success(`Deleted ${data.name} successfully!`);
		},
		onError: (e) => {
			toast.warning(e.message);
		},
	});

	const { mutate: addAsFeaturedProject } = useMutation({
		mutationFn: async () => {
			return await createFeaturedProjectFn({
				data: { projectId: project.id },
			});
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.project.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.listForAdmin(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.featuredProject.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.item(project.id),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.itemForAdmin(project.id),
				}),
			]);
			toast.success(`Added ${project.name} as featured successfully!`);
		},
		onError: (e) => {
			toast.warning(e.message);
		},
	});

	const { mutate: removeToFeaturedProject } = useMutation({
		mutationFn: async () => {
			if (!project.featured) return;
			return await deleteFeaturedProjectFn({
				data: { featuredProjectId: project.featured.id },
			});
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.project.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.listForAdmin(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.featuredProject.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.item(project.id),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.itemForAdmin(project.id),
				}),
			]);
			toast.success(`Removed ${project.name} from featured successfully!`);
		},
	});

	const { mutate: toggleProjectDisabled } = useMutation({
		mutationFn: async () => {
			return await toggleProjectDisabledFn({
				data: { projectId: project.id },
			});
		},
		onSuccess: async (data) => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.project.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.listForAdmin(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.item(project.id),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.project.itemForAdmin(project.id),
				}),
			]);
			toast.success(
				`${data.disabled ? "Disabled" : "Enabled"} ${data.name} successfully!`,
			);
		},
		onError: (e) => {
			toast.warning(e.message);
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<HugeiconsIcon icon={MoreHorizontal} className="h-4 w-4" />
					</Button>
				}
			/>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => navigator.clipboard.writeText(project.id)}
					>
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/project/$projectId"
								params={{ projectId: project.id }}
							>
								View Card
							</Link>
						}
					/>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							project.featured
								? removeToFeaturedProject()
								: addAsFeaturedProject()
						}
						variant={project.featured ? "destructive" : "default"}
					>
						{project.featured ? "Remove from Featured" : "Add to Featured"}
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/project/$projectId/edit"
								params={{ projectId: project.id }}
							>
								Edit
							</Link>
						}
					/>
					<DropdownMenuItem
						onClick={() => toggleProjectDisabled()}
						variant={project.disabled ? "default" : "destructive"}
					>
						{project.disabled ? "Enable" : "Disable"}
					</DropdownMenuItem>
					<DropdownMenuItem
						variant="destructive"
						onClick={() => deleteProject()}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
