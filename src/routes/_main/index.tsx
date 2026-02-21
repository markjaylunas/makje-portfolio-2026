/** biome-ignore-all lint/correctness/useUniqueElementIds: <ignore for home section navigation ids> */

import { createFileRoute } from "@tanstack/react-router";
import ExperienceTimelineSection from "@/components/home/experience/timeline-section";
import HeroSection from "@/components/home/hero-section";
import TechListSection from "@/components/home/technologies/tech-list-section";
import ContentMotion from "@/components/motion/content-motion";

export const Route = createFileRoute("/_main/")({ component: App });

function App() {
	return (
		<>
			<HeroSection />

			<div id="experience" className="pt-24 md:pt-32">
				<ContentMotion>
					<ExperienceTimelineSection />
				</ContentMotion>
			</div>
			<div id="tech-stack" className="pt-12 md:pt-24">
				<ContentMotion>
					<TechListSection />
				</ContentMotion>
			</div>
		</>
	);
}
