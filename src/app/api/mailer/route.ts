import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { name, to } = await req.json();

    await transporter.sendMail({
      from: '"BioCon 2024" <biocon@itmo.ru>',
      to: to,
      subject: "Hello!",
      html: `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BIOCON Email</title>
</head>
<body style="margin:0; padding:0; background-color:#1A1A1A; color:white;">
  <table style="background-color:#1A1A1A; max-width:600px; margin:0 auto;">
    <tr>
      <td style="padding: 20px; font-family: Roboto, sans-serif; color:white;">
        <h1>Dear ${name}, </h1>
        <p>We are happy to inform you that your registration has been received! <strong>Within a week the reviewing committee will let you know if your application is accepted.</strong></p>
        <p style="color:#d1bce1;">Over three days, November 11th–13th 2024, we will have the opportunity to share innovative ideas, research results, and experiences with like-minded biotech enthusiasts from around the world.</p>
        <p style="color:#d1bce1;">TED-style plenary talks from world-renowned researchers, parallel sessions on major spheres of biotechnology headlined by recognized keynote speakers, an exciting BioTech Open Mic and much more – all infused with unforgettable culture of Tatarstan – BIOCON, in one word.</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; background-color:#6A25BA; border-radius:28px; margin: 0 70px;">
        <h3 style="color:white;">We have collected some BIOCON trivia for our guests:</h3>
        <ul style="color:white;">
          <li>The floor language is English;</li>
          <li>No registration fee is applied to any types of participants;</li>
          <li>We only offer offline participation to bring back the unique international conference vibe;</li>
          <li>The program will soon be available at <a href="https://biocon.international" style="color:white;">biocon.international</a>;</li>
          <li>Travel expenses are covered by the participants;</li>
          <li>We will happily provide professional visa support and a conference invitation letter.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; font-family: Roboto, sans-serif; color:white;">
        <p>We are happy to assist you with any inquiries:</p>
        <p><strong>Domestic support</strong><br>Anastasia Kim<br><a href="mailto:biocon@itmo.ru" style="color:white;">biocon@itmo.ru</a></p>
      </td>
    </tr>
  </table>
</body>
</html>
            `,
    });
    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 },
    );
  }
}
