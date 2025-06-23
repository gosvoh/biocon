import MediaAboutUsTable from "./mediaAboutUs.table";
import { biocon } from "@/db/db";
import { MediaAboutUs2024 } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let data: (typeof MediaAboutUs2024.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(MediaAboutUs2024);
  } catch (e) {
    console.error(e);
  }

  return <MediaAboutUsTable data={data} />;
}
