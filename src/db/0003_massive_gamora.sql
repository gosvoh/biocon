CREATE TABLE IF NOT EXISTS "Cities" (
	"geoname_id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"ascii_name" text NOT NULL,
	"alternate_names" text NOT NULL,
	"feature_class" text NOT NULL,
	"feature_code" text NOT NULL,
	"country_code" text NOT NULL,
	"cou_name_en" text NOT NULL,
	"country_code_2" text NOT NULL,
	"admin1_code" text NOT NULL,
	"admin2_code" text NOT NULL,
	"admin3_code" text NOT NULL,
	"admin4_code" text NOT NULL,
	"population" integer NOT NULL,
	"elevation" integer NOT NULL,
	"dem" integer NOT NULL,
	"timezone" text NOT NULL,
	"modification_date" timestamp(3) DEFAULT now() NOT NULL,
	"label_en" text NOT NULL,
	"coordinates" text NOT NULL
);