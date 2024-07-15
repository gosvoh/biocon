"use server";

import { biocon } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function add() {
  await biocon.registrations.create({
    data: {
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
    },
  });
  revalidatePath("/admin");
}

export async function remove(id: number) {
  await biocon.registrations.delete({ where: { id } });
  revalidatePath("/admin");
}
