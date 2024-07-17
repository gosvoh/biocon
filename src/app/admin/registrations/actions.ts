"use server";

import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function add(
  user: Omit<typeof Registrations.$inferInsert, "id" | "registrationDate">,
) {
  await biocon.insert(Registrations).values(user);
  revalidatePath("/admin");
}

export async function remove(id: number) {
  await biocon.delete(Registrations).where(eq(Registrations.id, id));
  revalidatePath("/admin");
}
