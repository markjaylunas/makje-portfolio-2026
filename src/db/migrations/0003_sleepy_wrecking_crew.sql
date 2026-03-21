PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tag` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tag`("id", "name", "slug", "created_at") SELECT "id", "name", "slug", "created_at" FROM `tag`;--> statement-breakpoint
DROP TABLE `tag`;--> statement-breakpoint
ALTER TABLE `__new_tag` RENAME TO `tag`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `tag_name_unique` ON `tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `tag_slug_unique` ON `tag` (`slug`);