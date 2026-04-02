import { useSuspenseQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { getSessionOptions } from "@/data/options/user";
import FeaturedProjectList from "./list";

export default function FeaturedProjectSection() {
	const { data: featuredProjectList } = useSuspenseQuery(
		getFeaturedProjectListOptions(),
	);
	const { data: session } = useSuspenseQuery(getSessionOptions());

	return (
		<section>
			<FeaturedProjectList
				featuredProjectList={featuredProjectList}
				session={session}
			/>
		</section>
	);
}
