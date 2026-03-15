import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Media } from "@/db/types";
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
				src={coverImage.url}
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
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<HugeiconsIcon icon={MoreHorizontal} className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
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
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
