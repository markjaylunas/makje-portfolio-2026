import { Link, type LinkProps } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
	to,
	children,
	buttonProps,
	...props
}: LinkProps &
	ComponentProps<"a"> & {
		children: React.ReactNode;
		buttonProps?: VariantProps<typeof buttonVariants>;
	}) {
	return (
		<Link
			to={to}
			className={cn(
				buttonVariants(
					buttonProps
						? buttonProps
						: { size: "lg", className: "w-full rounded-full" },
				),
			)}
			{...props}
		>
			{children}
		</Link>
	);
}
