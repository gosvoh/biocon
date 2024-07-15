// import { biocon } from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const data = await req.json();

//   try {
//     return NextResponse.json({
//       message: "You have successfully followed",
//       follow: await biocon.newsletters.create({ data }),
//     });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 400 });
//   }
// }
