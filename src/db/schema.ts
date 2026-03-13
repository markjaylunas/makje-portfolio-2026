import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// --- Better Auth Tables ---

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("emailVerified", { mode: "boolean" })
		.default(false)
		.notNull(),
	image: text("image"),
	createdAt: integer("createdAt", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.notNull(),
	updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
		.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	isAnonymous: integer("isAnonymous", { mode: "boolean" }).default(false),
	role: text("role"),
	banned: integer("banned", { mode: "boolean" }).default(false),
	banReason: text("banReason"),
	banExpires: integer("banExpires", { mode: "timestamp_ms" }),
});

export const session = sqliteTable(
	"session",
	{
		id: text("id").primaryKey(),
		expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
		token: text("token").notNull().unique(),
		createdAt: integer("createdAt", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ipAddress"),
		userAgent: text("userAgent"),
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		impersonatedBy: text("impersonatedBy"),
	},
	(table) => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
	"account",
	{
		id: text("id").primaryKey(),
		accountId: text("accountId").notNull(),
		providerId: text("providerId").notNull(),
		userId: text("userId")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("accessToken"),
		refreshToken: text("refreshToken"),
		idToken: text("idToken"),
		accessTokenExpiresAt: integer("accessTokenExpiresAt", {
			mode: "timestamp_ms",
		}),
		refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
			mode: "timestamp_ms",
		}),
		scope: text("scope"),
		password: text("password"),
		createdAt: integer("createdAt", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = sqliteTable(
	"verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: integer("expiresAt", { mode: "timestamp_ms" }).notNull(),
		createdAt: integer("createdAt", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull(),
		updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
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

const createdAt = integer({ mode: "timestamp" })
	.default(sql`(unixepoch())`)
	.notNull();
const updatedAt = integer({ mode: "timestamp" })
	.default(sql`(unixepoch())`)
	.$onUpdate(() => new Date())
	.notNull();

const timestamps = { createdAt, updatedAt };

// --- Core Tables ---

export const project = sqliteTable("project", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text().notNull(),
	description: text(),
	content: text(),
	coverImageId: text().references(() => media.id, {
		onDelete: "set null",
	}),
	repositoryUrl: text(),
	liveUrl: text(),
	likesCount: integer().default(0).notNull(),
	...timestamps,
});

export const technology = sqliteTable("technology", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text().notNull(),
	url: text().notNull(),
	iconId: text()
		.references(() => media.id, { onDelete: "set null" })
		.notNull(),
	brandColor: text().notNull(),
	...timestamps,
});

export const tag = sqliteTable("tag", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text().notNull().unique(),
	slug: text().unique(),
	createdAt,
});

export const experience = sqliteTable("experience", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text().notNull(),
	company: text().notNull(),
	logoId: text().references(() => media.id, { onDelete: "set null" }),
	startDate: integer({ mode: "timestamp" }).notNull(),
	endDate: integer({ mode: "timestamp" }),
	periodDisplay: text(),
	description: text(),
	responsibilities: text().notNull().default("[]"),
	...timestamps,
});

export const media = sqliteTable("media", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	keyDirectory: text().notNull(),
	keyPath: text().notNull(),
	url: text().notNull(),
	fileName: text().notNull(),
	contentType: text().notNull(),
	size: integer().notNull(),
	altText: text(),
	uploaderId: text().references(() => user.id),
	...timestamps,
});

// --- Interaction & Join Tables ---

export const projectLike = sqliteTable("project_like", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	userId: text()
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	createdAt,
});

export const projectToTechnologies = sqliteTable("project_to_technologies", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	technologyId: text()
		.notNull()
		.references(() => technology.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
});

export const projectToTags = sqliteTable("project_to_tags", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	tagId: text()
		.notNull()
		.references(() => tag.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
});

export const experienceToTechnologies = sqliteTable(
	"experience_to_technologies",
	{
		id: text()
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		experienceId: text()
			.notNull()
			.references(() => experience.id, { onDelete: "cascade" }),
		technologyId: text()
			.notNull()
			.references(() => technology.id, { onDelete: "cascade" }),
		order: integer().notNull().default(0),
	},
);

export const featuredTechnology = sqliteTable("featured_technology", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	technologyId: text()
		.notNull()
		.references(() => technology.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
	...timestamps,
});

export const featuredProject = sqliteTable("featured_project", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	projectId: text()
		.notNull()
		.references(() => project.id, { onDelete: "cascade" }),
	order: integer().notNull().default(0),
	...timestamps,
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
	featured: one(featuredProject, {
		fields: [project.id],
		references: [featuredProject.projectId],
	}),
}));

export const technologyRelations = relations(technology, ({ many, one }) => ({
	projects: many(projectToTechnologies),
	experiences: many(experienceToTechnologies),
	icon: one(media, {
		fields: [technology.iconId],
		references: [media.id],
	}),
	featured: one(featuredTechnology, {
		fields: [technology.id],
		references: [featuredTechnology.technologyId],
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

export const featuredTechnologyRelations = relations(
	featuredTechnology,
	({ one }) => ({
		technology: one(technology, {
			fields: [featuredTechnology.technologyId],
			references: [technology.id],
		}),
	}),
);

export const featuredProjectRelations = relations(
	featuredProject,
	({ one }) => ({
		project: one(project, {
			fields: [featuredProject.projectId],
			references: [project.id],
		}),
	}),
);
