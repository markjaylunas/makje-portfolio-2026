import { queryOptions } from "@tanstack/react-query";
import { queryKey } from "@/lib/query-key";
import type { FeaturedProjectWithRelations } from "@/lib/types";

export const getFeaturedProjectListOptions = () =>
	queryOptions({
		queryKey: queryKey.featuredProject.list(),
		queryFn: () => mockFeaturedProjectList,
	});

const mockFeaturedProjectList: FeaturedProjectWithRelations[] = [
	{
		id: "1",
		createdAt: new Date("2025-01-01"),
		updatedAt: new Date("2025-01-01"),
		projectId: "1",
		order: 1,
		project: {
			likes: [
				{
					user: {
						id: "1",
						name: "User 1",
						email: "[EMAIL_ADDRESS]",
						createdAt: new Date("2025-01-01"),
						updatedAt: new Date("2025-01-01"),
						banExpires: null,
						banned: false,
						banReason: null,
						emailVerified: true,
						image: "https://example.com/1",
						isAnonymous: false,
						role: "user",
					},
					createdAt: new Date("2025-01-01"),
					projectId: "1",
					userId: "1",
					id: "1",
				},
			],
			tags: [
				{
					id: "1",
					name: "Tag 1",
					createdAt: new Date("2025-01-01"),
					slug: "tag-1",
				},
				{
					id: "2",
					name: "Tag 2",
					createdAt: new Date("2025-01-01"),
					slug: "tag-2",
				},
			],
			coverImage: {
				id: "1",
				keyDirectory: "project",
				keyPath: "project/1",
				url: "https://example.com/1",
				fileName: "project-1.jpg",
				contentType: "image/jpeg",
				size: 1024,
				altText: "Project 1",
				createdAt: new Date("2025-01-01"),
				updatedAt: new Date("2025-01-01"),
				uploaderId: "1",
			},
			technologies: [
				{
					id: "1",
					createdAt: new Date("2025-01-01"),
					updatedAt: new Date("2025-01-01"),
					order: 1,
					technologyId: "1",
					technology: {
						id: "1",
						name: "Technology 1",
						brandColor: "#000000",
						createdAt: new Date("2025-01-01"),
						updatedAt: new Date("2025-01-01"),
						iconId: "1",
						url: "https://example.com/1",
						icon: {
							id: "1",
							keyDirectory: "technology",
							keyPath: "technology/1",
							url: "https://example.com/1",
							fileName: "technology-1.jpg",
							contentType: "image/jpeg",
							size: 1024,
							altText: "Technology 1",
							createdAt: new Date("2025-01-01"),
							updatedAt: new Date("2025-01-01"),
							uploaderId: "1",
						},
					},
				},
			],
			id: "1",
			name: "Project 1",
			description: "Description 1",
			content: "Content 1",
			coverImageId: "1",
			repositoryUrl: "https://github.com/1",
			liveUrl: "https://1.com",
			likesCount: 1,
			createdAt: new Date("2025-01-01"),
			updatedAt: new Date("2025-01-01"),
		},
	},
];
