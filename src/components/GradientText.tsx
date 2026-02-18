import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

export default function GradientText({
	children,
	className = "",
	colors = ["#5327FF", "#5327FF", "#B19EEF", "#006DFF"],
	animationSpeed = 8,
}: {
	children: React.ReactNode;
	className?: string;
	colors?: string[];
	animationSpeed?: number;
}) {
	const progress = useMotionValue(0);
	const elapsedRef = useRef(0);
	const lastTimeRef = useRef<number | null>(null);

	const animationDuration = animationSpeed * 1000;

	useAnimationFrame((time) => {
		if (lastTimeRef.current === null) {
			lastTimeRef.current = time;
			return;
		}

		const deltaTime = time - lastTimeRef.current;
		lastTimeRef.current = time;
		elapsedRef.current += deltaTime;

		const fullCycle = animationDuration * 2;
		const cycleTime = elapsedRef.current % fullCycle;

		if (cycleTime < animationDuration) {
			progress.set((cycleTime / animationDuration) * 100);
		} else {
			progress.set(
				100 - ((cycleTime - animationDuration) / animationDuration) * 100,
			);
		}
	});

	useEffect(() => {
		elapsedRef.current = 0;
		progress.set(0);
	}, [progress]);

	const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);

	// Duplicate first color at the end for seamless looping
	const gradientColors = [...colors, colors[0]].join(", ");

	const gradientStyle = {
		backgroundImage: `linear-gradient(to bottom right, ${gradientColors})`,
		backgroundSize: "300% 300%",
		backgroundRepeat: "repeat",
	};

	return (
		<motion.span className={`animated-gradient-text ${className}`}>
			<motion.span
				className="text-content"
				style={{ ...gradientStyle, backgroundPosition }}
			>
				{children}
			</motion.span>
		</motion.span>
	);
}
