import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderAuroraProps {
	title: ReactNode;
	className?: string;
	height?: string;
}

export default function PageHeaderAurora({
	title,
	className,
	height = "h-[90dvh]",
}: PageHeaderAuroraProps) {
	return (
		<div
			className={cn(
				"aurora-midnight-background pointer-events-none absolute inset-0 z-0 select-none",
				height,
				className,
			)}
		>
			<h1 className="mt-32 px-4 select-none bg-linear-to-b from-white/10 via-white/5 via-30% to-transparent to-90% bg-clip-text text-center text-7xl font-bold uppercase tracking-tight text-transparent md:text-[8rem] lg:text-[10rem]">
				{title}
			</h1>
		</div>
	);
}
