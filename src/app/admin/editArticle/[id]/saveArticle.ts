"use server";

import { biocon } from "@/db/db";
import { News } from "@/db/schema";
import { eq } from "drizzle-orm";
import { OutputData } from "@editorjs/editorjs";

export const update = async (data: OutputData, id: number) => {
  try {
    await biocon
      .update(News)
      .set({ article: JSON.stringify(data) })
      .where(eq(News.id, id));
  } catch (err) {
    console.error(err);
  }
};
