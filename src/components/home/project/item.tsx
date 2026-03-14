import type { FeaturedProjectWithRelations } from "@/lib/types";

export default function ProjectItem({
	project,
}: {
	project: FeaturedProjectWithRelations;
}) {
	const { project: p } = project;
	return (
		<article>
			<img src={p.coverImage.url} alt={p.coverImage.altText || p.name} />
			<div>
				<h3>{p.name}</h3>
				<p>{p.description}</p>
			</div>
		</article>
	);
}
