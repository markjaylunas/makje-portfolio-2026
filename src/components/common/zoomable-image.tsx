/** biome-ignore-all lint/a11y/noStaticElementInteractions: <ignore> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <ignore> */
"use client";

import {
	RotateClockwiseIcon,
	ZoomInAreaIcon,
	ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ZoomableImageModalProps {
	src: string;
	alt?: string;
}

export function ZoomableImageModal({ src, alt = "" }: ZoomableImageModalProps) {
	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

	const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4));

	const handleZoomOut = () => {
		setZoom((prev) => {
			const newZoom = Math.max(prev - 0.5, 1);
			if (newZoom === 1) setPosition({ x: 0, y: 0 }); // Reset position when zoomed out
			return newZoom;
		});
	};

	const handleReset = () => {
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	};

	// --- Pan Logic ---
	const onMouseDown = (e: React.MouseEvent) => {
		if (zoom <= 1) return;
		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!isDragging || zoom <= 1) return;
		e.preventDefault();
		setPosition({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});
	};

	const onMouseUp = () => setIsDragging(false);

	// Global listener to catch mouse up outside the container
	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mouseup", onMouseUp);
		}
		return () => window.removeEventListener("mouseup", onMouseUp);
	}, [isDragging]);

	return (
		<Dialog onOpenChange={(open) => !open && handleReset()}>
			<DialogTrigger>
				<div className="relative cursor-zoom-in size-full">
					<img
						src={src}
						alt={alt}
						className="size-full object-cover select-none"
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="max-w-[95vw] md:max-w-[80vw] lg:max-w-[70vw] w-full h-[90vh] p-0 overflow-hidden bg-black/95 border-muted-foreground border-2">
				<DialogTitle className="sr-only">Image Preview</DialogTitle>

				<div
					className={`relative size-full flex items-center justify-center overflow-hidden p-4 ${
						zoom > 1
							? isDragging
								? "cursor-grabbing"
								: "cursor-grab"
							: "cursor-default"
					}`}
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
				>
					<img
						src={src}
						alt={alt}
						style={{
							transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
							transition: isDragging ? "none" : "transform 0.2s ease-out",
						}}
						className="max-h-full max-w-full object-contain select-none pointer-events-none"
						draggable={false}
					/>

					{/* Zoom Controls */}
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/20 backdrop-blur-md p-2 rounded-sm border border-white/10 z-50">
						<Button
							variant="ghost"
							size="icon"
							onClick={handleZoomOut}
							disabled={zoom <= 1}
							className="text-white hover:bg-white/20"
						>
							<HugeiconsIcon icon={ZoomOutAreaIcon} className="size-5" />
						</Button>
						<span className="text-white text-xs font-medium w-12 text-center">
							{Math.round(zoom * 100)}%
						</span>
						<Button
							variant="ghost"
							size="icon"
							onClick={handleZoomIn}
							disabled={zoom >= 4}
							className="text-white hover:bg-white/20"
						>
							<HugeiconsIcon icon={ZoomInAreaIcon} className="size-5" />
						</Button>
						<div className="w-[1px] h-4 bg-white/20 mx-1" />
						<Button
							variant="ghost"
							size="icon"
							onClick={handleReset}
							className="text-white hover:bg-white/20"
						>
							<HugeiconsIcon icon={RotateClockwiseIcon} className="size-4" />
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
