import { biocon } from "@/db/db";
import { Organizers } from "@/db/schema";
import ContactsPage from "@/app/contacts/contacts.page";

export const dynamic = "force-dynamic";

export default async function ContactsDataLoader() {
  let organizers: (typeof Organizers.$inferSelect)[] = [];

  try {
    organizers = await biocon.select().from(Organizers);
  } catch (e) {
    console.error(e);
  }

  return <ContactsPage organizers={organizers} />;
}
