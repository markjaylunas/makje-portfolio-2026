import { useSuspenseQuery } from "@tanstack/react-query";
import { getProjectListOptions } from "@/data/options/project";
import ProjectList from "./list";

export default function ProjectSection() {
	const { data: projectList } = useSuspenseQuery(getProjectListOptions());

	return (
		<section>
			<ProjectList projectList={projectList} />
		</section>
	);
}
