import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";

export function Item({
	id,
	index,
	column,
	children,
}: {
	id: string;
	index: number;
	column: string;
	children: ReactNode;
}) {
	const { ref, isDragging } = useSortable({
		id,
		index,
		type: "item",
		accept: "item",
		group: column,
	});

	return (
		<div className="Item" ref={ref} data-dragging={isDragging}>
			{children}
		</div>
	);
}
