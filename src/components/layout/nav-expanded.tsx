import {
	ArrowRight02Icon,
	ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { Activity, type ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socialLinks } from "@/lib/constants";
import {
	aboutLinks,
	type NavigationLink,
	projectLinks,
} from "@/lib/link-options";
import { cn } from "@/lib/utils";
import SlideDownMotion from "../motion/slide-down-motion";
import { useMenu } from "../providers/nav-menu-provider";
import AuthNavCard from "./auth-nav-card";

export default function NavExpanded() {
	const { menuOpen } = useMenu();
	return (
		<div className="backdrop-blur-md">
			<Activity mode={menuOpen ? "visible" : "hidden"}>
				<NavLinks />
			</Activity>
		</div>
	);
}

export function NavLinks() {
	const { toggleMenu } = useMenu();
	return (
		<SlideDownMotion className="bg-primary/20 p-4  border border-transparent rounded-[16px] mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
			<NavLinkGroupCard title="About">
				<ul className="flex flex-col">
					{aboutLinks.map((link) => (
						<li key={link.to}>
							<InternalLink {...link} onClick={toggleMenu} />
						</li>
					))}
				</ul>
			</NavLinkGroupCard>
			<NavLinkGroupCard title="Projects">
				<ul className="flex flex-col">
					{projectLinks.map((link) => (
						<li key={link.to}>
							<InternalLink {...link} onClick={toggleMenu} />
						</li>
					))}
				</ul>
			</NavLinkGroupCard>
			<NavLinkGroupCard title="Socials">
				<ul className="flex flex-col">
					{socialLinks.map((social) => (
						<li key={social.name}>
							<ExternalLink
								href={social.href}
								name={social.name}
								icon={social.icon}
								onClick={toggleMenu}
							/>
						</li>
					))}
				</ul>
			</NavLinkGroupCard>
			<NavLinkGroupCard title="Auth">
				<AuthNavCard />
			</NavLinkGroupCard>
		</SlideDownMotion>
	);
}

function NavLinkGroupCard({
	title,
	children,
	className,
	...props
}: ComponentProps<"div"> & { title: string }) {
	return (
		<Card
			size="sm"
			className={cn("rounded-[12px] bg-black/60", className)}
			{...props}
		>
			<CardHeader>
				<CardTitle className="text-xs font-mono uppercase tracking-wider text-accent-foreground/80">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
}

export function InternalLink(
	props: NavigationLink & { onClick: () => void; callbackURL?: string },
) {
	return (
		<Link
			className={cn(
				"flex items-center  px-4 py-3 text-xs transition-colors hover:text-white hover:bg-accent rounded-[16px] gap-2 ease-in-out duration-300",
			)}
			to={props.to}
			hash={props.hash}
			search={{
				callbackURL: props.callbackURL,
			}}
			hashScrollIntoView={true}
			onClick={props.onClick}
		>
			<HugeiconsIcon icon={props.icon} size={20} />
			{props.name}
			<HugeiconsIcon icon={ArrowRight02Icon} className="size-5 ml-auto" />
		</Link>
	);
}

function ExternalLink({
	name,
	href,
	icon,
	onClick,
}: {
	name: string;
	href: string;
	icon: IconSvgElement;
	onClick: () => void;
}) {
	return (
		<a
			target="_blank"
			rel="noopener noreferrer"
			onClick={onClick}
			className="flex items-center  px-4 py-3 text-xs  transition-colors hover:bg-accent rounded-[16px] gap-2 ease-in-out duration-300"
			href={href}
		>
			<HugeiconsIcon icon={icon} size={20} />
			{name}
			<HugeiconsIcon icon={ArrowUpRight01Icon} className="size-5 ml-auto" />
		</a>
	);
}
