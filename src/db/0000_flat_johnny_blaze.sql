CREATE TABLE IF NOT EXISTS "Organizers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"position" text NOT NULL,
	"image" text NOT NULL,
	"email" text NOT NULL,
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Registrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"mobile" text NOT NULL,
	"country" text NOT NULL,
	"city" text NOT NULL,
	"affiliation" text NOT NULL,
	"role" text NOT NULL,
	"participationType" text NOT NULL,
	"motivationLetter" text,
	"researchInterests" text,
	"tentativeTitle" text,
	"resume" text,
	"scienceProfile" text,
	"video" text,
	"registrationDate" timestamp(3) DEFAULT now() NOT NULL,
	"howToKnow" text NOT NULL,
	"clothingSize" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Speakers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"university" text NOT NULL,
	"topic" text,
	"description" text,
	"thunder" text,
	"hIndex" integer,
	"nameUrl" text NOT NULL,
	"speakerType" text NOT NULL,
	"thunderUrl" text,
	"universityUrl" text NOT NULL,
	"country" text NOT NULL,
	"order" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Speakers2023" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"university" text NOT NULL,
	"image" text NOT NULL
);
