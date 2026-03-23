ALTER TABLE `project` ADD `cover_image_second_id` text REFERENCES media(id);--> statement-breakpoint
ALTER TABLE `project` ADD `cover_image_third_id` text REFERENCES media(id);