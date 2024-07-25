import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, email, name, subject } = await req.json();

    if (
      !(
        process.env.TELEGRAM_BOT_TOKEN &&
        process.env.CHAT_ID &&
        process.env.TOPIC_ID
      ) ||
      !(message && email && name && subject)
    ) {
      return NextResponse.json(
        { message: "Not all .env variables are set || Not all data received" },
        { status: 400 },
      );
    }

    const telegramBotApiUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramBotApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text: `Получен новый отзыв ✅ \n\n ✍️ Имя: ${name} \n\n ✉️ E-mail: ${email} \n\n 🌌 Тема: ${subject} \n\n 📔 Сообщение:\n ${message}  `,
        message_thread_id: process.env.TOPIC_ID,
      }),
    });

    const telegramResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Invalid response from Telegram.",
          details: telegramResponse,
        },
        { status: 403 },
      );
    } else {
      return NextResponse.json({ message: "Success" }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
