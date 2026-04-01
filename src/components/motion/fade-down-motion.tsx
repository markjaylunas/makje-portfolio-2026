import {
	AnimatePresence,
	domAnimation,
	type HTMLMotionProps,
	LazyMotion,
	m,
} from "motion/react";

export default function FadeDownMotion({
	children,
	...props
}: HTMLMotionProps<"div">) {
	return (
		<LazyMotion features={domAnimation} strict>
			<AnimatePresence>
				<m.div
					initial={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 1.05 }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
					exit={{ opacity: 0, y: -20, filter: "blur(10px)", scale: 1.05 }}
					transition={{
						duration: 1,
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
