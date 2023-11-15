import { biocon } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import sharp from "sharp";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "Unauthorized", status: 401 });
  const isValid = await biocon.auth.findUnique({ where: { token: auth } });
  if (!isValid)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  try {
    const id = Number(params.id);
    const spk = await biocon.speakers.delete({ where: { id } });
    fs.unlinkSync(`./uploads/${spk.image}.webp`);
    return NextResponse.json(spk);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "Unauthorized", status: 401 });
  const isValid = await biocon.auth.findUnique({ where: { token: auth } });
  if (!isValid)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  try {
    const data = await req.formData();
    const name = data.get("name") as string | null;
    const nameUrl = data.get("nameUrl") as string | null;
    const university = data.get("university") as string | null;
    const universityUrl = data.get("universityUrl") as string | null;
    const topic = data.get("topic") as string | null;
    const description = data.get("description") as string | null;
    const thunder = data.get("thunder") as string | null;
    const thunderUrl = data.get("thunderUrl") as string | null;
    const hIndex = data.get("hIndex") as string | null;
    const img = data.get("image") as File | null;
    const speakerType = data.get("speakerType") as string | null;
    const country = data.get("country") as string | null;

    if (
      !name ||
      !nameUrl ||
      !university ||
      !universityUrl ||
      !hIndex ||
      !speakerType ||
      !country
    )
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const speaker = await biocon.speakers.findUnique({
      where: { id: Number(params.id) },
    });
    if (!speaker)
      return NextResponse.json({ error: "Speaker not found" }, { status: 404 });

    if (img) {
      if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
      await sharp(await img.arrayBuffer()).toFile(
        `./uploads/${speaker.image}.webp`
      );
    }

    return NextResponse.json(
      await biocon.speakers.update({
        where: { id: Number(params.id) },
        data: {
          name,
          nameUrl,
          university,
          universityUrl,
          topic: topic || "",
          description: description || "",
          thunder,
          thunderUrl: thunderUrl || "",
          hIndex: parseInt(hIndex),
          speakerType,
          country,
        },
      })
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
