import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
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
import {
	createFeaturedTechnologyFn,
	deleteFeaturedTechnologyFn,
} from "@/data/server/featured-technology.server";
import { deleteTechnologyFn } from "@/data/server/technology.server";
import type { Media } from "@/db/types";
import type { TechnologyWithIcon } from "@/lib/types";
import { getContrastColor } from "@/lib/utils";

export const columns: ColumnDef<TechnologyWithIcon>[] = [
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
			to="/admin/technology/$technologyId"
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
	technology: TechnologyWithIcon;
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
			queryClient.invalidateQueries({ queryKey: ["featured-technology"] });
			toast.success(`Deleted ${data.name} successfully!`);
		},
	});

	const { mutate: addAsFeaturedTechnology } = useMutation({
		mutationFn: async () => {
			return await createFeaturedTechnologyFn({
				data: { technologyId: technology.id },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["technology"] });
			queryClient.invalidateQueries({ queryKey: ["featured-technology"] });
			toast.success(`Added ${technology.name} as featured successfully!`);
		},
		onError: (e) => {
			toast.warning(e.message);
		},
	});

	const { mutate: removeToFeaturedTechnology } = useMutation({
		mutationFn: async () => {
			return await deleteFeaturedTechnologyFn({
				data: { featuredTechnologyId: technology.featured.id },
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["technology"] });
			queryClient.invalidateQueries({ queryKey: ["featured-technology"] });
			toast.success(`Removed ${technology.name} from featured successfully!`);
		},
	});

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
						onClick={() => navigator.clipboard.writeText(technology.id)}
					>
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/technology/$technologyId"
								params={{ technologyId: technology.id }}
							>
								View Card
							</Link>
						}
					/>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onClick={() =>
							technology.featured
								? removeToFeaturedTechnology()
								: addAsFeaturedTechnology()
						}
						variant={technology.featured ? "destructive" : "default"}
					>
						{technology.featured ? "Remove from Featured" : "Add to Featured"}
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/technology/$technologyId/edit"
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
