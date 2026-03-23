PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_project` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`content` text,
	`cover_image_id` text,
	`desktop_image_id` text,
	`mobile_image_id` text,
	`repository_url` text,
	`live_url` text,
	`likes_count` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`cover_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`desktop_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`mobile_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_project`("id", "name", "description", "content", "cover_image_id", "desktop_image_id", "mobile_image_id", "repository_url", "live_url", "likes_count", "created_at", "updated_at") SELECT "id", "name", "description", "content", "cover_image_id", "desktop_image_id", "mobile_image_id", "repository_url", "live_url", "likes_count", "created_at", "updated_at" FROM `project`;--> statement-breakpoint
DROP TABLE `project`;--> statement-breakpoint
ALTER TABLE `__new_project` RENAME TO `project`;--> statement-breakpoint
PRAGMA foreign_keys=ON;