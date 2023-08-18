import { world } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

export async function GET() {
  const country = await world.countries.findMany({
    select: { id: true, name: true },
  });

  return NextResponse.json(country);
}
