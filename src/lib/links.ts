import type Link from "next/link";

const links: {
  title: string;
  href: React.ComponentPropsWithoutRef<typeof Link>["href"];
}[] = [
  { title: "About", href: "/" },
  { title: "Biocon 2023", href: "/biocon2023" },
  { title: "Speakers", href: "/speakers" },
  // { title: "Program", href: "#" },
  // { title: "Venue", href: "#" },
  // { title: "Organizers", href: "#" },
];

export default links;
