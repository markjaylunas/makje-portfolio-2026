import type { CSSProperties } from "react";

export default function GradientText({
	children,
	className = "",
	colors = ["#5327FF", "#5327FF", "#B19EEF", "#00A6F4"],
	animationSpeed = 8,
}: {
	children: React.ReactNode;
	className?: string;
	colors?: string[];
	animationSpeed?: number;
}) {
	// Duplicate first color at the end for seamless looping
	const gradientColors = [...colors, colors[0]].join(", ");

	const gradientStyle = {
		backgroundImage: `linear-gradient(to bottom right, ${gradientColors})`,
		backgroundSize: "300% 300%",
		backgroundRepeat: "repeat",
		"--animation-duration": `${animationSpeed}s`,
	} as CSSProperties;

	return (
		<span className={`animated-gradient-text ${className}`}>
			<span className="text-content" style={gradientStyle}>
				{children}
			</span>
		</span>
	);
}
