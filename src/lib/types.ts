export type Experience = {
	title: string;
	company: string;
	period: string;
	description: string;
	responsibilities: string[];
	technologies: Technology[];
};

export type Technology = {
	name: string;
	url: string;
	icon?: string;
	colors?: string;
};
