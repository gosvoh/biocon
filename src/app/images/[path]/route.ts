import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string } }
) {
  if (!fs.existsSync("./uploads") || !fs.existsSync(`./uploads/${params.path}`))
    return NextResponse.json({ error: "Image not found" }, { status: 404 });

  return new NextResponse(fs.readFileSync(`./uploads/${params.path}`), {
    headers: {
      "Content-Type": "image/webp",
    },
  });
}

export async function POST(req: NextRequest) {}
