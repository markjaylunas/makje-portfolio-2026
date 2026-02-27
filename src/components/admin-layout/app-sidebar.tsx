import { Close } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import type * as React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarTrigger,
	useSidebar,
} from "@/components/ui/sidebar";
import { type AdminNavigationLink, adminNavLinks } from "@/lib/link-options";
import { NavLogo } from "../layout/header-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader className="flex flex-row justify-between items-center gap-1">
				<Link to="/" className="flex items-center gap-2 justify-self-center">
					<NavLogo />
				</Link>
				<SidebarTrigger
					className="-ml-1 cursor-pointer visible sm:hidden"
					leftIcon={Close}
				/>
			</SidebarHeader>
			<SidebarContent className="gap-1 py-2">
				{adminNavLinks.map((item) => (
					<SidebarLink key={item.title} item={item} />
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

function SidebarLink({ item }: { item: AdminNavigationLink }) {
	const { isMobile, toggleSidebar } = useSidebar();
	return (
		<SidebarMenuItem className="cursor-pointer">
			<SidebarMenuButton className="p-0">
				<Link
					to={item.to}
					activeProps={{ "data-active": true }}
					activeOptions={item.activeOptions}
					onClick={() => {
						if (isMobile) {
							toggleSidebar();
						}
					}}
					className="w-full flex items-center gap-2 text-lg font-light px-4"
				>
					<HugeiconsIcon icon={item.icon} />
					{item.title}
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
