import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";
import { checkCaptchaToken } from "../utils";

const formSchema = yup.object().shape({
  subject: yup.string().required("Please select a subject"),
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be at least 3 characters"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  const { captchaToken, personalData, ...data } = await req.json();

  if (!(await checkCaptchaToken(captchaToken))) {
    return NextResponse.json(
      { message: "Invalid captcha token" },
      { status: 400 }
    );
  }

  try {
    await formSchema.validate(data, { abortEarly: false });
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
