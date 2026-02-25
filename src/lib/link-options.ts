import {
	Briefcase,
	Folder,
	Home,
	Layers,
	Mail01Icon,
} from "@hugeicons/core-free-icons";
import { linkOptions } from "@tanstack/react-router";

const homeLink = {
	name: "Home",
	to: "/",
	hash: "",
	description: "Return to the landing page and overview of my creative work.",
	icon: Home,
};

const experienceLink = {
	name: "Experience",
	to: "/",
	hash: "experience",
	description: "A timeline of my professional journey and key contributions.",
	icon: Briefcase,
};

const featuredProjectsLink = {
	name: "Featured Projects",
	to: "/",
	hash: "featured-projects",
	description:
		"Showcasing featured work, open-source tools, and side experiments.",
	icon: Folder,
};

const projectsLink = {
	name: "All Projects",
	to: "/projects",
	hash: "",
	description:
		"Showcasing featured work, open-source tools, and side experiments.",
	icon: Folder,
};
const techStackLink = {
	name: "Tech Stack",
	to: "/",
	hash: "tech-stack",
	description: "The modern tools and languages I use to bring ideas to life.",
	icon: Layers,
};

const contactLink = {
	name: "Contact",
	to: "/contact",
	hash: "",
	description:
		"Get in touch for collaborations, inquiries, or just to say hello.",
	icon: Mail01Icon,
};

export const aboutLinks = linkOptions([experienceLink, techStackLink]);
export const projectLinks = linkOptions([featuredProjectsLink, projectsLink]); //TODO: add featured and more
export const contactLinks = linkOptions([contactLink]);

export const navigationLinks = linkOptions([
	homeLink,
	experienceLink,
	projectsLink,
	techStackLink,
	contactLink,
]);

export type NavigationLink = (typeof navigationLinks)[number];
