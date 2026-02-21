import { Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, type LinkProps, linkOptions } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const navLinks = linkOptions([
	{
		to: "/",
		hash: "experience",
		title: "Experience",
		description: "A timeline of my professional journey and key contributions.",
	},
	{
		to: "/",
		hash: "projects",
		title: "Projects",
		description:
			"Showcasing featured work, open-source tools, and side experiments.",
	},
	{
		to: "/",
		hash: "tech-stack",
		title: "Tech Stack",
		description: "The modern tools and languages I use to bring ideas to life.",
	},
]);

export default function Header({ children }: { children: React.ReactNode }) {
	const { isVisible, isShowMenu, setIsShowMenu, handleCloseMenu } =
		useScrollDirection(80);

	return (
		<header
			className={cn(
				"sticky top-0 rounded-full  z-50  h-16 mx-auto max-w-(--breakpoint-sm) bg-primary/10 px-4 backdrop-blur-sm grid grid-cols-3 items-center transition-transform duration-300 ease-in-out",
				isVisible ? "translate-y-4" : "-translate-y-full",
			)}
		>
			<NavigationMenu value={isShowMenu} onValueChange={setIsShowMenu}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger
							className={buttonVariants({
								variant: "ghost",
								size: "icon",
								className: "bg-transparent",
							})}
						>
							<HugeiconsIcon icon={Menu02Icon} />
							<span className="sr-only">Menu</span>
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="w-96">
								{navLinks.map((link) => (
									<ListItem
										linkProps={link}
										key={link.title}
										title={link.title}
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
}: React.ComponentPropsWithoutRef<"li"> & { linkProps: LinkProps }) {
	return (
		<li {...props}>
			<NavigationMenuLink
				render={
					<Link to={linkProps.to} hash={linkProps.hash}>
						<div className="flex flex-col gap-1 text-sm">
							<div className="leading-none font-medium">{title}</div>
							<div className="text-muted-foreground line-clamp-2">
								{children}
							</div>
						</div>
					</Link>
				}
			/>
		</li>
	);
}
