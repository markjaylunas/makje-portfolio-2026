import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function FadeDownMotion({
	children,
	delay = 0,
	className,
	style,
	...props
}: ComponentProps<"div"> & { delay?: number }) {
	return (
		<div
			className={cn("animate-fade-down-in", className)}
			style={{
				animationDelay: `${delay}s`,
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
