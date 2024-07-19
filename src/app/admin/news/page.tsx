import NewsTable from "./news.table";
import { biocon } from "@/db/db";
import { News } from "@/db/schema";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  let data: (typeof News.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(News);
  } catch (e) {
    console.error(e);
  }

  return <NewsTable data={data} />;
}
