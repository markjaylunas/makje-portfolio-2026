import type { FeaturedTechnology, Media, Technology } from "@/db/types";

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

export type TechnologyWithIcon = Technology & {
	icon: Media;
};
export type TechnologyWithRelations = Technology & {
	icon: Media;
	featured: FeaturedTechnology;
};

export type FeaturedTechnologyWithTechnology = FeaturedTechnology & {
	technology: Technology & {
		icon: Media;
	};
};
