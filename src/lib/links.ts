import type Link from "next/link";

const links: {
  title: string;
  href: React.ComponentPropsWithoutRef<typeof Link>["href"];
}[] = [
  { title: "About", href: "/" },
  { title: "Biocon 2023", href: "#" },
  { title: "Speakers", href: "#" },
  { title: "Program", href: "#" },
  { title: "Venue", href: "#" },
  { title: "Organizers", href: "#" },
  // { title: "Program", href: "#" },
  // { title: "Venue", href: "#" },
  // { title: "Organizers", href: "#" },
];

export default links;
