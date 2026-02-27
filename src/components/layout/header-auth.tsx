import { Link } from "@tanstack/react-router";
import { Header } from "./header";
import { NavLogo } from "./header-main";

export default function HeaderAuth() {
	return (
		<Header className="mt-4">
			<nav className="flex justify-center items-center h-18 bg-primary/20 px-4 backdrop-blur-md border border-transparent rounded-full">
				<Link to="/" className="flex items-center gap-2 justify-self-center">
					<NavLogo />
				</Link>
			</nav>
		</Header>
	);
}
