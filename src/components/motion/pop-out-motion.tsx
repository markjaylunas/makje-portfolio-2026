/** biome-ignore-all lint/a11y/noStaticElementInteractions: <ignore> */
import { type ComponentProps, useState } from "react";
import { cn } from "@/lib/utils";

export default function PopOutMotion({
	children,
	className,
	style,
	...props
}: ComponentProps<"div">) {
	const [rotate, setRotate] = useState({ x: 0, y: 0 });
	const [isHovered, setIsHovered] = useState(false);

	function handleMouseLeave() {
		setRotate({ x: 0, y: 0 });
		setIsHovered(false);
	}

	function handleMouseEnter() {
		setIsHovered(true);
	}

	return (
		<div
			onMouseLeave={handleMouseLeave}
			onMouseEnter={handleMouseEnter}
			className={cn("transition-all duration-200 ease-out", className)}
			style={{
				transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${isHovered ? "translateY(-8px)" : "translateY(0)"}`,
				transformStyle: "preserve-3d",
				outline: isHovered ? "1px solid var(--muted)" : "none",
				transition: isHovered
					? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), outline 0.2s ease-out"
					: "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), outline 0.2s ease-out",
				...style,
			}}
			{...props}
		>
			{children}
		</div>
	);
}
