import { biocon } from "@/db/db";
import { Speakers2023 } from "@/db/schema";
import Biocon2023Page from "@/app/biocon2023/biocon2023.page";

export const dynamic = "force-dynamic";

export default async function PreviousBioconLoader() {
  let data: (typeof Speakers2023.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2023);
  } catch (e) {
    console.error(e);
  }

  return <Biocon2023Page data={data} />;
}
