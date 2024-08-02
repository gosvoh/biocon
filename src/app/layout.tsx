import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata, Viewport } from "next";
import localfont from "next/font/local";
import "./globals.css";
import AntdConfigProvider from "@/components/providers/ant.config.provider";
import Header from "@/components/header";
import Script from "next/script";
import Footer from "@/components/footer";

const font = localfont({
  src: [
    {
      path: "/fonts/Museo_Sans_100.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./fonts/Museo_Sans_300.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Museo_Sans_500.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Museo_Sans_700.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Museo_Sans_900.otf",
      weight: "900",
      style: "normal",
    },
  ],
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
  icons: "/faviconLight.svg",
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
      url: "https://biocon.international/logo.png",
      secureUrl: "https://biocon.international/logo.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
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
        <AntdRegistry>
          <AntdConfigProvider>
            <Header />
            {children}
            <Footer />
          </AntdConfigProvider>
        </AntdRegistry>
        <Script id="yandex-metrika">{`
          (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
          k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

          ym(94808565, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
      `}</Script>
      </body>
    </html>
  );
}
