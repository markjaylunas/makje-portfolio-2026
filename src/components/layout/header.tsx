import { Sent02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { cn } from "@/lib/utils";
import { MenuToggleIcon } from "../common/menu-toggle-icon";
import { MenuProvider, useMenu } from "../providers/nav-menu-provider";
import { Button, buttonVariants } from "../ui/button";
import HeaderContainer from "./header-container";
import NavExpanded from "./nav-expanded";

export default function Header() {
	return (
		<MenuProvider>
			<HeaderContainer>
				<nav>
					<div className="flex flex-row-reverse justify-between sm:grid grid-cols-3 items-center h-18 bg-primary/20 px-4 backdrop-blur-md border border-transparent rounded-full">
						<NavMenu />
						<NavLogo />
						<ConnectButtonLink />
					</div>

					<NavExpanded />
				</nav>
			</HeaderContainer>
		</MenuProvider>
	);
}

function NavLogo() {
	const { closeMenu } = useMenu();
	return (
		<div className="flex items-center gap-2 justify-self-center">
			<Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
				<img src={makjeLogoDark} alt="Logo" className="size-10" />
				<span className="text-xl font-medium tracking-wide">Makje</span>
			</Link>
		</div>
	);
}

function NavMenu() {
	const { menuOpen, toggleMenu } = useMenu();
	return (
		<Button
			size="icon-lg"
			variant="ghost"
			className={cn(
				"rounded-full text-foreground hover:text-primary hover:border-primary transition-colors duration-300 ease-in-out hover:cursor-pointer border border-foreground bg-primary/10",
				menuOpen && "text-primary border-primary",
			)}
			onClick={toggleMenu}
		>
			<MenuToggleIcon open={menuOpen} className="size-5" />
		</Button>
	);
}

function ConnectButtonLink() {
	const { closeMenu } = useMenu();
	return (
		<Link
			to="/contact"
			className={cn(
				buttonVariants({ size: "lg" }),
				"rounded-full justify-self-end sm:flex hidden",
			)}
			onClick={closeMenu}
		>
			<HugeiconsIcon icon={Sent02Icon} className="size-5" />
			<span className="text-xs">Connect</span>
		</Link>
	);
}
