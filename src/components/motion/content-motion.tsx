import type { ComponentProps } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

const IN_VIEW_OPTIONS = { threshold: 0.1 };

export default function ContentMotion({
	children,
	className,
	animateOnView = false,
	...props
}: ComponentProps<"div"> & { animateOnView?: boolean }) {
	if (!animateOnView) {
		return (
			<div
				className={cn("relative z-10 sm:animate-content-in", className)}
				{...props}
			>
				{children}
			</div>
		);
	}

	return (
		<ContentMotionAnimationOnView className={className} {...props}>
			{children}
		</ContentMotionAnimationOnView>
	);
}

function ContentMotionAnimationOnView({
	children,
	className,
	...props
}: ComponentProps<"div">) {
	const [ref, isInView] = useInView(IN_VIEW_OPTIONS);

	return (
		<div
			ref={ref}
			className={cn(
				"relative z-10",
				isInView ? "sm:animate-content-in" : "sm:opacity-0",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
