// import { biocon } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import fs from "fs";
// import sharp from "sharp";
// import { randomUUID } from "crypto";

// // export const dynamic = "force-dynamic";
// export const revalidate = 600;

// export async function GET() {
//   return NextResponse.json(await biocon.speakers.findMany());
// }

// export async function POST(req: NextRequest) {
//   const data = await req.formData();
//   const name = data.get("name") as string | null;
//   const nameUrl = data.get("nameUrl") as string | null;
//   const university = data.get("university") as string | null;
//   const universityUrl = data.get("universityUrl") as string | null;
//   const topic = data.get("topic") as string | null;
//   const description = data.get("description") as string | null;
//   const thunder = data.get("thunder") as string | null;
//   const thunderUrl = data.get("thunderUrl") as string | null;
//   const hIndex = data.get("hIndex") as string | null;
//   const img = data.get("image") as File | null;
//   const speakerType = data.get("speakerType") as string | null;
//   const country = data.get("country") as string | null;

//   data.forEach((val) => {
//     if (val === "undefined") return undefined;
//   });

//   if (
//     !name ||
//     !nameUrl ||
//     !university ||
//     !universityUrl ||
//     !img ||
//     !speakerType ||
//     !country
//   )
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

//   await biocon.speakers.create({
//     data: {
//       name,
//       nameUrl,
//       university,
//       universityUrl,
//       topic,
//       description,
//       thunder,
//       thunderUrl,
//       hIndex: hIndex ? parseInt(hIndex) : null,
//       image: uuid,
//       speakerType,
//       country,
//     },
//   });

//   return NextResponse.json({ message: "Speaker created" });
// }

// export async function PATCH(req: NextRequest) {
//   try {
//     const {
//       topId,
//       bottomId,
//       topOrder,
//       bottomOrder,
//       currentId,
//       currentOrder,
//     }: {
//       topId?: number;
//       bottomId?: number;
//       topOrder?: number;
//       bottomOrder?: number;
//       currentId: number;
//       currentOrder: number;
//     } = await req.json();
//     if (topId)
//       return NextResponse.json(
//         await biocon.$transaction([
//           biocon.speakers.update({
//             where: { id: topId },
//             data: { order: currentOrder },
//           }),
//           biocon.speakers.update({
//             where: { id: currentId },
//             data: { order: topOrder },
//           }),
//         ]),
//       );
//     if (bottomId)
//       return NextResponse.json(
//         await biocon.$transaction([
//           biocon.speakers.update({
//             where: { id: bottomId },
//             data: { order: currentOrder },
//           }),
//           biocon.speakers.update({
//             where: { id: currentId },
//             data: { order: bottomOrder },
//           }),
//         ]),
//       );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error changing order", error },
//       { status: 500 },
//     );
//   }
// }
