import { biocon } from "@/db/db";
import { Speakers2023 } from "@/db/schema";
import Biocon2023Page from "@/app/biocon2023/biocon2023.page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "BIOCON 2024 - BIOCON2023",
  openGraph: {
    title: "BIOCON 2024 - BIOCON2023",
    description: "BIOCON 2023 results page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/BIOCON 2023.png",
      secureUrl: "https://biocon.international/openGraph/BIOCON 2023.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - BIOCON2023",
    description: "BIOCON 2023 results page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/BIOCON 2023.png"],
  },
};

export default async function PreviousBioconLoader() {
  let data: (typeof Speakers2023.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2023);
  } catch (e) {
    console.error(e);
  }

  return <Biocon2023Page data={data} />;
}
