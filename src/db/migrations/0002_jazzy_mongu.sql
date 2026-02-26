CREATE TABLE "experience" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"company" text NOT NULL,
	"period" text NOT NULL,
	"description" text,
	"responsibilities" text[] DEFAULT '{}'::text[] NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experience_to_technologies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"experienceId" uuid NOT NULL,
	"technologyId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "experience_to_technologies" ADD CONSTRAINT "experience_to_technologies_experienceId_experience_id_fk" FOREIGN KEY ("experienceId") REFERENCES "public"."experience"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_to_technologies" ADD CONSTRAINT "experience_to_technologies_technologyId_technology_id_fk" FOREIGN KEY ("technologyId") REFERENCES "public"."technology"("id") ON DELETE cascade ON UPDATE no action;