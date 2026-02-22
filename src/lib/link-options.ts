import {
	Briefcase,
	Folder,
	Home,
	Layers,
	Mail01Icon,
} from "@hugeicons/core-free-icons";
import { linkOptions } from "@tanstack/react-router";

export const navigationLinks = linkOptions([
	{
		name: "Home",
		to: "/",
		hash: "",
		description: "Return to the landing page and overview of my creative work.",
		icon: Home,
	},
	{
		name: "Experience",
		to: "/",
		hash: "experience",
		description: "A timeline of my professional journey and key contributions.",
		icon: Briefcase,
	},
	{
		name: "Projects",
		to: "/",
		hash: "projects",
		description:
			"Showcasing featured work, open-source tools, and side experiments.",
		icon: Folder,
	},
	{
		name: "Tech Stack",
		to: "/",
		hash: "tech-stack",
		description: "The modern tools and languages I use to bring ideas to life.",
		icon: Layers,
	},
	{
		name: "Contact",
		to: "/contact",
		hash: "",
		description:
			"Get in touch for collaborations, inquiries, or just to say hello.",
		icon: Mail01Icon,
	},
]);

export type NavigationLink = (typeof navigationLinks)[number];
