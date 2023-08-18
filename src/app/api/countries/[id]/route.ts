import { world } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const cities = await world.cities.findMany({
    where: { country_id: params.id },
    select: { id: true, name: true },
  });

  return NextResponse.json(cities);
}
