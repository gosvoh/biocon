import { biocon } from "@/db/db";
import { News } from "@/db/schema";
import { EditArticle } from "@/app/admin/editArticle/[id]/editArticle.component";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export default async function NewsPage({ params }: { params: { id: string } }) {
  let data: (typeof News.$inferSelect)[] = [];

  try {
    data = await biocon
      .select()
      .from(News)
      .where(eq(News.id, parseInt(params.id)));
  } catch (e) {
    console.error(e);
  }

  return (
    <EditArticle
      initialData={String(data[0].article)}
      id={parseInt(params.id)}
    />
  );
}
