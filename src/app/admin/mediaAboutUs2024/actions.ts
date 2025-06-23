"use server";

import { biocon } from "@/db/db";
import { MediaAboutUs2024 } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export async function remove(id: number) {
  try {
    const deleted = await biocon
      .delete(MediaAboutUs2024)
      .where(eq(MediaAboutUs2024.id, id))
      .returning();

    if (deleted.length === 0)
      return Promise.reject({ message: "Speaker not found" });

    if (deleted[0].image) {
      fs.unlinkSync(`./uploads/${deleted[0].image}`);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while deleting speaker", error });
  }
  revalidatePath("/admin/mediaAboutUs2024");
}

export async function add(formData: FormData) {
  const title = formData.get("title") as string;
  const href = formData.get("href") as string;
  const img = formData.get("image") as File;

  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  const uuid = randomUUID();
  try {
    await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while processing image", error });
  }

  await biocon
    .insert(MediaAboutUs2024)
    .values({ title, href, image: `${uuid}.webp` });
  revalidatePath("/admin/mediaAboutUs2024");
}

export async function update(id: number, formData: FormData) {
  const title = formData.get("title") as string;
  const href = formData.get("href") as string;
  const img = formData.get("image") as File | null;

  let newImagePath;
  if (img) {
    if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
    const uuid = randomUUID();
    try {
      await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
    } catch (error) {
      console.error(error);
      return Promise.reject({ message: "Error while processing image", error });
    }
    newImagePath = `${uuid}.webp`;
  }

  await biocon
    .update(MediaAboutUs2024)
    .set({ title, href, image: newImagePath })
    .where(eq(MediaAboutUs2024.id, id));

  revalidatePath("/admin/mediaAboutUs2024");
}
