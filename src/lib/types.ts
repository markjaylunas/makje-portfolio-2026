import type {
	ContactMessage,
	FeaturedProject,
	FeaturedTechnology,
	Media,
	Project,
	ProjectLike,
	ProjectToTags,
	ProjectToTechnologies,
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
		coverImage: Media | null;
		tags: (ProjectToTags & { tag: Tag })[];
		likes: (ProjectLike & {
			user: User;
		})[];
		technologies: (ProjectToTechnologies & {
			technology: Technology & {
				icon: Media;
			};
		})[];
	};
};

export type ProjectWithRelations = Project & {
	coverImage: Media | null;
	tags: (ProjectToTags & { tag: Tag })[];
	featured: FeaturedProject | null;
	likes: (ProjectLike & {
		user: User;
	})[];
	technologies: (ProjectToTechnologies & {
		technology: Technology & {
			icon: Media;
		};
	})[];
};

export type ContactMessageWithRelations = ContactMessage & {
	user: User;
};
