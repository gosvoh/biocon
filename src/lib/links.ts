import type Link from "next/link";

const links: {
  title: string;
  href: React.ComponentPropsWithoutRef<typeof Link>["href"];
}[] = [
  { title: "About", href: "/" },
  { title: "Biocon 2023", href: "/biocon2023" },
  { title: "Biocon 2024", href: "/biocon2024" },
  { title: "Speakers", href: "/speakers" },
  // { title: "Program", href: "/program" },
  // { title: "Venue", href: "/venue" },
  { title: "Contacts", href: "/contacts" },
];

export default links;
