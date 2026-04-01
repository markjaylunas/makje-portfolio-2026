import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ButtonLinkCTA({
	children,
	className,
	onClick,
	...props
}: LinkProps & {
	className?: string;
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Link
			className={cn(
				buttonVariants(),
				"relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden bg-linear-to-r from-primary to-chart-2",
				className,
			)}
			onClick={onClick}
			{...props}
		>
			<span className="relative z-10 transition-all duration-500">
				{children}
			</span>
			<div className="absolute right-1 size-8 text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 bg-secondary/50">
				<HugeiconsIcon icon={ArrowUpRight} size={16} />
			</div>
		</Link>
	);
}
