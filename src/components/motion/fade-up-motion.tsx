import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";

export default function FadeUpMotion({
	children,
	delay = 0,
	...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
				animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
				exit={{ opacity: 0, y: 20, filter: "blur(10px)" }}
				transition={{
					duration: 0.8,
					delay,
					ease: [0.16, 1, 0.3, 1],
				}}
				{...props}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
}
