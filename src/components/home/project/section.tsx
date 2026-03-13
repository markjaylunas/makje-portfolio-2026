import { useQuery } from "@tanstack/react-query";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";

export default function FeaturedProjectSection() {
	const { data: projects } = useQuery(getFeaturedProjectListOptions());

	return (
		<div>
			<pre>{JSON.stringify(projects, null, 2)}</pre>
		</div>
	);
}
