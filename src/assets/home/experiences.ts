// @/assets/home/experiences.ts
export type Technology = {
	name: string;
	url: string;
};

export type Experience = {
	title: string;
	company: string;
	period: string;
	description: string;
	responsibilities: string[];
	technologies: Technology[];
};

export const experiences: Experience[] = [
	{
		title: "Web Developer",
		company: "Freelance",
		period: "April 2024 – Present",
		description:
			"Specializing in modern web application development with cutting-edge technologies.",
		responsibilities: [
			"Architected full-stack applications using React 19, Next.js, and TypeScript for high-performance, SEO-optimized solutions.",
			"Designed high-efficiency database layers using Drizzle ORM and implemented Redis caching to reduce latency.",
			"Optimized server state management using TanStack Query, implementing smart caching and background synchronization.",
			"Developed AI-driven features by integrating Google Gemini to enhance user engagement through automation.",
			"Secured client data using Better-Auth, implementing multi-factor authentication and rate limiting.",
			"Managed cloud infrastructure using Vercel and Cloudflare to ensure 99.9% uptime and global edge performance.",
		],
		technologies: [
			{ name: "React 19", url: "https://react.dev/" },
			{ name: "Next.js", url: "https://nextjs.org/" },
			{ name: "TypeScript", url: "https://www.typescriptlang.org/" },
			{ name: "TanStack Query", url: "https://tanstack.com/query/latest" },
			{ name: "Drizzle ORM", url: "https://orm.drizzle.team/" },
			{ name: "PostgreSQL", url: "https://www.postgresql.org/" },
			{ name: "Shadcn UI", url: "https://ui.shadcn.com/" },
			{ name: "Tailwind CSS", url: "https://tailwindcss.com/" },
			{ name: "Redis", url: "https://redis.io/" },
			{ name: "Google Gemini", url: "https://ai.google.dev/" },
			{ name: "Better-Auth", url: "https://www.better-auth.com/" },
			{ name: "Vercel", url: "https://vercel.com/" },
			{ name: "Cloudflare", url: "https://www.cloudflare.com/" },
		],
	},
	{
		title: "Full Stack Web Developer",
		company: "Sta. Clara International Corporation",
		period: "October 2022 – March 2024",
		description:
			"Developed and maintained enterprise web applications focusing on scalability and performance.",
		responsibilities: [
			"Built full-stack solutions using React.js, Next.js, and Supabase to streamline complex data workflows.",
			"Engineered responsive interfaces using Mantine UI, focusing on cross-platform accessibility.",
			"Leveraged Supabase for real-time database solutions and secure authentication.",
			"Mitigated technical risk by establishing Jest and Cypress testing protocols to reduce production bugs.",
			"Collaborated with cross-functional teams using Git for version control and participating in code reviews.",
		],
		technologies: [
			{ name: "React.js", url: "https://reactjs.org/" },
			{ name: "Next.js", url: "https://nextjs.org/" },
			{ name: "TypeScript", url: "https://www.typescriptlang.org/" },
			{ name: "Supabase", url: "https://supabase.com/" },
			{ name: "PostgreSQL", url: "https://www.postgresql.org/" },
			{ name: "Mantine UI", url: "https://mantine.dev/" },
			{ name: "SCSS", url: "https://sass-lang.com/" },
			{ name: "React Hook Form", url: "https://react-hook-form.com/" },
			{ name: "Jest", url: "https://jestjs.io/" },
			{ name: "Cypress", url: "https://www.cypress.io/" },
			{ name: "Git", url: "https://git-scm.com/" },
		],
	},
];
