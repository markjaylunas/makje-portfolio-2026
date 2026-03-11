PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_experience` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`logo_id` text,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`period_display` text,
	`description` text,
	`responsibilities` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_experience`("id", "title", "company", "logo_id", "start_date", "end_date", "period_display", "description", "responsibilities", "created_at", "updated_at") SELECT "id", "title", "company", "logo_id", "start_date", "end_date", "period_display", "description", "responsibilities", "created_at", "updated_at" FROM `experience`;--> statement-breakpoint
DROP TABLE `experience`;--> statement-breakpoint
ALTER TABLE `__new_experience` RENAME TO `experience`;--> statement-breakpoint
PRAGMA foreign_keys=ON;