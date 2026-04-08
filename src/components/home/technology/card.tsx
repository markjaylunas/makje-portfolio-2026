import PixelCard from "@/components/common/pixel-card";
import { getOptimizedImageUrl, IMAGE_VARIANTS } from "@/lib/cloudflare-images";

type TechCardProps = {
	icon?: string;
	colors: string;
	name: string;
	alt?: string;
};

export default function TechCard({
	url,
	colors,
	name,
	alt,
	icon,
}: TechCardProps & {
	url?: string;
}) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="group block bg-background outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
		>
			<TechCardPixel colors={colors} name={name} alt={alt} icon={icon} />
		</a>
	);
}

export function TechCardPixel({ colors, name, alt, icon }: TechCardProps) {
	return (
		<div className="group bg-background hover:cursor-pointer">
			<PixelCard colors={colors} noFocus={true}>
				<div className="absolute flex flex-col items-center justify-center">
					<img
						src={getOptimizedImageUrl(icon || "", IMAGE_VARIANTS.ICON)}
						alt={alt}
						className="w-12 md:w-16 bg-contain bg-center transition-all duration-500 grayscale-0 sm:grayscale-100 group-hover:grayscale-0 -mt-2 sm:mt-6 group-hover:mt-0"
					/>
					<p className="transition-opacity duration-400 opacity-100 sm:opacity-0 group-hover:opacity-100 font-light mt-2 text-sm md:text-lg text-wrap">
						{name}
					</p>
				</div>
			</PixelCard>
		</div>
	);
}
