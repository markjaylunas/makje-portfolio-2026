import { Link } from "@tanstack/react-router";
import { AnimatePresence, m } from "motion/react";
import { useEffect, useState } from "react";
import { ItemMedia } from "@/components/ui/item";

interface ProjectCardImageProps {
	projectId: string;
	allPhotos: string[];
}

export default function ProjectCardImage({
	projectId,
	allPhotos,
}: ProjectCardImageProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;

		if (isHovered && allPhotos.length > 1) {
			interval = setInterval(() => {
				setCurrentIndex((prev) => (prev + 1) % allPhotos.length);
			}, 1500);
		} else {
			setCurrentIndex(0);
		}

		return () => clearInterval(interval);
	}, [isHovered, allPhotos.length]);

	return (
		<Link
			to="/project/$projectId"
			params={{ projectId }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="relative rounded-xs group"
		>
			<AnimatePresence mode="popLayout" initial={false}>
				<ItemMedia variant="image" className="size-48 bg-muted">
					<m.img
						key={allPhotos[currentIndex]}
						src={allPhotos[currentIndex]}
						initial={{ y: "100%", scale: 1.1, opacity: 0 }}
						animate={{ y: 0, scale: 1, opacity: 1 }}
						exit={{ y: "-100%", scale: 0.9, opacity: 0 }}
						transition={{
							duration: 0.6,
							ease: [0.22, 1, 0.36, 1],
							opacity: { duration: 0.3 },
						}}
						className="absolute inset-0 h-full w-full object-cover will-change-transform overflow-hidden rounded-xs"
					/>
				</ItemMedia>
			</AnimatePresence>

			{allPhotos.length > 1 && (
				<div
					className={`absolute bottom-3 left-3 right-3 flex gap-1.5 z-10 ${isHovered ? "visible" : "hidden"}`}
				>
					{allPhotos.map((_, i) => {
						const key = `${projectId}-${i}`;
						return (
							<div
								key={key}
								className="h-1 flex-1 bg-white/20 backdrop-blur-md rounded-full overflow-hidden"
							>
								{isHovered && i === currentIndex && (
									<m.div
										layoutId={key}
										className="h-full bg-white"
										initial={{ width: "0%" }}
										animate={{ width: "100%" }}
										transition={{ duration: 1.5, ease: "linear" }}
									/>
								)}
								{!isHovered && i === 0 && (
									<div className="h-full w-full bg-white/60" />
								)}
							</div>
						);
					})}
				</div>
			)}
		</Link>
	);
}
