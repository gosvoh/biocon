import { News } from "@/db/schema";
import { biocon } from "@/db/db";
import { eq } from "drizzle-orm";
import { EditorJSElement } from "@/components/EditorJS";

export default async function ShowArticle({
  params,
}: {
  params: { id: string };
}) {
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
    <EditorJSElement
      className={"p-6"}
      initialData={String(data[0].article)}
      viewOnly={true}
    />
  );
}
