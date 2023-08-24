import "./globals.css";
import { Inter, Heebo, Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Biocon from "../../public/biocon.png";
import BG from "../../public/bg_orig.png";
import type { Metadata } from "next";

const font = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "BIOCON 2023",
  description:
    "International Industrial Biotechnology Conference in Almetyevsk (Republic of Tatarstan), december 18-20, 2023",
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
  // authors: [{ name: "Alekey Vokhmin", url: "https://github.com/gosvoh" }],
  icons: "https://biocon.international/logo.png",
  robots: {
    index: true,
    follow: false,
  },
  metadataBase: new URL("https://biocon.international"),
  openGraph: {
    type: "website",
    description:
      "International Industrial Biotechnology Conference in Almetyevsk (Republic of Tatarstan), december 18-20, 2023",
    locale: "en_US",
    url: "https://biocon.international",
    siteName: "BIOCON 2023",
    images: {
      url: "https://biocon.international/banner.png",
      secureUrl: "https://biocon.international/banner.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2023",
      type: "image/png",
    },
    title: "BIOCON 2023",
  },
  creator: "Advanced Engineering School ITMO",
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const randomBg = Math.floor(Math.random() * 3) + 1;

  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={cn(
          font.className,
          "mx-auto",
          "overflow-x-hidden",
          "overflow-y-auto",
          "min-h-screen",
          "relative",
          "flex flex-col gap-8"
        )}
      >
        <div className="absolute bottom-0 left-0 right-0 h-screen bg-gradient-to-t from-black to-transparent -z-[49]"></div>
        <div className="absolute top-0 left-0 right-0 h-[35vh] bg-gradient-to-b from-black to-transparent -z-[49]"></div>
        <Image
          src={BG}
          alt="Background image"
          fill
          className="-z-[50]"
          priority
        />
        <Image
          src={Biocon}
          alt="Biocon"
          className="absolute top-0 left-0 -z-[50]"
          width={900}
        />
        {children}
      </body>
    </html>
  );
}
