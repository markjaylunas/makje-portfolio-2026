/** biome-ignore-all lint/correctness/useUniqueElementIds: <ignore for home section navigation ids> */

import { createFileRoute } from "@tanstack/react-router";
import ExperienceTimelineSection from "@/components/home/experience/timeline-section";
import HeroSection from "@/components/home/hero/hero-section";
import TechListSection from "@/components/home/technologies/tech-list-section";
import ContentMotion from "@/components/motion/content-motion";
import { getTechnologyListOptions } from "@/data/options/technology";

export const Route = createFileRoute("/_main/")({
	component: App,
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(getTechnologyListOptions({}));
	},
});

function App() {
	return (
		<>
			<HeroSection />

			<div id="experience" className="h-12 md:h-24" />
			<ContentMotion>
				<ExperienceTimelineSection />
			</ContentMotion>
			<div id="tech-stack" className="h-24" />
			<ContentMotion>
				<TechListSection />
			</ContentMotion>
		</>
	);
}
