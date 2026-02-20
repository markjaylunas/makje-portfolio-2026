import {
	AnimatePresence,
	domAnimation,
	type HTMLMotionProps,
	LazyMotion,
	m,
} from "motion/react";

export default function ContentMotion({
	children,
	...props
}: HTMLMotionProps<"div">) {
	return (
		<LazyMotion features={domAnimation} strict>
			<AnimatePresence>
				<m.div
					initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
					whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
					transition={{
						delay: 0.2,
						duration: 0.4,
						scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
					}}
					viewport={{ once: true }}
					{...props}
				>
					{children}
				</m.div>
			</AnimatePresence>
		</LazyMotion>
	);
}
