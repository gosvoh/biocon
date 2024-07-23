CREATE TABLE IF NOT EXISTS "Contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"image" text NOT NULL
);
