import MediaAboutUsTable from "./mediaAboutUs.table";
import { biocon } from "@/db/db";
import { MediaAboutUs } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let data: (typeof MediaAboutUs.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(MediaAboutUs);
  } catch (e) {
    console.error(e);
  }

  return <MediaAboutUsTable data={data} />;
}
