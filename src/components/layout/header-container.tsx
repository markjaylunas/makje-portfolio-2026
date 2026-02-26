import { type HTMLProps, useRef } from "react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";
import { useMenu } from "../providers/nav-menu-provider";

export default function HeaderContainer({
	children,
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
		<header
			ref={headerRef}
			className={cn(
				"fixed inset-x-0 top-0 z-50 mx-4 sm:mx-auto max-w-(--breakpoint-sm)  transition-all duration-300 ease-in-out  shadow-[0_0_20px_rgba(0,0,0,0.1)]",
				isVisible ? "translate-y-4" : "-translate-y-full",
			)}
			{...props}
		>
			{children}
		</header>
	);
}
