import { type ComponentProps, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ZoomMotionProps = ComponentProps<"div"> & {
	isOpen: boolean;
};

export default function ZoomMotion({
	children,
	isOpen,
	style,
	className,
	...props
}: ZoomMotionProps) {
	const [render, setRender] = useState(isOpen);

	useEffect(() => {
		if (isOpen) {
			setRender(true);
		} else {
			const timer = setTimeout(() => setRender(false), 200);
			return () => clearTimeout(timer);
		}
	}, [isOpen]);

	if (!render) return null;

	return (
		<div
			className={cn(isOpen ? "animate-zoom-in" : "animate-zoom-out", className)}
			style={{ transformOrigin: "top center", ...style }}
			{...props}
		>
			{children}
		</div>
	);
}
