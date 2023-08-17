import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email)
    return NextResponse.json({ message: "No email provided" }, { status: 400 });

  const registraion = await prisma.registrations.findUnique({
    where: { email },
  });

  if (!registraion) return NextResponse.json({ exists: false });
  else return NextResponse.json({ exists: true });
}
