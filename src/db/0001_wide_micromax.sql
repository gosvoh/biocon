ALTER TABLE "Organizers" ADD COLUMN "order" serial NOT NULL;--> statement-breakpoint
ALTER TABLE "Speakers2023" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "Speakers" DROP COLUMN IF EXISTS "topic";