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
          "px-4",
          "md:px-14",
          "lg:px-32",
          "xl:px-64",
          "grid",
          "grid-cols-1",
          "min-h-screen",
          "grid-rows-[auto,1fr,auto]",
          "relative",
          "hyphens-auto"
        )}
        style={{
          backgroundImage: `url(/bg2.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {children}
      </body>
    </html>
  );
}
