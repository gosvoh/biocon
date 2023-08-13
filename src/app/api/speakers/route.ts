import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await prisma.speakers.findMany());
}

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const name = data.get("name") as string | null;
  const university = data.get("university") as string | null;
  const topic = data.get("topic") as string | null;
  const description = data.get("description") as string | null;
  const thunder = data.get("thunder") as string | null;
  const hIndex = data.get("hIndex") as string | null;
  const img = data.get("image") as File | null;

  if (!name || !university || !topic || !hIndex || !img || !thunder)
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

  await prisma.speakers.create({
    data: {
      name,
      university,
      topic,
      description,
      thunder,
      hIndex: parseInt(hIndex),
      image: uuid,
    },
  });

  return NextResponse.json({ message: "Speaker created" });
}
