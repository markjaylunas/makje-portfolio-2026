import { SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Header from "./header";

export default function HeaderNav() {
	return (
		<Header>
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
		</Header>
	);
}
