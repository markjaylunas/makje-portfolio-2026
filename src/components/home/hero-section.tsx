import { Email, Github, Linkedin01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { GITHUB_URL, LINKEDIN_URL, PRIMARY_EMAIL } from "@/lib/constants";
import ShinyButton from "../common/shiny-button";

export default function HeroSection() {
	return (
		<section className="flex min-h-dvh flex-col items-center justify-center gap-2 px-4 sm:px-6">
			<div className="relative flex flex-col items-center justify-center gap-2">
				<div className="via-primary pointer-events-none absolute top-1/2 left-1/2 -z-10 h-dvh w-full max-w-7xl -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-linear-to-br from-emerald-300 from-0% via-60% to-cyan-500 to-100% opacity-10 blur-[60px] md:h-100 md:opacity-20 md:blur-[90px]"></div>
				<h1 className="via-primary from-0%% bg-linear-to-br from-emerald-300 via-60% to-cyan-500 to-100% bg-clip-text px-2 text-center text-5xl font-bold tracking-tighter text-transparent drop-shadow-2xl sm:px-8 sm:text-6xl md:text-7xl lg:text-9xl">
					Mark Jay Lunas <br />
					Web Developer
				</h1>

				<p className="prose mt-4 text-center text-base tracking-widest text-pretty md:text-xl">
					Transforming ambitious ideas into scalable, high-impact digital
					solutions
				</p>
			</div>

			<div className="mt-12 grid w-full max-w-lg grid-cols-1 gap-4 md:mt-24 md:grid-cols-3">
				<a
					href={GITHUB_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full"
				>
					<ShinyButton className="flex w-full items-center justify-center gap-2">
						<HugeiconsIcon icon={Github} />
						Github
					</ShinyButton>
				</a>

				<a
					href={LINKEDIN_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full"
				>
					<ShinyButton className="flex w-full items-center justify-center gap-2">
						<HugeiconsIcon icon={Linkedin01Icon} />
						LinkedIn
					</ShinyButton>
				</a>

				<a
					href={`mailto:${PRIMARY_EMAIL}`}
					target="_blank"
					rel="noopener noreferrer"
					className="w-full"
				>
					<ShinyButton className="flex w-full items-center justify-center gap-2">
						<HugeiconsIcon icon={Email} />
						Email
					</ShinyButton>
				</a>
			</div>
		</section>
	);
}
