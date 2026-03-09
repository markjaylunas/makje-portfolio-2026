import { CollisionPriority } from "@dnd-kit/abstract";
import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

export function Column({ children, id }: { children: ReactNode; id: string }) {
	const { isDropTarget, ref } = useDroppable({
		id,
		type: "column",
		accept: "item",
		collisionPriority: CollisionPriority.Low,
	});
	const style = isDropTarget ? { background: "#00000030" } : undefined;

	return (
		<div className="Column" ref={ref} style={style}>
			{children}
		</div>
	);
}
