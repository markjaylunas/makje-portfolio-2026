import { ChevronDown, ChevronUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { technologies } from "@/assets/home/technologies";
import H2 from "@/components/common/H2";
import GradientText from "@/components/gradient-text";
import { Button } from "@/components/ui/button";
import TechCard from "./card";

type ShowStatus = "initial" | "more" | "all";

export default function TechListSection() {
	const [showStatus, setShowStatus] = useState<ShowStatus>("initial");
	const sectionHeadingId = "tech-stack";

	// Logic: Determine how many items to show based on status
	const getVisibleCount = () => {
		if (showStatus === "initial") return 8;
		if (showStatus === "more") return 16;
		return technologies.length; // "all"
	};

	const visibleTech = technologies.slice(0, getVisibleCount());

	const handleToggle = () => {
		if (showStatus === "initial") {
			setShowStatus("more");
		} else if (showStatus === "more") {
			setShowStatus("all");
		} else {
			setShowStatus("initial");
		}
	};

	// UI Label and Icon logic
	const buttonConfig = {
		initial: { label: "Show More", icon: ChevronDown },
		more: { label: "Show All", icon: ChevronDown },
		all: { label: "Show Less", icon: ChevronUp },
	};

	const { label, icon } = buttonConfig[showStatus];

	return (
		<section
			className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20"
			aria-labelledby={sectionHeadingId}
		>
			<H2 id={sectionHeadingId}>
				<GradientText>Tech Stack</GradientText>
			</H2>

			<ul className="mx-auto max-w-(--breakpoint-sm) grid grid-cols-2 md:grid-cols-4 mt-12 gap-px bg-muted border border-muted">
				{visibleTech.map((tech) => (
					<TechCard key={tech.name} tech={tech} />
				))}
			</ul>

			<div className="w-full flex justify-center items-center mt-8">
				<Button
					onClick={handleToggle}
					variant="outline"
					size="lg"
					className="gap-2"
				>
					<HugeiconsIcon icon={icon} size={20} />
					{label}
				</Button>
			</div>
		</section>
	);
}
