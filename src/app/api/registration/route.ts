import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkCaptchaToken } from "../utils";
import { Registrations } from "@prisma/client";
import { sendMail } from "../mailer";
import { Mail } from "./mail";

const mailText = (name: string) => `
${name}, thank you for registration for BIOCON 2023!

Dear ${name},

On behalf of the Organizing Committee, we are excited to welcome you to BIOCON: an international conference on industrial biotechnology held in the marvelous city of Almetyevsk, Republic of Tatarstan!

Over three days, December 18th—20th 2023, you will have the opportunity to share innovative ideas, research results, and experiences with like-minded biotech enthusiasts from around the world.

TED-style plenary talks from world-renowned researchers, parallel sessions on major spheres of biotechnology headlined by recognized keynote speakers, an exciting Science Slam and much more — all infused with unforgettable culture of Tatarstan — BIOCON, in one word.

We have collected some BIOCON trivia for our guests:
• The floor language is English;
• No registration fee is applied to any types of participants;
• We only offer offline participation in an attempt to bring back the unique international conference vibe;
• The program will soon be available at biocon.international;
• Travel expenses are covered by the participants;
• flight & hotel recommendations will also follow soon on the official website;
• We will happily provide professional visa support for all participants if needed as well as a conference invitation letter

Our managers will contact you in due time in order to guide you towards BIOCON:
Domestic support
Elizaveta Punchenko
punchenko@itmo.ru

International support
Sofia Antipova
antipova@itmo.ru

See you at BIOCON 2023!
`;

export async function GET(req: NextRequest) {
  const ReactDomServer = await import("react-dom/server");
  return new NextResponse(
    `<html>
    <head><meta name="encoding" charset="utf-8" /></head>
    <body>${ReactDomServer.renderToString(
      Mail(req.nextUrl.searchParams.get("name") || "NAME")
    )}</body></html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  const {
    captchaToken,
    personalData,
    ...data
  }: {
    captchaToken: string;
    personalData: boolean;
    otherRole?: string;
  } & Registrations = await req.json();

  if (!(await checkCaptchaToken(captchaToken)))
    return NextResponse.json(
      { message: "Captcha verification failed" },
      { status: 400 }
    );

  if (data.role === "Other" && data.otherRole) data.role = data.otherRole;

  let createdRegistration: Registrations | null = null;

  try {
    createdRegistration = await prisma.registrations.create({ data });
    if (!createdRegistration) throw new Error("Registration was not created");
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 400 });
  }

  try {
    const ReactDomServer = await import("react-dom/server");
    const msg = await sendMail(
      createdRegistration.email,
      "Biocon International Registration",
      mailText(createdRegistration.name),
      ReactDomServer.renderToString(Mail(createdRegistration.name))
    );
    if (!msg.rejected) throw new Error("Email was not sent");
    return NextResponse.json({ createdRegistration, msg });
  } catch (error) {
    console.error(error);
    await prisma.registrations.delete({
      where: { id: createdRegistration.id },
    });
    return NextResponse.json(error, { status: 500 });
  }
}
