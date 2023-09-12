import { biocon } from "@/lib/prisma";
import { NextRequest } from "next/server";

const verifyEndpoint =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const secret = process.env.CAPTCHA_SECRET as string;

export const checkCaptchaToken = (token: string): Promise<boolean> =>
  fetch(verifyEndpoint, {
    method: "POST",
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
      token
    )}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => res.json())
    .then((res) => res.success)
    .catch(() => false);

export const checkAuthToken = async (req: NextRequest) => {
  const auth = req.headers.get("authorization");
  if (!auth) return false;
  const isValid = await biocon.auth.findUnique({ where: { token: auth } });
  if (!isValid) return false;

  return true;
};
