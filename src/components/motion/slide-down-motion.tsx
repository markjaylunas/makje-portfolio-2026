import {
	AnimatePresence,
	domAnimation,
	type HTMLMotionProps,
	LazyMotion,
	m,
} from "motion/react";

export default function SlideDownMotion({
	children,
	...props
}: HTMLMotionProps<"div">) {
	return (
		<LazyMotion features={domAnimation} strict>
			<AnimatePresence>
				<m.div
					initial={{ height: 0, opacity: 0, scale: 0.95 }}
					animate={{
						height: "auto",
						opacity: 1,
						scale: 1,
					}}
					exit={{
						height: 0,
						opacity: 0,
						scale: 0.95,
					}}
					transition={{
						duration: 0.4,
						ease: [0.16, 1, 0.3, 1],
					}}
					{...props}
				>
					{children}
				</m.div>
			</AnimatePresence>
		</LazyMotion>
	);
}
