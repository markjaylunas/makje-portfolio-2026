import type { ReactNode } from "react";
import { AppSidebar } from "@/components/admin-layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import HeaderAdmin from "../layout/header-admin";

export default function AdminSidebarContainer({
	children,
}: {
	children: ReactNode;
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<HeaderAdmin />
				{children}
			</SidebarInset>
		</SidebarProvider>
	);
}
