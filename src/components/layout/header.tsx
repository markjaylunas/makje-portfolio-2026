import { Menu02Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";

export default function Header() {
	const isVisible = useScrollDirection(80);

	return (
		<header
			className={cn(
				"sticky top-0 rounded-full  z-50  h-16 mx-auto max-w-(--breakpoint-sm) bg-primary/10 px-4 backdrop-blur-sm grid grid-cols-3 items-center transition-transform duration-300 ease-in-out",
				isVisible ? "translate-y-4" : "-translate-y-full",
			)}
		>
			<Navigation />

			<div className="flex items-center gap-2 justify-self-center">
				<Link to="/" className="flex items-center space-x-2">
					<img src={makjeLogoDark} alt="Logo" className="size-8" />
					<span className="text-xl font-medium tracking-wide">Makje</span>
				</Link>
			</div>

			<Link
				to="/contact"
				className={cn(buttonVariants(), "rounded-full w-fit justify-self-end")}
			>
				<HugeiconsIcon icon={SentIcon} />
				<span className="sr-only md:not-sr-only text-xs">Connect</span>
			</Link>
		</header>
	);
}

function Navigation() {
	return (
		<nav>
			<Button variant="ghost" size="icon">
				<HugeiconsIcon icon={Menu02Icon} />
				<span className="sr-only">Menu</span>
			</Button>
		</nav>
	);
}
