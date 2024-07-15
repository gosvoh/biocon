// import { NextRequest, NextResponse } from "next/server";
// import { checkCaptchaToken } from "../utils";
// import { sendMail } from "../mailer";

// const textMessage = (name: string, email: string, message: string) => `
// ${name} (${email}) оставил(а) сообщение:
// ${message}
// `;

// const htmlMessage = (name: string, email: string, message: string) => `
// <p>${name} (${email}) оставил(а) сообщение:</p>
// <p>${message}</p>
// `;

// export async function POST(req: NextRequest) {
//   const { captchaToken, personalData, ...data } = await req.json();

//   if (!(await checkCaptchaToken(captchaToken))) {
//     return NextResponse.json(
//       { message: "Invalid captcha token" },
//       { status: 400 },
//     );
//   }

//   if (!data.subject || !data.message || !data.email || !data.name)
//     return NextResponse.json({ message: "Invalid data" }, { status: 400 });

//   try {
//     const msg = await sendMail(
//       "biocon@itmo.ru",
//       `[${data.subject}]`,
//       textMessage(data.name, data.email, data.message),
//       htmlMessage(data.name, data.email, data.message),
//     );
//     return NextResponse.json({ message: "Success" });
//   } catch (error) {
//     return NextResponse.json(error, { status: 400 });
//   }
// }
