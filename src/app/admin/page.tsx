import RegistrationsTable from "./registrations.table";
import { biocon, pool } from "@/db/db";
import { Registrations } from "@/db/schema";

export default async function Admin() {
  let data: (typeof Registrations.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Registrations);
  } catch (e) {
    console.error(e);
  }

  return <RegistrationsTable data={data} />;
}
