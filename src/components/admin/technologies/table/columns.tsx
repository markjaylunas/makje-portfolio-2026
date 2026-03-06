import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import { getContrastColor } from "@/lib/utils";

export const columns: ColumnDef<SelectTechnologyListWithMedia>[] = [
	{
		accessorKey: "icon",
		header: "Icon",
		cell: ({ row }) => {
			const name = row.original.name;
			const icon = row.original.icon ? row.original.icon : undefined;
			if (!icon) return null;
			return <TechnologyIconImage icon={icon} name={name} />;
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
	name,
}: {
	icon: string;
	name: string;
}) => {
	return <img src={icon} alt={name} className="size-12 p-1" />;
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
						Copy technology ID
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						render={
							<Link
								to="/admin/technologies/$technologyId/edit"
								params={{ technologyId: technology.id }}
							>
								Edit Technology
							</Link>
						}
					></DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
