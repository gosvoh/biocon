import { pgTable, timestamp, text, integer, serial } from "drizzle-orm/pg-core";

export const Organizers = pgTable("Organizers", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  image: text("image").notNull(),
  email: text("email").notNull(),
  order: serial("order").notNull(),
});

export const Speakers2023 = pgTable("Speakers2023", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  university: text("university").notNull(),
  image: text("image").notNull(),
  type: text("type").notNull(),
});

export const Speakers = pgTable("Speakers", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  university: text("university").notNull(),
  description: text("description"),
  thunder: text("thunder"),
  hIndex: integer("hIndex"),
  nameUrl: text("nameUrl").notNull(),
  speakerType: text("speakerType").notNull(),
  thunderUrl: text("thunderUrl"),
  universityUrl: text("universityUrl").notNull(),
  country: text("country").notNull(),
  order: serial("order").notNull(),
});

export const Registrations = pgTable("Registrations", {
  id: serial("id").primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobile: text("mobile").notNull(),
  country: text("country").notNull(),
  city: text("city").notNull(),
  affiliation: text("affiliation").notNull(),
  role: text("role").notNull(),
  participationType: text("participationType").notNull(),
  motivationLetter: text("motivationLetter"),
  researchInterests: text("researchInterests"),
  tentativeTitle: text("tentativeTitle"),
  resume: text("resume"),
  scienceProfile: text("scienceProfile"),
  video: text("video"),
  registrationDate: timestamp("registrationDate", {
    precision: 3,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  howToKnow: text("howToKnow").notNull(),
  clothingSize: text("clothingSize").notNull(),
});

export const News = pgTable("News", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  image: text("image").notNull(),
});

export const Cities = pgTable("Cities", {
  geoname_id: integer("geoname_id").primaryKey().notNull(),
  name: text("name").notNull(),
  ascii_name: text("ascii_name").notNull(),
  alternate_names: text("alternate_names").notNull(),
  feature_class: text("feature_class").notNull(),
  feature_code: text("feature_code").notNull(),
  country_code: text("country_code").notNull(),
  cou_name_en: text("cou_name_en").notNull(),
  country_code_2: text("country_code_2").notNull(),
  admin1_code: text("admin1_code").notNull(),
  admin2_code: text("admin2_code").notNull(),
  admin3_code: text("admin3_code").notNull(),
  admin4_code: text("admin4_code").notNull(),
  population: integer("population").notNull(),
  elevation: integer("elevation").notNull(),
  dem: integer("dem").notNull(),
  timezone: text("timezone").notNull(),
  modification_date: timestamp("modification_date", {
    precision: 3,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  label_en: text("label_en").notNull(),
  coordinates: text("coordinates").notNull(),
});
