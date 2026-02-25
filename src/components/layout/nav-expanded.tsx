import { Link } from "@tanstack/react-router";
import { Activity } from "react";
import { navigationLinks } from "@/lib/link-options";
import { useMenu } from "../providers/nav-menu-provider";

export default function NavExpanded() {
	const { menuOpen } = useMenu();
	return (
		<Activity mode={menuOpen ? "visible" : "hidden"}>
			<NavLinks />
		</Activity>
	);
}

export function NavLinks() {
	const { toggleMenu } = useMenu();
	return (
		<ul className="flex flex-col gap-1 bg-primary/20 p-4 backdrop-blur-md border border-transparent rounded-[16px] mt-4 ">
			{navigationLinks.map((link) => (
				<li key={link.to}>
					<Link
						to={link.to}
						hash={link.hash}
						onClick={toggleMenu}
						className="flex items-center  px-4 py-3 text-sm font-medium transition-colors hover:text-primary hover:bg-accent active:scale-95 rounded-[16px]"
					>
						{link.name}
					</Link>
				</li>
			))}
		</ul>
	);
}
