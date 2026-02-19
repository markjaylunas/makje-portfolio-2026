import { technologies } from "@/assets/home/technologies";
import PixelCard from "@/components/PixelCard";

export default function TechListSection() {
	return (
		<ul className="flex gap-4">
			{technologies.map((tech) => (
				<PixelCard
					key={tech.name}
					colors="#FF1554,#FF1219,#6CFF08"
					className="size-56"
				>
					<div className="absolute">
						{tech.icon}
						{tech.name}
					</div>
				</PixelCard>
			))}
		</ul>
	);
}
