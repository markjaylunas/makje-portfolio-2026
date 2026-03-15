import { Link, useLocation } from "@tanstack/react-router"; // Import Link
import { Fragment } from "react";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function HeaderAdmin() {
	const { pathname } = useLocation();

	const paths = pathname
		.split("/")
		.slice(2)
		.filter((path) => path !== "");

	return (
		<header className="bg-background flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-20">
			<SidebarTrigger className="-ml-1 cursor-pointer" />
			<Separator orientation="vertical" className="mr-2 h-16" />

			<Breadcrumb>
				<BreadcrumbList>
					{paths.map((path, index) => {
						const isLast = index === paths.length - 1;
						const href = `/admin/${paths.slice(0, index + 1).join("/")}`;
						// Capitalize the label
						const label = path.charAt(0).toUpperCase() + path.slice(1);

						return (
							<Fragment key={href}>
								<BreadcrumbItem>
									{isLast ? (
										<BreadcrumbPage>{label}</BreadcrumbPage>
									) : (
										<BreadcrumbLink render={<Link to={href}>{label}</Link>} />
									)}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</Fragment>
						);
					})}
				</BreadcrumbList>
			</Breadcrumb>
		</header>
	);
}
