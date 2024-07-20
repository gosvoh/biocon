"use server";

import { biocon } from "@/db/db";
import { Organizers } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export async function remove(id: number) {
  try {
    const deleted = await biocon
      .delete(Organizers)
      .where(eq(Organizers.id, id))
      .returning();

    if (deleted.length === 0)
      return Promise.reject({ message: "Organizer not found" });

    if (deleted[0].image) {
      fs.unlinkSync(`./uploads/${deleted[0].image}`);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while deleting organizer", error });
  }
  revalidatePath("/admin/organizers");
}

export async function add(formData: FormData) {
  const name = formData.get("name") as string;
  const img = formData.get("image") as File;
  const email = formData.get("email") as string;
  const position = formData.get("position") as string;

  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  const uuid = randomUUID();
  try {
    await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
  } catch (error) {
    console.error(error);
    return Promise.reject({ message: "Error while processing image", error });
  }

  const order = await biocon
    .select({ order: Organizers.order })
    .from(Organizers)
    .orderBy(desc(Organizers.order))
    .limit(1);

  await biocon.insert(Organizers).values({
    image: `${uuid}.webp`,
    name: name,
    email: email,
    position: position,
    order: (order[0]?.order ?? 0) + 1,
  });
  revalidatePath("/admin/organizers");
}

export async function update(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const img = formData.get("image") as File | null;
  const email = formData.get("email") as string;
  const position = formData.get("position") as string;
  const order = formData.get("order") as number | null;

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

  if (order) {
    const current = await biocon
      .select()
      .from(Organizers)
      .where(eq(Organizers.id, id));
    const ret = await biocon
      .update(Organizers)
      .set({ order: current[0].order })
      .where(eq(Organizers.order, order));
  }

  await biocon
    .update(Organizers)
    .set({ name, image: newImagePath, email, position })
    .where(eq(Organizers.id, id));

  revalidatePath("/admin/organizers");
}
