import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.timeweb.ru",
  auth: {
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
  },
  port: 465,
  secure: true,
  dkim: {
    domainName: "biocon.international",
    keySelector: "mail",
    privateKey: process.env.DKIM_PRIVATE_KEY!,
  },
});

export const sendMail = async (
  to: string,
  subject: string,
  text: string,
  html: React.ReactNode
) => {
  return await transporter.sendMail({
    to,
    subject,
    text,
    html: `<html><body>${html}</body></html>`,
  });
};
