import Link from "@/components/link";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { links } from "../links";

export default function MainNav({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="hidden md:flex gap-4 items-center whitespace-nowrap">
      {links.map((link) => (
        <Link href={link.href} key={link.href} className="hover:underline">
          {link.title}
        </Link>
      ))}
      <Button size="icon" variant="ghost" onClick={() => setOpenContact(true)}>
        <Mail />
        <span className="sr-only">Contact us</span>
      </Button>
    </nav>
  );
}
