import { useSuspenseQuery } from "@tanstack/react-query";
import TechCard from "@/components/home/technology/card";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";

export default function FeaturedTechnologyCardList() {
	const { data: featuredTechnologyList } = useSuspenseQuery(
		getFeaturedTechnologyListOptions(),
	);
	return (
		<div>
			FeaturedTechnologyCardList
			<ul className="mx-auto max-w-(--breakpoint-sm) grid grid-cols-2 md:grid-cols-4 mt-12 gap-px bg-muted border border-muted">
				{featuredTechnologyList.map(({ id, order, technology }) => (
					<li key={id} className="relative">
						<p className="absolute z-10 top-2 right-2">{order}</p>
						<TechCard
							icon={technology.icon?.url ?? undefined}
							colors={technology.brandColor}
							name={technology.name}
							url={technology.url}
							alt={technology.icon?.altText ?? undefined}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
