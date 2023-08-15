import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { checkCaptchaToken } from "../utils";
import { Registrations } from "@prisma/client";

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

  try {
    return NextResponse.json({
      message: "Registration successful",
      registration: await prisma.registrations.create({ data }),
    });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
