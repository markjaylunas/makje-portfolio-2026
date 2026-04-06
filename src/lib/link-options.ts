import {
	Briefcase,
	DashboardSquare03Icon,
	Folder,
	Home,
	Layers,
	Message02Icon,
	Tag,
} from "@hugeicons/core-free-icons";
import { linkOptions } from "@tanstack/react-router";

const homeLink = {
	name: "Home",
	to: "/",
	hash: "",
	description: "Return to the landing page and overview of my creative work.",
	icon: Home,
	activeOptions: {},
};

const experienceLink = {
	name: "Experience",
	to: "/",
	hash: "experience",
	description: "A timeline of my professional journey and key contributions.",
	icon: Briefcase,
	activeOptions: {},
};

const featuredProjectsLink = {
	name: "Featured Projects",
	to: "/",
	hash: "featured-projects",
	description:
		"Showcasing featured work, open-source tools, and side experiments.",
	icon: Folder,
	activeOptions: {
		exact: true,
	},
};

const projectsLink = {
	name: "Projects",
	to: "/project",
	hash: "",
	description:
		"Showcasing featured work, open-source tools, and side experiments.",
	icon: Folder,
	activeOptions: {
		exact: true,
	},
};
const techStackLink = {
	name: "Tech Stack",
	to: "/",
	hash: "tech-stack",
	description: "The modern tools and languages I use to bring ideas to life.",
	icon: Layers,
	activeOptions: {
		exact: true,
	},
};

const contactLink = {
	name: "Contact",
	to: "/contact",
	hash: "",
	description:
		"Get in touch for collaborations, inquiries, or just to say hello.",
	icon: Message02Icon,
	activeOptions: {
		exact: true,
	},
};

export const aboutLinks = linkOptions([experienceLink, techStackLink]);
export const projectLinks = linkOptions([featuredProjectsLink, projectsLink]);
export const contactLinks = linkOptions([contactLink]);

export const navigationLinks = linkOptions([
	homeLink,
	experienceLink,
	projectsLink,
	techStackLink,
	contactLink,
]);

export type NavigationLink = (typeof navigationLinks)[number];

export const adminNavLinks = linkOptions([
	{
		title: "Dashboard",
		to: "/admin/dashboard",
		icon: DashboardSquare03Icon,
		activeOptions: {
			exact: false,
		},
	},
	{
		title: "Projects",
		to: "/admin/project",
		icon: Folder,
		activeOptions: {
			exact: false,
		},
	},
	{
		title: "Technology",
		to: "/admin/technology",
		icon: Layers,
		activeOptions: {
			exact: false,
		},
	},
	{
		title: "Experience",
		to: "/admin/experience",
		icon: Briefcase,
		activeOptions: {
			exact: false,
		},
	},

	{
		title: "Tags",
		to: "/admin/tags",
		icon: Tag,
		activeOptions: {
			exact: false,
		},
	},
	{
		title: "Messages",
		to: "/admin/contact-message",
		icon: Message02Icon,
		activeOptions: {
			exact: false,
		},
	},
]);

export type AdminNavigationLink = (typeof adminNavLinks)[number];
