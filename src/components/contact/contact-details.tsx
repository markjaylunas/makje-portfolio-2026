import { ArrowUpRight } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { socialLinks } from "@/lib/constants";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "../ui/item";

export default function ContactDetails() {
	return (
		<section className="flex-1 flex flex-col gap-4">
			<div className="flex flex-col gap-2">
				<h2 className="text-3xl font-bold">Let&apos;s Connect</h2>

				<p className="mt-2 leading-relaxed text-muted-foreground">
					I&apos;m always open to new opportunities and collaborations. If you
					have a project in mind or would like to discuss a potential
					collaboration, feel free to reach out. I&apos;d love to hear from you!
				</p>
			</div>

			<div className="flex flex-col gap-2 mt-6">
				{socialLinks.map((social) => (
					<a
						href={social.href}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-full group"
						key={social.name}
					>
						<Item
							variant="outline"
							className="group-hover:bg-accent transition-colors cursor-pointer duration-300 ease-in-out"
						>
							<ItemMedia variant="icon">
								<HugeiconsIcon
									icon={social.icon}
									size={20}
									className="group-hover:text-primary transition-all duration-300 ease-in-out"
								/>
							</ItemMedia>
							<ItemContent>
								<ItemTitle className="group-hover:text-primary transition-all duration-300 ease-in-out">
									{social.name}
								</ItemTitle>
								<ItemDescription>{social.description}</ItemDescription>
							</ItemContent>

							<ItemActions>
								<HugeiconsIcon
									icon={ArrowUpRight}
									size={20}
									className="group-hover:text-primary transition-all duration-300 ease-in-out"
								/>
							</ItemActions>
						</Item>
					</a>
				))}
			</div>
		</section>
	);
}
