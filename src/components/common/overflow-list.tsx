import { ChevronDown, ChevronUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface OverflowListProps {
	list: ReactNode[];
	initial?: number;
	listName: string;
	className?: string;
}

export function OverflowList({
	list,
	initial = 3,
	className,
	listName,
}: OverflowListProps) {
	const [isOpen, setIsOpen] = useState(false);

	if (list.length === 0) return null;

	// Determine which items to show based on state
	const displayedItems = isOpen ? list : list.slice(0, initial);
	const hasRemaining = list.length > initial;

	return (
		<div
			className={cn(
				"flex flex-wrap items-start justify-start gap-2",
				className,
			)}
		>
			{/* Map only the items currently "active" */}
			{displayedItems.map((item, index) => {
				const key = `${listName}-${index}`;
				return (
					<div key={key} className="animate-in fade-in zoom-in-95 duration-200">
						{item}
					</div>
				);
			})}

			{/* The Trigger: Always at the end of the items */}
			{hasRemaining && (
				<Badge
					variant="secondary"
					onClick={() => setIsOpen(!isOpen)}
					className="cursor-pointer"
				>
					<HugeiconsIcon icon={isOpen ? ChevronUp : ChevronDown} />
					{isOpen ? "Show Less" : "Show More"}
				</Badge>
			)}
		</div>
	);
}
