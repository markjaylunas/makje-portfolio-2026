import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import FeaturedProjectList from "./featured-project.list";

export default function FeaturedProjectSection() {
	const { data: featuredProjectList } = useSuspenseQuery(
		getFeaturedProjectListOptions(),
	);

	return (
		<section>
			<FeaturedProjectList featuredProjectList={featuredProjectList} />
		</section>
	);
}
