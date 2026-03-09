import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";

export default function FeaturedTechnologyCardList() {
	const { data: featuredTechnologyList } = useSuspenseQuery(
		getFeaturedTechnologyListOptions(),
	);
	return (
		<div>
			FeaturedTechnologyCardList
			<ul>
				{featuredTechnologyList.map((tech) => (
					<li key={tech.id}> {tech.technology.name}</li>
				))}
			</ul>
		</div>
	);
}
