import { forwardRef, type HTMLProps } from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends HTMLProps<HTMLHeadElement> {
	isVisible?: boolean;
}

export const Header = forwardRef<HTMLHeadElement, HeaderProps>(
	({ children, className, ...props }, ref) => {
		return (
			<header
				ref={ref}
				className={cn(
					"fixed inset-x-0 top-0 z-50 mx-4 sm:mx-auto max-w-(--breakpoint-sm) transition-all duration-300 ease-in-out shadow-[0_0_20px_rgba(0,0,0,0.1)]",

					className,
				)}
				{...props}
			>
				{children}
			</header>
		);
	},
);

Header.displayName = "Header";
