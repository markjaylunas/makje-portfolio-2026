import { useLocation } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function HeaderAdmin() {
	const location = useLocation();
	const path = location.pathname.split("/").pop();
	return (
		<header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1 cursor-pointer"></SidebarTrigger>
			<Separator orientation="vertical" className="mr-2 h-16" />
			<h1 className="scroll-m-20 text-2xl font-semibold tracking-tight capitalize">
				{path}
			</h1>
		</header>
	);
}
