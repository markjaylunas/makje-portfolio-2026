import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import { useId } from "react";
import SectionHeader from "../common/section-header";
import ShinyButton from "../common/shiny-button";

export default function FinalCTASection() {
	const sectionHeadingId = useId();

	return (
		<section
			className="mx-auto max-w-5xl px-4 sm:px-0"
			aria-labelledby={sectionHeadingId}
		>
			<SectionHeader
				id={sectionHeadingId}
				subtitle="Let's talk"
				title="Interested in working together?"
				description="Whether you're looking to expand your team or you're an individual with a vision for a new platform, I’m ready to help build it. My inbox is always open for the right opportunity."
			/>

			<Link to="/contact" className="w-fit">
				<ShinyButton
					as="div"
					className="flex w-fit items-center justify-center gap-2 px-8 py-4 text-lg"
				>
					<HugeiconsIcon icon={ArrowRight02Icon} size={20} />
					Get in Touch
				</ShinyButton>
			</Link>
		</section>
	);
}
