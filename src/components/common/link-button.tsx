import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, type LinkProps } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
	to,
	children,
	buttonProps,
	...props
}: LinkProps & {
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
			<HugeiconsIcon icon={Plus} />
			{children}
		</Link>
	);
}
