import { Link } from "@tanstack/react-router";
import makjeLogo from "@/assets/svg/makje.svg";
import { Button, buttonVariants } from "../ui/button";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-primary/10 px-4 backdrop-blur-sm sm:px-6">
			<Navigation />

			<div className="flex items-center gap-2">
				<Link to="/" className="flex items-center space-x-2">
					<img src={makjeLogo} alt="Logo" className="size-10" />
					<span className="text-xl font-medium tracking-wide">Makje</span>
				</Link>
			</div>

			<Link to="/contact" className={buttonVariants()}>
				Reach Out
			</Link>
		</header>
	);
}

function Navigation() {
	return (
		<nav>
			<Button variant="link">Menu</Button>
		</nav>
	);
}
