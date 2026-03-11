import { Plus } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LinkButton({
	to,
	children,
	...props
}: LinkProps & { children: React.ReactNode }) {
	return (
		<Link
			to={to}
			className={cn(buttonVariants({ size: "lg" }), "w-full rounded-full")}
			{...props}
		>
			<HugeiconsIcon icon={Plus} />
			{children}
		</Link>
	);
}
