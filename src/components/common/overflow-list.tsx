import { MoreHorizontal } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface OverflowListProps {
	list: ReactNode[];
	initial?: number;
	className?: string;
	tooltipClassName?: string;
}

export function OverflowList({
	list,
	initial = 3,
	className,
	tooltipClassName,
}: OverflowListProps) {
	if (list.length === 0) return null;

	const visibleItems = list.slice(0, initial);
	const remainingItems = list;

	const hasRemaining = list.length > initial;

	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			{visibleItems}
			{hasRemaining && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger className="cursor-pointer">
							<Badge
								variant="outline"
								className="px-1.5 h-6 flex items-center justify-center text-muted-foreground"
							>
								<HugeiconsIcon icon={MoreHorizontal} />
							</Badge>
						</TooltipTrigger>
						<TooltipContent
							side="top"
							className={cn(
								"flex flex-wrap gap-2 max-w-72 bg-popover/90 backdrop-blur-md border-foreground/10 p-3",
								tooltipClassName,
							)}
						>
							{remainingItems}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</div>
	);
}
