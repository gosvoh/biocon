import { biocon } from "@/db/db";
import { Speakers2024 } from "@/db/schema";
import Biocon2024Page from "./biocon2024.page";

export const revalidate = 3600;

export const metadata = {
  title: "BIOCON 2024",
  openGraph: {
    title: "BIOCON 2024",
    description: "BIOCON 2024 results page",
    images: {
      url: "https://biocon.international/openGraph/BIOCON 2024.png",
      secureUrl: "https://biocon.international/openGraph/BIOCON 2024.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024",
    description: "BIOCON 2024 results page",
    images: ["https://biocon.international/openGraph/BIOCON 2024.png"],
  },
};

export default async function PreviousBioconLoader() {
  let data: (typeof Speakers2024.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(Speakers2024);
  } catch (e) {
    console.error(e);
  }

  return <Biocon2024Page data={data} />;
}
