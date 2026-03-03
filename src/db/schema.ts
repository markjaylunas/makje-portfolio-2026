import { relations, sql } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

// --- Better Auth Tables ---

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	// Anonymous plugin field
	isAnonymous: boolean(),
	// Admin plugin fields
	role: text("role").default("user").notNull(),
	banned: boolean("banned").default(false),
	banReason: text("ban_reason"),
	banExpires: timestamp("ban_expires"),

	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const session = pgTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		// Admin plugin field
		impersonatedBy: text("impersonated_by"),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	likes: many(projectLike),
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id],
	}),
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id],
	}),
}));

// --- Helper Columns ---

const createdAt = timestamp().defaultNow().notNull();
const updatedAt = timestamp()
	.defaultNow()
	.$onUpdate(() => new Date())
	.notNull();

const timestamps = { createdAt, updatedAt };

// --- Core Tables ---

export const project = pgTable("project", {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	description: text(),
	content: text(),
	coverImageId: uuid().references(() => media.id, {
		onDelete: "set null",
	}),
	repositoryUrl: text(),
	liveUrl: text(),
	likesCount: integer().default(0).notNull(),
	...timestamps,
});

export const technology = pgTable("technology", {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull(),
	url: text(),
	iconId: uuid().references(() => media.id, { onDelete: "set null" }),
	brandColor: text(),
	...timestamps,
});

export const tag = pgTable("tag", {
	id: uuid().defaultRandom().primaryKey(),
	name: text().notNull().unique(),
	slug: text().unique(),
	createdAt,
});

export const experience = pgTable("experience", {
	id: uuid().defaultRandom().primaryKey(),
	title: text().notNull(),
	company: text().notNull(),
	logoId: uuid().references(() => media.id, { onDelete: "set null" }),
	period: text().notNull(),
	description: text(),
	// Responsibilities stored as a JSON string array for easy mapping in the frontend
	responsibilities: text().array().notNull().default(sql`'{}'::text[]`),
	...timestamps,
});

export const media = pgTable("media", {
	id: uuid().defaultRandom().primaryKey(),
	storagePath: text().notNull().unique(),
	url: text().notNull(),
	fileName: text().notNull(),
	contentType: text(),
	size: integer(),
	altText: text(),
	uploaderId: text().references(() => user.id),
	...timestamps,
});

// --- Interaction & Join Tables ---

export const projectLike = pgTable("project_like", {
	id: uuid().defaultRandom().primaryKey(),
	projectId: uuid()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt,
});

export const projectToTechnologies = pgTable("project_to_technologies", {
	id: uuid().defaultRandom().primaryKey(),
	projectId: uuid()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	technologyId: uuid()
		.notNull()
		.references(() => technology.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
});

export const projectToTags = pgTable("project_to_tags", {
	id: uuid().defaultRandom().primaryKey(),
	projectId: uuid()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	tagId: uuid()
		.notNull()
		.references(() => tag.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
});

export const experienceToTechnologies = pgTable("experience_to_technologies", {
	id: uuid().defaultRandom().primaryKey(),
	experienceId: uuid()
		.notNull()
		.references(() => experience.id, { onDelete: "cascade" }),
	technologyId: uuid()
		.notNull()
		.references(() => technology.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
});

// --- Relations ---

export const projectRelations = relations(project, ({ many, one }) => ({
	likes: many(projectLike),
	technologies: many(projectToTechnologies),
	tags: many(projectToTags),
	coverImage: one(media, {
		fields: [project.coverImageId],
		references: [media.id],
	}),
}));

export const technologyRelations = relations(technology, ({ many, one }) => ({
	projects: many(projectToTechnologies),
	experiences: many(experienceToTechnologies),
	icon: one(media, {
		fields: [technology.iconId],
		references: [media.id],
	}),
}));

export const tagRelations = relations(tag, ({ many }) => ({
	projects: many(projectToTags),
}));

export const experienceRelations = relations(experience, ({ many, one }) => ({
	technologies: many(experienceToTechnologies),
	logo: one(media, {
		fields: [experience.logoId],
		references: [media.id],
	}),
}));

export const projectLikeRelations = relations(projectLike, ({ one }) => ({
	user: one(user, {
		fields: [projectLike.userId],
		references: [user.id],
	}),
	project: one(project, {
		fields: [projectLike.projectId],
		references: [project.id],
	}),
}));

export const projectToTechnologiesRelations = relations(
	projectToTechnologies,
	({ one }) => ({
		project: one(project, {
			fields: [projectToTechnologies.projectId],
			references: [project.id],
		}),
		technology: one(technology, {
			fields: [projectToTechnologies.technologyId],
			references: [technology.id],
		}),
	}),
);

export const projectToTagsRelations = relations(projectToTags, ({ one }) => ({
	project: one(project, {
		fields: [projectToTags.projectId],
		references: [project.id],
	}),
	tag: one(tag, { fields: [projectToTags.tagId], references: [tag.id] }),
}));

export const experienceToTechnologiesRelations = relations(
	experienceToTechnologies,
	({ one }) => ({
		experience: one(experience, {
			fields: [experienceToTechnologies.experienceId],
			references: [experience.id],
		}),
		technology: one(technology, {
			fields: [experienceToTechnologies.technologyId],
			references: [technology.id],
		}),
	}),
);

export const mediaRelations = relations(media, ({ one, many }) => ({
	uploader: one(user, {
		fields: [media.uploaderId],
		references: [user.id],
	}),
	projects: many(project),
	technologies: many(technology),
	experiences: many(experience),
}));
