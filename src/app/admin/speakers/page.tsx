import SpeakersTable from "./speakers.table";
import { biocon } from "@/db/db";
import { Cities, Speakers } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  let data: (typeof Speakers.$inferSelect)[] = [];
  let countries: string[] = [];

  try {
    data = await biocon.select().from(Speakers);
  } catch (e) {
    console.error(e);
  }

  try {
    countries = (
      await biocon.selectDistinct({ country: Cities.cou_name_en }).from(Cities)
    ).map((c) => c.country);
  } catch (e) {
    console.error(e);
  }

  return <SpeakersTable countries={countries} data={data} />;
}
