import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { ZoomableImageModal } from "./zoomable-image";

export default function ImageCarousel({
	imageList,
	autoplay = null,
	delay = 5000,
}: {
	imageList: string[];
	autoplay?: "auto" | "onHover" | null;
	delay?: number;
}) {
	const [api, setApi] = useState<CarouselApi>();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (!api) return;

		setCurrentIndex(api.selectedScrollSnap());

		api.on("select", () => {
			setCurrentIndex(api.selectedScrollSnap());
		});
	}, [api]);

	useEffect(() => {
		const autoplayPlugin = api?.plugins()?.autoplay;
		if (!api || !autoplayPlugin) return;

		if (autoplay === "onHover") {
			if (isHovered) {
				api.scrollNext();
				autoplayPlugin.play();
			} else {
				api.scrollTo(0);
				autoplayPlugin.stop();
			}
		} else if (autoplay === "auto") {
			autoplayPlugin.play();
		} else {
			autoplayPlugin.stop();
		}
	}, [api, isHovered, autoplay]);

	if (imageList.length === 0)
		return <div className="size-full bg-muted/20 animate-pulse" />;

	return (
		<Carousel
			setApi={setApi}
			opts={{
				align: "start",
				loop: true,
			}}
			plugins={[
				Autoplay({
					delay,
					stopOnMouseEnter: false,
					stopOnInteraction: false,
				}),
			]}
			className="size-full group cursor-grab"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<CarouselContent className="size-full ml-0">
				{imageList.map((image) => (
					<CarouselItem key={image} className="size-full pl-0">
						<ZoomableImageModal src={image} />
					</CarouselItem>
				))}
			</CarouselContent>

			{imageList.length > 1 && (
				<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20 pointer-events-auto">
					{imageList.map((image, i) => (
						<button
							key={`dot-${image}`}
							type="button"
							onClick={() => api?.scrollTo(i)}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								i === currentIndex
									? "w-8 bg-white shadow-xs"
									: "w-2 bg-white/40 hover:bg-white/60 shadow-xs"
							}`}
						/>
					))}
				</div>
			)}
		</Carousel>
	);
}
