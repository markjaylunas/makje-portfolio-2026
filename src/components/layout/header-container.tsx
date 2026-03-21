import { type HTMLProps, useRef } from "react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { useMenu } from "../providers/nav-menu-provider";
import { Header } from "./header";

export default function HeaderContainer({
	children,
	className,
	...props
}: HTMLProps<HTMLHeadElement>) {
	const { isVisible } = useScrollDirection(80);
	const { closeMenu, menuOpen } = useMenu();
	const headerRef = useRef<HTMLHeadElement>(null);

	useOnClickOutside(headerRef, () => {
		if (menuOpen) {
			closeMenu();
		}
	});

	return (
		<Header
			ref={headerRef}
			className={cn(
				isVisible ? "translate-y-4" : "-translate-y-full",
				"max-w-(--breakpoint-lg) mx-auto px-6",
				className,
			)}
			{...props}
		>
			{children}
		</Header>
	);
}
