import {
	type HTMLMotionProps,
	motion,
	useMotionValue,
	useTransform,
} from "motion/react";

export default function PopOutMotion({
	children,
	...props
}: HTMLMotionProps<"div">) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const rotateX = useTransform(y, [-100, 100], [5, -5]);
	const rotateY = useTransform(x, [-100, 100], [-5, 5]);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		const rect = event.currentTarget.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		const xPct = (mouseX / rect.width - 0.5) * 200;
		const yPct = (mouseY / rect.height - 0.5) * 200;

		x.set(xPct);
		y.set(yPct);
	}

	function handleMouseLeave() {
		x.set(0);
		y.set(0);
	}

	return (
		<motion.div
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			style={{
				rotateX,
				rotateY,
				transformStyle: "preserve-3d",
			}}
			whileHover={{
				y: -8, // The "Pop" lift effect
				transition: { duration: 0.2, ease: "easeOut" },
				border: "1px solid var(--muted)",
			}}
			transition={{
				type: "spring",
				stiffness: 300,
				damping: 20,
			}}
			{...props}
		>
			{children}
		</motion.div>
	);
}
