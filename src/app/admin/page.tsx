import { biocon } from "@/lib/prisma";
import type { Registrations } from ".prisma/client/biocon";
import RegistrationsTable from "./registrations.table";

export default async function Admin() {
  let data: Registrations[] = [];

  try {
    data = await biocon.registrations.findMany();
  } catch (e) {
    console.error(e);
  }

  return <RegistrationsTable data={data} />;
}
