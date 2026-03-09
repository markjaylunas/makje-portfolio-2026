import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
import type { SelectTechnologyListWithMedia } from "@/data/query/technology.server";
import { deleteTechnologyFn } from "@/data/server/technology.server";
import type { Media } from "@/db/types";
import { getContrastColor } from "@/lib/utils";

export const columns: ColumnDef<SelectTechnologyListWithMedia>[] = [
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({ row }) => {
			const technologyId = row.original.id;
			const icon = row.original.icon;
			if (!icon) return null;
			return <TechnologyIconImage icon={icon} technologyId={technologyId} />;
		},
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "url",
		header: "URL",
	},
	{
		accessorKey: "brandColor",
		header: "Brand Color",
		cell: ({ row }) => {
			const brandColor = row.original.brandColor;
			return <TechnologyBrandColorList brandColor={brandColor} />;
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const technology = row.original;

			return <TechnologyActions technology={technology} />;
		},
	},
];

export const TechnologyIconImage = ({
	icon,
	technologyId,
}: {
	icon: Media;
	technologyId: string;
}) => {
	return (
		<Link
			to="/admin/technologies/$technologyId"
			params={{ technologyId }}
			className="cursor-pointer"
		>
			<img
				src={icon.url}
				alt={icon.altText ?? undefined}
				className="size-12 p-1"
			/>
		</Link>
	);
};

export const TechnologyBrandColorList = ({
	brandColor,
}: {
	brandColor: string;
}) => {
	return (
		<div className="flex flex-wrap gap-2">
			{brandColor
				.split(",")
				.map((v) => v.trim())
				.map((color) => (
					<TechnologyColor key={color} brandColor={color} />
				))}
		</div>
	);
};

export const TechnologyColor = ({ brandColor }: { brandColor: string }) => {
	const textColor = getContrastColor(brandColor);
	return (
		<Badge style={{ backgroundColor: brandColor }} className={textColor}>
			{brandColor}
		</Badge>
	);
};

export const TechnologyActions = ({
	technology,
}: {
	technology: SelectTechnologyListWithMedia;
}) => {
	const queryClient = useQueryClient();

	const { mutate: deleteTechnology } = useMutation({
		mutationFn: async () => {
			return await deleteTechnologyFn({
				data: { technologyId: technology.id },
			});
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["technology"] });
			toast.success(`Deleted ${data.name} successfully!`);
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem
						onClick={() => navigator.clipboard.writeText(technology.id)}
					>
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/technologies/$technologyId"
								params={{ technologyId: technology.id }}
							>
								View Card
							</Link>
						}
					/>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						render={
							<Link
								to="/admin/technologies/$technologyId/edit"
								params={{ technologyId: technology.id }}
							>
								Edit
							</Link>
						}
					/>
					<DropdownMenuItem
						variant="destructive"
						onClick={() => deleteTechnology()}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
