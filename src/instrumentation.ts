export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { drizzle } = await import("drizzle-orm/postgres-js");
    const { migrate } = await import("drizzle-orm/postgres-js/migrator");
    const postgres = (await import("postgres")).default;

    const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

    await migrate(drizzle(migrationClient), {
      migrationsFolder: "./src/db",
    })
      .then(() => console.log("Migrated"))
      .catch((e) => console.error("Migration failed", e));
  }
}
