import { NextRequest, NextResponse } from "next/server";
import { biocon } from "@/db/db";
import { Registrations } from "@/db/schema";

export async function GET(req: NextRequest, res: NextResponse) {
  if (
    !process.env.KEY ||
    req.nextUrl.searchParams.get("key") != process.env.KEY
  ) {
    return NextResponse.json({ error: "Invalid access key" }, { status: 401 });
  }

  let data: (typeof Registrations.$inferInsert)[] = [];
  try {
    data = await biocon.select().from(Registrations);
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}
