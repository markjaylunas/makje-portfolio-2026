import type { Media, Technology } from "@/db/types";

export type Experience = {
	title: string;
	company: string;
	period: string;
	description: string;
	responsibilities: string[];
	technologyList: {
		name: string;
		url?: string;
		icon?: string;
		colors?: string;
	};
};

export type TechnologyWithIcon = Technology & { icon: Media };
