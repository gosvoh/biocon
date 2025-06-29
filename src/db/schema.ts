import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { number } from "prop-types";

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

export const Speakers2024 = pgTable("Speakers2024", {
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
  deletedAt: text("deletedAt"),
});

export const News = pgTable("News", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  image: text("image").notNull(),
  article: text("article"),
  show_article: boolean("show_article").default(false),
});

export const MediaAboutUs = pgTable("MediaAboutUs", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  image: text("image").notNull(),
});

export const MediaAboutUs2024 = pgTable("MediaAboutUs2024", {
  id: serial("id").primaryKey().notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  image: text("image").notNull(),
});

export const Cities = pgTable("Cities", {
  geoname_id: integer("geoname_id").primaryKey().notNull(),
  ascii_name: text("name").notNull(),
  cou_name_en: text("cou_name_en").notNull(),
  country_code: text("country_code").notNull(),
});
