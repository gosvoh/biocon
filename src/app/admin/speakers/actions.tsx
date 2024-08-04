"use server";

import { biocon } from "@/db/db";
import { Speakers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export async function remove(id: number) {
  try {
    const deleted = await biocon
      .delete(Speakers)
      .where(eq(Speakers.id, id))
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
  revalidatePath("/admin/speakers");
}

export async function add(formData: FormData) {
  const value = {
    name: formData.get("name") as string,
    university: formData.get("university") as string,
    description: formData.get("description") as string,
    thunder: formData.get("thunder") as string,
    hIndex: formData.has("hIndex")
      ? parseInt(formData.get("hIndex") as string)
      : undefined,
    nameUrl: formData.get("nameUrl") as string,
    speakerType: formData.get("speakerType") as string,
    thunderUrl: formData.get("thunderUrl") as string,
    universityUrl: formData.get("universityUrl") as string,
    country: formData.get("country") as string,
  };
  const img = formData.get("image") as File;

  console.log(typeof img);

  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  const uuid = randomUUID();
  try {
    await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while processing image", error });
  }

  const order = await biocon
    .select({ order: Speakers.order })
    .from(Speakers)
    .orderBy(desc(Speakers.order))
    .limit(1);

  await biocon.insert(Speakers).values({
    ...value,
    image: `${uuid}.webp`,
    order: (order[0]?.order ?? 0) + 1,
  });
  revalidatePath("/admin/speakers");
}

export async function update(id: number, formData: FormData) {
  const value = {
    name: formData.get("name") as string,
    university: formData.get("university") as string,
    description: formData.get("description") as string,
    thunder: formData.get("thunder") as string,
    hIndex: formData.has("hIndex")
      ? parseInt(formData.get("hIndex") as string)
      : undefined,
    nameUrl: formData.get("nameUrl") as string,
    speakerType: formData.get("speakerType") as string,
    thunderUrl: formData.get("thunderUrl") as string,
    universityUrl: formData.get("universityUrl") as string,
    country: formData.get("country") as string,
    order: formData.has("order")
      ? parseInt(formData.get("order") as string)
      : undefined,
  };
  const img = formData.get("image") as File;

  let newImagePath;
  if (img && typeof img !== "string") {
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

  if (value.order) {
    const current = await biocon
      .select()
      .from(Speakers)
      .where(eq(Speakers.id, id));
    const ret = await biocon
      .update(Speakers)
      .set({ order: current[0].order })
      .where(eq(Speakers.order, value.order));
  }

  await biocon
    .update(Speakers)
    .set({ ...value, image: newImagePath })
    .where(eq(Speakers.id, id));

  revalidatePath("/admin/speakers");
}
