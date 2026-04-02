import { Link } from "@tanstack/react-router";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { cn } from "@/lib/utils";
import ButtonLinkCTA from "../common/button-link-cta";
import { MenuToggleIcon } from "../common/menu-toggle-icon";
import { MenuProvider, useMenu } from "../providers/nav-menu-provider";
import { Button, buttonVariants } from "../ui/button";
import HeaderContainer from "./header-container";
import NavExpanded from "./nav-expanded";

export default function HeaderMain() {
	return (
		<MenuProvider>
			<HeaderContainer>
				<nav>
					<div className="flex flex-row-reverse justify-between sm:grid grid-cols-3 items-center h-18 bg-linear-to-br from-primary/20 to-chart-2/20 px-4 backdrop-blur-md border border-transparent rounded-full">
						<NavMenu />
						<NavLogoLink />
						<ConnectCTA />
					</div>

					<NavExpanded />
				</nav>
			</HeaderContainer>
		</MenuProvider>
	);
}

export function NavLogoLink() {
	const { closeMenu } = useMenu();
	return (
		<Link
			to="/"
			className="flex items-center gap-2 justify-self-center"
			onClick={closeMenu}
		>
			<NavLogo />
		</Link>
	);
}

export function NavLogo() {
	return (
		<div className="flex items-center gap-2">
			<img
				src={makjeLogoDark}
				alt="Makje Logo"
				className="size-10"
				width={40}
				height={40}
			/>
			<span className="text-2xl font-medium tracking-tighter">MakJe</span>
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
				"rounded-full text-foreground hover:text-chart-2/85 hover:border-chart-2/85 transition-colors duration-300 ease-in-out hover:cursor-pointer border border-foreground bg-chart-2/85/10",
				menuOpen && "text-chart-2/85 border-chart-2/85",
			)}
			onClick={toggleMenu}
		>
			<MenuToggleIcon open={menuOpen} className="size-5" />
		</Button>
	);
}

function ConnectCTA() {
	const { closeMenu } = useMenu();
	return (
		<ButtonLinkCTA
			to="/contact"
			className={cn(
				buttonVariants({ size: "lg" }),
				"rounded-full justify-self-end sm:flex hidden",
			)}
			onClick={closeMenu}
		>
			Connect
		</ButtonLinkCTA>
	);
}
