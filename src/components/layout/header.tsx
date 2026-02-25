import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { type NavigationLink, navigationLinks } from "@/lib/link-options";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "../common/menu-toggle-icon";
import { buttonVariants } from "../ui/button";

export default function Header({ children }: { children: React.ReactNode }) {
	const { isVisible, isShowMenu, setIsShowMenu, handleCloseMenu } =
		useScrollDirection(80);

	return (
		<header
			className={cn(
				"sticky top-0 rounded-full z-50 h-16 mx-4 sm:mx-auto max-w-(--breakpoint-sm) bg-primary/10 px-4 backdrop-blur-sm grid grid-cols-3 items-center transition-transform duration-300 ease-in-out",
				isVisible ? "translate-y-4" : "-translate-y-full",
			)}
		>
			<NavigationMenu value={isShowMenu} onValueChange={setIsShowMenu}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							className={buttonVariants({
								variant: "secondary",
								size: "icon",
								className: "rounded-full ",
							})}
						>
							<MenuToggleIcon open={isShowMenu} />
							<span className="sr-only">Menu</span>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="w-96">
								{navigationLinks.map((link) => (
									<ListItem
										linkProps={link}
										key={link.name}
										title={link.name}
										onClick={handleCloseMenu}
									>
										{link.description}
									</ListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			{children}
		</header>
	);
}

function ListItem({
	title,
	children,
	linkProps,
	...props
}: React.ComponentPropsWithoutRef<"li"> & { linkProps: NavigationLink }) {
	return (
		<li {...props}>
			<NavigationMenuLink
				render={
					<Link to={linkProps.to} hash={linkProps.hash}>
						<div className="flex items-start text-sm gap-2">
							<HugeiconsIcon icon={linkProps.icon} className="size-8" />
							<div className="flex flex-col gap-1">
								<div className="leading-none font-medium">{title}</div>
								<div className="text-muted-foreground line-clamp-2">
									{children}
								</div>
							</div>
						</div>
					</Link>
				}
			/>
		</li>
	);
}
