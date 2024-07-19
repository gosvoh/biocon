import { biocon } from "@/db/db";
import { Speakers2023 } from "@/db/schema";
import MainPage from "@/app/biocon2023/MainPage";

export const dynamic = "force-dynamic";

export default async function PreviousBiocon() {
  let data: (typeof Speakers2023.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2023);
  } catch (e) {
    console.error(e);
  }

  return <MainPage data={data} />;
}
