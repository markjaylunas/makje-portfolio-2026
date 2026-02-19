export type Experience = {
	title: string;
	company: string;
	period: string;
	description: string;
	responsibilities: string[];
	technologies: Technology[];
};

type Technology = {
	name: string;
	url: string;
};
