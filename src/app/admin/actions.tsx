"use server";

import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function add() {
  await biocon.insert(Registrations).values({
    name: "John Doe",
    email: "a@a.com",
    affiliation: "ITMO",
    city: "Saint-Petersburg",
    country: "Russia",
    clothingSize: "M",
    howToKnow: "Friend",
    mobile: "+79999999999",
    participationType: "Listener",
    role: "Student",
  });
  revalidatePath("/admin");
}

export async function remove(id: number) {
  await biocon.delete(Registrations).where(eq(Registrations.id, id));
  revalidatePath("/admin");
}
