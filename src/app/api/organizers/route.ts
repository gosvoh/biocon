import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await prisma.organizers.findMany());
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const name = data.get("name") as string | null;
  const email = data.get("email") as string | null;
  const position = data.get("position") as string | null;
  const img = data.get("image") as File | null;

  if (!name || !email || !position || !img)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
  const uuid = randomUUID();
  try {
    await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error while processing image", error },
      { status: 500 }
    );
  }

  await prisma.organizers.create({
    data: {
      name,
      email,
      position,
      image: uuid,
    },
  });

  return NextResponse.json({ message: "Organizer created" });
}
