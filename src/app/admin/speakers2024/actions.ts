"use server";

import { biocon } from "@/db/db";
import { Speakers2024 } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export async function remove(id: number) {
  try {
    const deleted = await biocon
      .delete(Speakers2024)
      .where(eq(Speakers2024.id, id))
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
  revalidatePath("/admin/speakers2024");
  revalidatePath("/biocon2024");
}

export async function add(formData: FormData) {
  const name = formData.get("name") as string;
  const university = formData.get("university") as string;
  const img = formData.get("image") as File;
  const type = formData.get("type") as string;

  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  const uuid = randomUUID();
  try {
    await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while processing image", error });
  }

  await biocon.insert(Speakers2024).values({
    name: name,
    university: university,
    image: `${uuid}.webp`,
    type: type,
  });
  revalidatePath("/admin/speakers2024");
  revalidatePath("/biocon2024");
}

export async function update(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const university = formData.get("university") as string;
  const img = formData.get("image") as File | null;
  const type = formData.get("type") as string;

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
    .update(Speakers2024)
    .set({ name, university, image: newImagePath, type })
    .where(eq(Speakers2024.id, id));

  revalidatePath("/admin/speakers2024");
  revalidatePath("/biocon2024");
}
