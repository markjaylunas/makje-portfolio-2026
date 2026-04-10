/** biome-ignore-all lint/correctness/useUniqueElementIds: <ignore for home section navigation ids> */

import { createFileRoute } from "@tanstack/react-router";
import ExperienceTimelineSection from "@/components/home/experience/section";
import FinalCTASection from "@/components/home/final-cta";
import HeroSection from "@/components/home/hero/hero-section";
import FeaturedProjectSection from "@/components/home/project/section";
import TechListSection from "@/components/home/technology/tech-list-section";
import ContentMotion from "@/components/motion/content-motion";
import { getExperienceListOptions } from "@/data/options/experience";
import { getFeaturedProjectListOptions } from "@/data/options/featured-project";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";
import { getSessionOptions } from "@/data/options/user";

export const Route = createFileRoute("/_main/")({
	component: App,
	loader: async ({ context }) => {
		return await Promise.all([
			context.queryClient.ensureQueryData(getFeaturedTechnologyListOptions()),
			context.queryClient.ensureQueryData(getExperienceListOptions()),
			context.queryClient.ensureQueryData(getFeaturedProjectListOptions()),
			context.queryClient.ensureQueryData(getSessionOptions()),
		]);
	},
});

function App() {
	return (
		<main className="relative min-h-[200vh]">
			<div className="grid-subtle-background absolute inset-0 opacity-30 h-dvh z-0" />

			<HeroSection />

			<div id="featured-projects" className="relative">
				<div className="h-12 md:h-24" />
				<div className="left-masked-noise-background absolute inset-0 h-[110%] z-0" />
				<ContentMotion animateOnView={true}>
					<FeaturedProjectSection />
				</ContentMotion>
			</div>

			<div id="tech-stack" className="h-24 mt-32" />
			<ContentMotion animateOnView={true}>
				<TechListSection />
			</ContentMotion>

			<div id="experience" className="relative mt-16 pb-32">
				<div className="h-12 md:h-24" />
				<div className="dashed-top-right-fade-grid absolute inset-0 h-full z-0" />
				<ContentMotion animateOnView={true}>
					<ExperienceTimelineSection />
				</ContentMotion>
			</div>

			<div id="final-cta" className="relative mt-16 pb-32">
				<div className="h-12 md:h-24" />
				<div className="prismatic-aurora-background absolute inset-0 h-full z-0" />
				<ContentMotion animateOnView={true}>
					<FinalCTASection />
				</ContentMotion>
			</div>
		</main>
	);
}
