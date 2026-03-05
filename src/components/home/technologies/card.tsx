import PixelCard from "@/components/common/pixel-card";

export default function TechCard({
	icon,
	colors,
	name,
	url,
}: {
	icon: string;
	colors: string;
	name: string;
	url: string;
}) {
	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className="group block bg-background outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xs"
		>
			<div className="group bg-background hover:cursor-pointer">
				<PixelCard colors={colors} noFocus={true}>
					<div className="absolute flex flex-col items-center justify-center ">
						<img
							src={icon}
							alt={name}
							className="size-10 transition-all duration-500 grayscale-100 group-hover:grayscale-0 mt-4 group-hover:mt-0"
						/>
						<p className="transition-opacity duration-400 opacity-0  group-hover:opacity-100">
							{name}
						</p>
					</div>
				</PixelCard>
			</div>
		</a>
	);
}
