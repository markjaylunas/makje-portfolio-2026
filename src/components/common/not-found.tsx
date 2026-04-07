import { Link } from "@tanstack/react-router";
import ShinyButton from "@/components/common/shiny-button";
import ContentMotion from "@/components/motion/content-motion";

export default function NotFound() {
	return (
		<main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
			<div className="grid-subtle-background absolute inset-0 z-0 opacity-30" />
			<div className="prismatic-aurora-background absolute inset-0 z-0 h-full opacity-20" />

			<ContentMotion className="relative z-10 flex flex-col items-center gap-8 text-center px-4">
				<div className="space-y-4">
					<h1 className="text-8xl font-black tracking-tighter sm:text-9xl bg-clip-text text-transparent bg-linear-to-b from-white to-white/20">
						404
					</h1>
					<h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-white">
						Lost in the Digital Void
					</h2>
					<p className="max-w-125 text-muted-foreground sm:text-lg">
						The page you are looking for has either drifted into another
						dimension or never existed in this timeline.
					</p>
				</div>

				<ShinyButton as={Link} to="/" className="mt-4">
					Return to Base
				</ShinyButton>
			</ContentMotion>

			{/* Decorative elements */}
			<div className="absolute top-1/4 -left-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl animate-pulse" />
			<div className="absolute bottom-1/4 -right-12 h-64 w-64 rounded-full bg-chart-1/20 blur-3xl animate-pulse delay-1000" />
		</main>
	);
}
