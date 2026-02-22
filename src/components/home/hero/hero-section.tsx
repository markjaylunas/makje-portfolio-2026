import { HugeiconsIcon } from "@hugeicons/react";
import { socialLinks } from "@/lib/constants";
import GradientText from "../../common/gradient-text";
import ShinyButton from "../../common/shiny-button";
import HeroLogo from "./logo";

export default function HeroSection() {
	return (
		<section className="flex min-h-[calc(100dvh-128px)] flex-col items-center justify-center gap-2 px-4 sm:px-6">
			<div className="relative flex flex-col items-center justify-center gap-2">
				<div className="to-primary pointer-events-none absolute top-1/2 left-1/2 -z-10 h-dvh w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-linear-to-br from-emerald-300 from-0% to-60%  opacity-12 blur-[60px] md:h-100 md:opacity-20 md:blur-[90px]"></div>
				<HeroLogo />
				<h1 className="text-center text-4xl font-bold drop-shadow-2xl xs:text-5xl md:text-6xl lg:text-7xl">
					<GradientText>
						Mark Jay Lunas <br />
						<span className="font-medium uppercase tracking-wider text-2xl xs:text-4xl md:text-5xl lg:text-6xl">
							Web Developer
						</span>
					</GradientText>
				</h1>

				<p className="prose mt-2 md:mt-4 text-center text-muted-foreground text-pretty text-sm md:text-xl font-light">
					Next-gen web development <br className="block md:hidden" /> for
					ambitious goals
				</p>
			</div>

			<div className="mt-12 md:mt-20 grid w-full max-w-lg grid-cols-1 gap-4 md:gap-8 md:grid-cols-3">
				{socialLinks.map((social) => (
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className="w-full"
						key={social.name}
					>
						<ShinyButton className="flex w-full items-center justify-center gap-2">
							<HugeiconsIcon icon={social.icon} size={20} />
							{social.name}
						</ShinyButton>
					</a>
				))}
			</div>
		</section>
	);
}
