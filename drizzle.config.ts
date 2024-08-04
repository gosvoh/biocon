import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/db",
  schema: "./src/db/schema.ts",
  dbCredentials: { url: process.env.DATABASE_URL! },
  verbose: true,
  strict: true,
  migrations: {
    table: "migrations",
    schema: "public",
  },
});
