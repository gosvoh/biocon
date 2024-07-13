import { biocon } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqToken = await req.json();
    if (!reqToken.token)
      return NextResponse.json({ error: "No token provided" }, { status: 400 });
    const token = await biocon.auth.findUnique({
      where: { token: reqToken.token },
    });
    if (!token)
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    return NextResponse.json({ message: "Ok" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
