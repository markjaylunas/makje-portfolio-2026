import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "@tanstack/react-router";
import makjeLogoDark from "@/assets/svg/makje-dark.svg";
import { socialLinks } from "@/lib/constants";
import { navigationLinks } from "@/lib/link-options";
import { Separator } from "../ui/separator";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="mt-12 w-full border-t border-muted py-12">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
					{/* Brand Section */}
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2 justify-self-center">
							<Link to="/" className="flex items-center space-x-2">
								<img src={makjeLogoDark} alt="Logo" className="size-8" />
								<span className="text-3xl font-medium tracking-tighter uppercase">
									Makje
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
					<nav aria-label="Footer Navigation">
						<h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
							Explore
						</h3>
						<ul className="space-y-2">
							{navigationLinks.map((link) => (
								<li key={link.to}>
									<Link
										to={link.to}
										hash={link.hash}
										className="text-sm text-accent-foreground flex items-center gap-2 hover:underline"
									>
										<HugeiconsIcon icon={link.icon} className="size-4" />
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</nav>

					{/* Social Section */}
					<div>
						<h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
							Connect
						</h3>
						<ul className="space-y-2">
							{socialLinks.map((social) => (
								<li key={social.name}>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-accent-foreground flex items-center gap-2 hover:underline"
									>
										<HugeiconsIcon icon={social.icon} className="size-4" />
										{social.name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom Bar */}
				<p className="text-xs text-muted-foreground text-center">
					© {currentYear} Makje. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
