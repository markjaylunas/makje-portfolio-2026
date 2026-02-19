import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/common/theme-toggle";
import ExperienceTimelineSection from "@/components/home/experience/timeline-section";
import HeroSection from "@/components/home/hero-section";
import TechListSection from "@/components/home/technologies/tech-list-section";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<>
			<HeroSection />
			<ExperienceTimelineSection />
			<TechListSection />
			<ThemeToggle />
		</>
	);
}
