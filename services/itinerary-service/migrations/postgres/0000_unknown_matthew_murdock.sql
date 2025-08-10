CREATE TABLE IF NOT EXISTS "content_items" (
	"id" text PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"slug" text NOT NULL,
	"tags" text,
	"trip_id" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	CONSTRAINT "content_items_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "itinerary_item_attendees" (
	"itinerary_item_id" text NOT NULL,
	"person_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "itinerary_items" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone,
	"is_all_day" boolean DEFAULT false,
	"status" text DEFAULT 'planned' NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"tags" text,
	"notes" text,
	"type_data" text,
	"trip_id" text NOT NULL,
	"user_id" text NOT NULL,
	"location_id" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
