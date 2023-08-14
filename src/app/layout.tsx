import "./globals.css";
import { Inter, Heebo } from "next/font/google";
import { cn } from "@/lib/utils";

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
          "grid",
          "grid-cols-1",
          "min-h-screen",
          "grid-rows-[auto,1fr,auto]",
          "relative"
        )}
        style={{
          backgroundImage: `url(/bg2.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {children}
        <div className="absolute bottom-0 left-0 right-0 h-screen bg-gradient-to-t from-black to-transparent -z-50"></div>
      </body>
    </html>
  );
}
