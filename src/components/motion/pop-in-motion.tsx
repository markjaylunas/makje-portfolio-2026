import {
	AnimatePresence,
	domAnimation,
	type HTMLMotionProps,
	LazyMotion,
	m,
} from "motion/react";

export default function PopInMotion({
	children,
	delay = 0,
	...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
	return (
		<LazyMotion features={domAnimation} strict>
			<AnimatePresence>
				<m.div
					initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
					animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
					exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
					transition={{
						type: "spring",
						stiffness: 260,
						damping: 20,
						delay,
					}}
					{...props}
				>
					{children}
				</m.div>
			</AnimatePresence>
		</LazyMotion>
	);
}
