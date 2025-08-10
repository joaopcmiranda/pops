CREATE TABLE IF NOT EXISTS "trip_collaborators" (
	"id" text PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"permissions" text NOT NULL,
	"invited_at" timestamp with time zone DEFAULT now(),
	"accepted_at" timestamp with time zone,
	"invited_by" text NOT NULL,
	"trip_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip_templates" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"destination" text NOT NULL,
	"country" text NOT NULL,
	"type" text NOT NULL,
	"duration" numeric(5, 0) NOT NULL,
	"tags" text NOT NULL,
	"itinerary_template" text NOT NULL,
	"content_template" text NOT NULL,
	"created_by" text NOT NULL,
	"is_public" boolean DEFAULT false,
	"usage_count" numeric(10, 0) DEFAULT '0',
	"rating" numeric(3, 2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trips" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"destination" text NOT NULL,
	"country" text NOT NULL,
	"type" text NOT NULL,
	"status" text DEFAULT 'planning' NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"budget" text,
	"settings" text NOT NULL,
	"cover_image" text,
	"tags" text,
	"is_template" boolean DEFAULT false,
	"template_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "wishlist_items" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"category" text NOT NULL,
	"status" text DEFAULT 'wishlist' NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"tags" text,
	"location" text,
	"estimated_cost" numeric(10, 2),
	"notes" text,
	"image_url" text,
	"website_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"trip_id" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_collaborators" ADD CONSTRAINT "trip_collaborators_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "wishlist_items" ADD CONSTRAINT "wishlist_items_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
