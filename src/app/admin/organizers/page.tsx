import OrganizersTable from "./organizers.table";
import { biocon } from "@/db/db";
import { Organizers } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function OrganizersPage() {
  let data: (typeof Organizers.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Organizers);
  } catch (e) {
    console.error(e);
  }

  return <OrganizersTable data={data} />;
}
