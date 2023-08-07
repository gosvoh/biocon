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
