import { biocon } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import sharp from "sharp";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "Unauthorized", status: 401 });
  const isValid = await biocon.auth.findUnique({ where: { token: auth } });
  if (!isValid)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  try {
    const id = Number(params.id);
    const org = await biocon.organizers.delete({ where: { id } });
    fs.unlinkSync(`./uploads/${org.image}.webp`);
    return NextResponse.json(org);
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } },
) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ error: "Unauthorized", status: 401 });
  const isValid = await biocon.auth.findUnique({ where: { token: auth } });
  if (!isValid)
    return NextResponse.json({ error: "Unauthorized", status: 401 });

  try {
    const data = await req.formData();
    const name = data.get("name") as string | null;
    const email = data.get("email") as string | null;
    const position = data.get("position") as string | null;
    const img = data.get("image") as File | null;

    if (!name || !email || !position)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const organizer = await biocon.organizers.findUnique({
      where: { id: Number(params.id) },
    });
    if (!organizer)
      return NextResponse.json(
        { error: "Organizer not found" },
        { status: 404 },
      );

    if (img) {
      if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
      await sharp(await img.arrayBuffer()).toFile(
        `./uploads/${organizer.image}.webp`,
      );
    }

    return NextResponse.json(
      await biocon.organizers.update({
        where: { id: Number(params.id) },
        data: {
          name,
          email,
          position,
        },
      }),
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
