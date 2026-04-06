import type { ReactNode } from "react";
import FadeDownMotion from "@/components/motion/fade-down-motion";
import { cn } from "@/lib/utils";

interface PageHeaderAuroraProps {
	title: ReactNode;
	className?: string;
	height?: string;
	as?: "h1" | "p" | "div";
}

export default function PageHeaderAurora({
	title,
	className,
	height = "h-[90dvh]",
	as: Component = "h1",
}: PageHeaderAuroraProps) {
	return (
		<FadeDownMotion
			className={cn(
				"aurora-midnight-background pointer-events-none absolute inset-0 z-10 select-none",
				height,
				className,
			)}
		>
			<Component className="mt-32 px-4 select-none bg-linear-to-b from-white/10 via-white/5 via-30% to-transparent to-90% bg-clip-text text-center text-5xl font-bold uppercase tracking-tight text-transparent sm:text-7xl md:text-[8rem] lg:text-[10rem]">
				{title}
			</Component>
		</FadeDownMotion>
	);
}
