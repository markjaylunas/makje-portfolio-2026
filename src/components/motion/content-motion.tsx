import type { ComponentProps } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const IN_VIEW_OPTIONS = { threshold: 0.2 };

export default function ContentMotion({
	children,
	className,
	...props
}: ComponentProps<"div">) {
	const [ref, isInView] = useInView(IN_VIEW_OPTIONS);

	return (
		<div
			ref={ref}
			className={cn(isInView ? "animate-content-in" : "opacity-0", className)}
			{...props}
		>
			{children}
		</div>
	);
}
