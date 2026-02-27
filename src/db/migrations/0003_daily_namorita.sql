ALTER TABLE "experience_to_technologies" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "project_to_tags" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "project_to_technologies" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;