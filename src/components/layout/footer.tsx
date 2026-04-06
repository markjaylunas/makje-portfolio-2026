import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import footerBackground from "@/assets/png/makje-textured.png";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { socialLinks } from "@/lib/constants";
import { navigationLinks } from "@/lib/link-options";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative w-full py-12 max-w-5xl mx-auto px-6">
			<div className="absolute inset-0 -z-10 top-16 left-2 overflow-hidden">
				<div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/90 to-background" />

				<img
					src={footerBackground}
					alt="Footer Background of Logo"
					className="min-w-lg sm:w-3/4 h-full object-contain z-0"
				/>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-start mx-auto">
				{/* Brand Section */}
				<div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
					<div className="flex items-center gap-2 justify-self-center">
						<Link to="/" className="flex items-center space-x-2">
							<img src={makjeLogoDark} alt="Logo" className="size-8" />
							<span className="text-3xl font-medium tracking-tighter">
								MakJe
							</span>
						</Link>
					</div>

					<p className="text-sm text-muted-foreground mt-4 max-w-xs leading-relaxed">
						Showcasing my journey as a Web Developer, highlighting my skills,
						experience, and recent projects. Built with performance and
						scalability in mind using modern web technologies.
					</p>
				</div>

				{/* Navigation Section */}
				<nav
					aria-label="Footer Navigation"
					className="justify-self-start sm:justify-self-end"
				>
					<h3 className="text-sm text-accent-foreground uppercase tracking-wider mb-4">
						Explore
					</h3>
					<ul className="space-y-1">
						{navigationLinks.map((link) => (
							<li key={`footer-explore-${link.to}-${link.hash}`}>
								<Link
									to={link.to}
									hash={link.hash}
									className="text-sm text-muted-foreground flex items-center gap-2  hover:opacity-60 transition-opacity duration-300 ease-in-out"
								>
									<HugeiconsIcon icon={link.icon} className="size-4" />
									{link.name}
								</Link>
							</li>
						))}
					</ul>
				</nav>

				{/* Social Section */}
				<div className="justify-self-start sm:justify-self-center">
					<h3 className="text-sm text-accent-foreground uppercase tracking-wider mb-4">
						Connect
					</h3>
					<ul className="space-y-1">
						{socialLinks.map((social) => (
							<li key={`footer-connect-${social.name}-${social.href}`}>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground flex items-center gap-2  hover:opacity-60 transition-opacity duration-300 ease-in-out"
								>
									<HugeiconsIcon icon={social.icon} className="size-4" />
									{social.name}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
			<p className="text-xs text-muted-foreground text-center mt-12">
				© {currentYear} MakJe. All rights reserved.
			</p>
		</footer>
	);
}
