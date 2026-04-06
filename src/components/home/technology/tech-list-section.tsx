import { ChevronDown, ChevronUp } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import SectionHeader from "@/components/common/section-header";
import PopOutMotion from "@/components/motion/pop-out-motion";
import { getFeaturedTechnologyListOptions } from "@/data/options/featured-technology";
import TechCard from "./card";

type ShowStatus = "initial" | "more" | "all";

export default function TechListSection() {
	const [showStatus, setShowStatus] = useState<ShowStatus>("initial");
	const sectionHeadingId = "tech-stack";

	const { data: featuredTechnologyList } = useSuspenseQuery(
		getFeaturedTechnologyListOptions(),
	);

	// Logic: Determine how many items to show based on status
	const getVisibleCount = () => {
		if (showStatus === "initial") return 8;
		if (showStatus === "more") return 16;
		return featuredTechnologyList.length; // "all"
	};

	const visibleTech = featuredTechnologyList.slice(0, getVisibleCount());

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
			className="mx-auto max-w-5xl px-4 sm:px-0"
			aria-labelledby={sectionHeadingId}
		>
			<SectionHeader
				id={sectionHeadingId}
				subtitle="Toolbox"
				title="Technologies I work with."
				description="These are the languages, frameworks, and tools that I use to bring my ideas to life."
			/>

			<ul className="grid grid-cols-2 md:grid-cols-4 mt-12 gap-px bg-muted border border-muted">
				{visibleTech.map(({ id, technology }) => (
					<li key={id}>
						<PopOutMotion>
							<TechCard
								icon={technology.icon?.url ?? undefined}
								colors={technology.brandColor}
								name={technology.name}
								url={technology.url}
								alt={technology.icon?.altText ?? undefined}
							/>
						</PopOutMotion>
					</li>
				))}
				{featuredTechnologyList.length > 8 && (
					<li className="col-span-2 md:col-span-4">
						<PopOutMotion>
							<button
								type="button"
								onClick={handleToggle}
								className="group w-full h-24 md:h-20 flex items-center justify-center gap-3 bg-background transition-all duration-300 cursor-pointer relative"
							>
								<div className="flex items-center gap-2 font-medium text-muted-foreground group-hover:text-foreground transition-colors">
									<HugeiconsIcon
										icon={icon}
										className="size-6 transition-transform duration-300 group-hover:scale-110"
									/>
									<span className="text-sm md:text-base uppercase tracking-widest font-light">
										{label}
									</span>
								</div>
							</button>
						</PopOutMotion>
					</li>
				)}
			</ul>
		</section>
	);
}
