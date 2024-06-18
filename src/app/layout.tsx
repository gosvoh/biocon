import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import AntdConfigProvider from "./providers/ant.config.provider";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BIOCON 2024",
  description: "BIOCON 2024 - Updates very soon!",
  keywords: [
    "Конференция",
    "Биотехнологии",
    "Международная",
    "биотех",
    "Инновации",
    "International",
    "Industrial",
    "Biotechnology",
    "Conference",
    "Almetyevsk",
    "Republic of Tatarstan",
    "Tatarstan",
    "Russia",
    "Татарстан",
    "Республика Татарстан",
    "Альметьевск",
    "Татнефть",
    "Science Slam",
    "TED",
    "Tatneft",
    "ПИШ ИТМО",
    "ИТМО",
    "АГНИ",
    "ITMO",
    "Biotech",
    "Speakers",
    "ITMO University",
    "Биология",
    "Biology",
    "Генная терапия",
    "Gene therapy",
    "food biotechnology",
    "climate change",
    "Molecular biology",
    "Молекулярная биология",
    "Biology and Biochemistry",
    "Биология и биохимия",
    "Molecular Biology and Genetics",
    "Молекулярная биология и генетика",
    "Генетика",
    "Экология",
    "Environment and Ecology",
    "Микробиология",
    "Microbiology",
    "Agricultural Sciences",
    "Биоинформатика",
    "Bioinformatics",
    "Вычислительная биология",
    "Science",
    "Наука",
    "Наука в России",
    "PhD",
    "Бакалавриат",
    "Магистратура",
    "Аспирантура",
    "young researchers",
    "Молодые ученые",
    "Established researchers",
    "Biotech experts",
    "Biotech enthusiasts",
    "Индустриальная",
    "Промышленная",
    "Пленарная сессия",
    "Параллельные сессии",
    "Панельная дискуссия",
    "Young researcher",
    "Молодые ученые",
    "Nanobiotechnology",
    "PhD student",
  ],
  applicationName: "Biocon",
  authors: [
    { name: "Aleksey Vokhmin", url: "https://github.com/gosvoh" },
    { name: "Advanced Engineering School ITMO", url: "https://pish-itmo.ru" },
  ],
  icons: "https://biocon.international/logo.jpg",
  robots: {
    index: true,
    follow: false,
  },
  metadataBase: new URL("https://biocon.international"),
  openGraph: {
    type: "website",
    description: "BIOCON 2024 - Updates very soon!",
    locale: "en_US",
    url: "https://biocon.international",
    siteName: "BIOCON 2024",
    images: {
      url: "https://biocon.international/logo.jpg",
      secureUrl: "https://biocon.international/logo.jpg",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/jpeg",
    },
    title: "BIOCON 2024",
  },
  creator: "Aleksey Vokhmin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <AntdConfigProvider>{children}</AntdConfigProvider>
      </body>
    </html>
  );
}
