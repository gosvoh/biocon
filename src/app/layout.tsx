import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

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
  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={cn(
          inter.className,
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
      >
        {children}
      </body>
    </html>
  );
}
