CREATE TABLE `content_items` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`slug` text NOT NULL,
	`tags` text,
	`created_at` integer,
	`updated_at` integer,
	`trip_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `content_items_slug_unique` ON `content_items` (`slug`);--> statement-breakpoint
CREATE TABLE `itinerary_item_attendees` (
	`itinerary_item_id` text NOT NULL,
	`person_id` text NOT NULL,
	FOREIGN KEY (`itinerary_item_id`) REFERENCES `itinerary_items`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`person_id`) REFERENCES `people`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `itinerary_items` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`type` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`is_all_day` integer DEFAULT false,
	`status` text DEFAULT 'planned' NOT NULL,
	`priority` text DEFAULT 'medium' NOT NULL,
	`tags` text,
	`notes` text,
	`type_data` text,
	`created_at` integer,
	`updated_at` integer,
	`trip_id` text NOT NULL,
	`user_id` text NOT NULL,
	`location_id` text,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`location_id`) REFERENCES `locations`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `locations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`address` text,
	`city` text NOT NULL,
	`state` text,
	`latitude` real,
	`longitude` real,
	`type` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `people` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`relationship_type` text NOT NULL,
	`phone` text,
	`email` text,
	`whatsapp` text,
	`notes` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `trip_collaborators` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`permissions` text NOT NULL,
	`invited_at` integer,
	`accepted_at` integer,
	`invited_by` text NOT NULL,
	`trip_id` text NOT NULL,
	`user_id` text NOT NULL,
	FOREIGN KEY (`trip_id`) REFERENCES `trips`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `trip_templates` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`destination` text NOT NULL,
	`country` text NOT NULL,
	`type` text NOT NULL,
	`duration` integer NOT NULL,
	`tags` text NOT NULL,
	`itinerary_template` text NOT NULL,
	`content_template` text NOT NULL,
	`created_by` text NOT NULL,
	`is_public` integer DEFAULT false,
	`usage_count` integer DEFAULT 0,
	`rating` real,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE TABLE `trips` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`destination` text NOT NULL,
	`country` text NOT NULL,
	`type` text NOT NULL,
	`status` text DEFAULT 'planning' NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer NOT NULL,
	`budget` text,
	`settings` text NOT NULL,
	`cover_image` text,
	`tags` text,
	`is_template` integer DEFAULT false,
	`template_id` text,
	`created_at` integer,
	`updated_at` integer,
	`user_id` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`avatar` text,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);