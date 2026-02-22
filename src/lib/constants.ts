import { Email, Github, Linkedin } from "@hugeicons/core-free-icons";

export const PRIMARY_EMAIL = "markjaylunas@gmail.com";
export const LINKEDIN_URL = "https://linkedin.com/in/markjaylunas";
export const GITHUB_URL = "https://github.com/markjaylunas";

export const socialLinks = [
	{
		name: "GitHub",
		href: GITHUB_URL,
		description: "Explore my open-source contributions and repositories.",
		icon: Github,
	},
	{
		name: "LinkedIn",
		href: LINKEDIN_URL,
		description: "Connect with me professionally and view my career updates.",
		icon: Linkedin,
	},
	{
		name: "Email",
		href: `mailto:${PRIMARY_EMAIL}`,
		description: "Follow me for tech insights and daily development tips.",
		icon: Email,
	},
];
