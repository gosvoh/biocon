import Speakers2023Table from "./speakers.table";
import { biocon } from "@/db/db";
import { Speakers2023 } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function Speakers2023Page() {
  let data: (typeof Speakers2023.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2023);
  } catch (e) {
    console.error(e);
  }

  return <Speakers2023Table data={data} />;
}
