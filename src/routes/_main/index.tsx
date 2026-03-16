/** biome-ignore-all lint/correctness/useUniqueElementIds: <ignore for home section navigation ids> */

import { createFileRoute } from "@tanstack/react-router";
import ExperienceTimelineSection from "@/components/home/experience/section";
import HeroSection from "@/components/home/hero/hero-section";
import FeaturedProjectSection from "@/components/home/project/section";
import TechListSection from "@/components/home/technology/tech-list-section";
import ContentMotion from "@/components/motion/content-motion";
import { getExperienceListOptions } from "@/data/options/experience";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";

export const Route = createFileRoute("/_main/")({
	component: App,
	loader: async ({ context }) => {
		return await Promise.all([
			context.queryClient.ensureQueryData(getFeaturedTechnologyListOptions()),
			context.queryClient.ensureQueryData(getExperienceListOptions()),
			context.queryClient.ensureQueryData(getFeaturedProjectListOptions()),
		]);
	},
});

function App() {
	return (
		<main>
			<HeroSection />

			<div id="experience" className="h-12 md:h-24" />
			<ContentMotion>
				<ExperienceTimelineSection />
			</ContentMotion>

			<div id="featured-projects" className="h-12 md:h-24" />
			<ContentMotion>
				<FeaturedProjectSection />
			</ContentMotion>

			<div id="tech-stack" className="h-24" />
			<ContentMotion>
				<TechListSection />
			</ContentMotion>
		</main>
	);
}
