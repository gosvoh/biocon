import Speakers2024Table from "./speakers.table";
import { biocon } from "@/db/db";
import { Speakers2024 } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Speakers2024Page() {
  let data: (typeof Speakers2024.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2024);
  } catch (e) {
    console.error(e);
  }

  return <Speakers2024Table data={data} />;
}
