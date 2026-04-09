/** biome-ignore-all lint/a11y/noStaticElementInteractions: <ignore> */
/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <ignore> */
"use client";

import {
	ArrowLeft01Icon,
	ArrowRight01Icon,
	Loading03Icon,
	RotateClockwiseIcon,
	ZoomInAreaIcon,
	ZoomOutAreaIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { getOptimizedImageUrl, IMAGE_VARIANTS } from "@/lib/cloudflare-images";

interface ZoomableImageModalProps {
	src: string;
	alt?: string;
	images?: string[] | { src: string; alt?: string }[];
	variant?: keyof typeof IMAGE_VARIANTS;
	priority?: boolean;
}

export function ZoomableImageModal({
	src,
	alt = "",
	images,
	variant = "CARD",
	priority = false,
}: ZoomableImageModalProps) {
	const normalizedImages = images
		? images.map((img) =>
				typeof img === "string" ? { src: img, alt: "" } : img,
			)
		: [{ src, alt }];

	const initialIndex = normalizedImages.findIndex((img) => img.src === src);
	const [currentIndex, setCurrentIndex] = useState(
		initialIndex !== -1 ? initialIndex : 0,
	);
	const currentImage = normalizedImages[currentIndex];

	const [zoom, setZoom] = useState(1);
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [imageIsLoading, setImageIsLoading] = useState(true);

	useEffect(() => {
		setImageIsLoading(true);
	}, [currentImage.src]);

	const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4));

	const handleZoomOut = () => {
		setZoom((prev) => {
			const newZoom = Math.max(prev - 0.5, 1);
			if (newZoom === 1) setPosition({ x: 0, y: 0 }); // Reset position when zoomed out
			return newZoom;
		});
	};

	const resetZoomAndPan = useCallback(() => {
		setZoom(1);
		setPosition({ x: 0, y: 0 });
	}, []);

	const handleReset = useCallback(() => {
		resetZoomAndPan();
		setCurrentIndex(initialIndex !== -1 ? initialIndex : 0);
	}, [initialIndex, resetZoomAndPan]);

	const handleNext = useCallback(() => {
		if (normalizedImages.length <= 1) return;
		resetZoomAndPan();
		setCurrentIndex((prev) => (prev + 1) % normalizedImages.length);
	}, [normalizedImages.length, resetZoomAndPan]);

	const handlePrev = useCallback(() => {
		if (normalizedImages.length <= 1) return;
		resetZoomAndPan();
		setCurrentIndex(
			(prev) => (prev - 1 + normalizedImages.length) % normalizedImages.length,
		);
	}, [normalizedImages.length, resetZoomAndPan]);

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

	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mouseup", onMouseUp);
		}
		return () => window.removeEventListener("mouseup", onMouseUp);
	}, [isDragging]);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "ArrowLeft") handlePrev();
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [handleNext, handlePrev]);

	return (
		<Dialog onOpenChange={(open) => !open && handleReset()}>
			<DialogTrigger>
				<div className="relative cursor-zoom-in size-full">
					<img
						src={getOptimizedImageUrl(src, IMAGE_VARIANTS[variant])}
						alt={alt}
						className="size-full object-cover object-top select-none"
						loading={priority ? "eager" : "lazy"}
						{...{ fetchPriority: priority ? "high" : "auto" }}
						style={{
							backgroundImage: `url(${getOptimizedImageUrl(src, IMAGE_VARIANTS.BLUR)})`,
							backgroundSize: "cover",
							backgroundPosition: "top",
						}}
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
						src={getOptimizedImageUrl(currentImage.src, IMAGE_VARIANTS.FULL)}
						alt={currentImage.alt}
						onLoad={() => setImageIsLoading(false)}
						style={{
							transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
							transition: isDragging ? "none" : "transform 0.2s ease-out",
						}}
						className="max-h-full max-w-full object-contain select-none pointer-events-none"
						draggable={false}
					/>

					{/* Loading Indicator */}
					{imageIsLoading && (
						<div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
							<HugeiconsIcon
								icon={Loading03Icon}
								className="size-10 text-white animate-spin opacity-50"
							/>
						</div>
					)}

					{/* Zoom & Navigation Controls */}
					<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-background/20 backdrop-blur-md p-2 rounded-sm border border-white/10 z-50">
						{normalizedImages.length > 1 && (
							<>
								<Button
									variant="ghost"
									size="icon"
									onClick={handlePrev}
									className="text-white hover:bg-white/20"
								>
									<HugeiconsIcon icon={ArrowLeft01Icon} className="size-5" />
								</Button>
								<div className="w-px h-4 bg-white/20 mx-1" />
							</>
						)}
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
						<div className="w-px h-4 bg-white/20 mx-1" />
						<Button
							variant="ghost"
							size="icon"
							onClick={resetZoomAndPan}
							className="text-white hover:bg-white/20"
						>
							<HugeiconsIcon icon={RotateClockwiseIcon} className="size-4" />
						</Button>
						{normalizedImages.length > 1 && (
							<>
								<div className="w-px h-4 bg-white/20 mx-1" />
								<Button
									variant="ghost"
									size="icon"
									onClick={handleNext}
									className="text-white hover:bg-white/20"
								>
									<HugeiconsIcon icon={ArrowRight01Icon} className="size-5" />
								</Button>
							</>
						)}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
