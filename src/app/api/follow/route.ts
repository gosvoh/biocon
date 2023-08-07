import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
});

export async function POST(req: NextRequest) {
  const data = await req.json();

  try {
    await formSchema.validate(data);
    return NextResponse.json({
      message: "You have successfully followed",
      follow: await prisma.newsletters.create(data),
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
