import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
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
import { deleteContactMessageFn } from "@/data/server/contact-message.server";
import { queryKey } from "@/lib/query-key";
import type { ContactMessageWithRelations } from "@/lib/types";

export const columns: ColumnDef<ContactMessageWithRelations>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
	{
		accessorKey: "message",
		header: "Message",
		cell: ({ row }) => {
			const message = row.original.message;
			return (
				<div className="max-w-[300px] truncate font-medium">{message}</div>
			);
		},
	},
	{
		accessorKey: "createdAt",
		header: "Date",
		cell: ({ row }) => {
			return format(new Date(row.original.createdAt), "MMM d, yyyy p");
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const contactMessage = row.original;
			return <ContactMessageActions contactMessage={contactMessage} />;
		},
	},
];

const ContactMessageActions = ({
	contactMessage,
}: {
	contactMessage: ContactMessageWithRelations;
}) => {
	const queryClient = useQueryClient();

	const { mutate: deleteMessage } = useMutation({
		mutationFn: async () => {
			return await deleteContactMessageFn({
				data: { contactMessageId: contactMessage.id },
			});
		},
		onSuccess: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: queryKey.contactMessage.list(),
				}),
				queryClient.invalidateQueries({
					queryKey: queryKey.contactMessage.item(contactMessage.id),
				}),
			]);
			toast.success("Message deleted successfully!");
		},
		onError: (e) => {
			toast.error(e.message);
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
						onClick={() => navigator.clipboard.writeText(contactMessage.id)}
					>
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem
						render={
							<Link
								to="/admin/contact-message/$contactMessageId"
								params={{ contactMessageId: contactMessage.id }}
							>
								View Details
							</Link>
						}
					/>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						variant="destructive"
						onClick={() => {
							if (confirm("Are you sure you want to delete this message?")) {
								deleteMessage();
							}
						}}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
