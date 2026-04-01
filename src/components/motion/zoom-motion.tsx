import { AnimatePresence, type HTMLMotionProps, motion } from "motion/react";

type ZoomMotionProps = HTMLMotionProps<"div"> & {
	isOpen: boolean;
};

export default function ZoomMotion({
	children,
	isOpen,
	style,
	...props
}: ZoomMotionProps) {
	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<motion.div
					key="nav-menu"
					initial={{ opacity: 0, scale: 0.92, y: -6 }}
					animate={{ opacity: 1, scale: 1, y: 0 }}
					exit={{ opacity: 0, scale: 0.92, y: -6 }}
					transition={{
						duration: 0.2,
						ease: [0.25, 0.1, 0.25, 1],
					}}
					style={{ transformOrigin: "top center", ...style }}
					{...props}
				>
					{children}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
