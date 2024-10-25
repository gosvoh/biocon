import RegistrationsTable from "./registrations.table";
import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Admin() {
  let data: (typeof Registrations.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Registrations);
  } catch (e) {
    console.error(e);
  }

  return <RegistrationsTable data={data.filter((el) => !el.deletedAt)} />;
}
