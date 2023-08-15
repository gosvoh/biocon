import "./globals.css";
import { Inter, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Biocon from "../../public/biocon.png";
import { ConfigProvider, theme } from "antd";

const font = Heebo({ subsets: ["latin"] });

export const metadata = {
  title: "Biocon",
  description:
    "International Industrial Biotechnology Conference - an international conference to be held in Almetyevsk (Tatarstan) at the end of 2023 with the support of Tatneft, PISH ITMO and AGNI",
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
        style={{
          backgroundImage: `url(/bg.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <Image
          src={Biocon}
          alt="Biocon"
          className="absolute top-0 left-0 -z-[10]"
          width={900}
          priority
        />
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-screen bg-gradient-to-t from-black to-transparent -z-50"></div>
      </body>
    </html>
  );
}
