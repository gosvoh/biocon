import { biocon } from "@/db/db";
import { Organizers } from "@/db/schema";
import ContactsPage from "@/app/contacts/contacts.page";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "BIOCON 2024 - Contacts",
  openGraph: {
    title: "BIOCON 2024 - Contacts",
    description: "Contacts page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/Contacts.png",
      secureUrl: "https://biocon.international/openGraph/Contacts.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - Contacts",
    description: "Contacts page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/Contacts.png"],
  },
};

export default async function ContactsDataLoader() {
  let organizers: (typeof Organizers.$inferSelect)[] = [];

  try {
    organizers = await biocon.select().from(Organizers);
  } catch (e) {
    console.error(e);
  }

  return (
    <ContactsPage organizers={organizers.sort((a, b) => a.order - b.order)} />
  );
}
