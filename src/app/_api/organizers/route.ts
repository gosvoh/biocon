// import { biocon } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import sharp from "sharp";
// import { randomUUID } from "crypto";

// // export const dynamic = "force-dynamic";
// export const revalidate = 600;

// export async function GET() {
//   return NextResponse.json(await biocon.organizers.findMany());
// }

// export async function POST(req: NextRequest) {
//   const auth = req.headers.get("authorization");
//   if (!auth) return NextResponse.json({ error: "Unauthorized", status: 401 });
//   const isValid = await biocon.auth.findUnique({ where: { token: auth } });
//   if (!isValid)
//     return NextResponse.json({ error: "Unauthorized", status: 401 });

//   const data = await req.formData();
//   const name = data.get("name") as string | null;
//   const email = data.get("email") as string | null;
//   const position = data.get("position") as string | null;
//   const img = data.get("image") as File | null;

//   if (!name || !email || !position || !img)
//     return NextResponse.json({ error: "Missing fields" }, { status: 400 });

//   if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");
//   const uuid = randomUUID();
//   try {
//     await sharp(await img.arrayBuffer()).toFile(`./uploads/${uuid}.webp`);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Error while processing image", error },
//       { status: 500 },
//     );
//   }

//   await biocon.organizers.create({
//     data: {
//       name,
//       email,
//       position,
//       image: uuid,
//     },
//   });

//   return NextResponse.json({ message: "Organizer created" });
// }
