import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/common/theme-toggle";
import ExperienceTimelineSection from "@/components/home/experience/timeline-section";
import HeroSection from "@/components/home/hero-section";
import TechListSection from "@/components/home/technologies/tech-list-section";
import ContentMotion from "@/components/motion/content-motion";

export const Route = createFileRoute("/_main/")({ component: App });

function App() {
	return (
		<>
			<HeroSection />
			<ContentMotion>
				<ExperienceTimelineSection />
			</ContentMotion>
			<ContentMotion className="mt-24 md:mt-32">
				<TechListSection />
			</ContentMotion>
			<ThemeToggle />
		</>
	);
}
