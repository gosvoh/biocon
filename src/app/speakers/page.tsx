import { biocon } from "@/db/db";
import { Speakers } from "@/db/schema";
import SpeakersComponent from "@/app/speakers/speakers.component";

export const dynamic = "force-dynamic";

export default async function SpeakersPage() {
  let data: (typeof Speakers.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers);
  } catch (e) {
    console.error(e);
  }

  return <SpeakersComponent speakers={data} />;
}
