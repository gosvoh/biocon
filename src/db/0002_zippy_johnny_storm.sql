CREATE TABLE IF NOT EXISTS "News" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"href" text NOT NULL,
	"image" text NOT NULL
);
