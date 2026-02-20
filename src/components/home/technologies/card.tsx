import PixelCard from "@/components/PixelCard";
import type { Technology } from "@/lib/types";

export default function TechCard({ tech }: { tech: Technology }) {
	return (
		<a href={tech.url} target="_blank" rel="noopener noreferrer">
			<div className="group bg-background hover:cursor-pointer">
				<PixelCard colors={tech.colors}>
					<div className="absolute flex flex-col items-center justify-center ">
						<img
							src={tech.icon}
							alt={tech.name}
							className="size-10 transition-all duration-500 grayscale-100 group-hover:grayscale-0 mt-4 group-hover:mt-0"
						/>
						<p className="transition-opacity duration-400 opacity-0  group-hover:opacity-100">
							{tech.name}
						</p>
					</div>
				</PixelCard>
			</div>
		</a>
	);
}
