"use server";

import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";

export async function register(entry: typeof Registrations.$inferInsert) {
  try {
    await biocon.insert(Registrations).values(entry);
  } catch (e) {
    console.error(e);
    return Promise.reject(e);
  }
}
