import type {
	FeaturedProject,
	FeaturedTechnology,
	Media,
	Project,
	ProjectLike,
	Tag,
	Technology,
	User,
} from "@/db/types";

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

export type FeaturedProjectWithRelations = FeaturedProject & {
	project: Project & {
		coverImage: Media;
		tags: Tag[];
		likes: (ProjectLike & {
			user: User;
		})[];
		technologies: FeaturedTechnologyWithTechnology[];
	};
};

export type ProjectWithRelations = Project & {
	coverImage: Media;
	tags: Tag[];
	featured: FeaturedProject;
	likes: ProjectLike &
		{
			user: User;
		}[];
	technologies: FeaturedTechnologyWithTechnology[];
};
