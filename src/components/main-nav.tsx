import Link from "@/components/link";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { links } from "./links";

export default function MainNav({
  setOpenRegistration,
}: {
  setOpenRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <nav className="hidden md:flex gap-4 items-center whitespace-nowrap">
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.title}
        </Link>
      ))}
      <Button
        size="icon"
        variant="ghost"
        onClick={() => setOpenRegistration(true)}
      >
        <Mail />
      </Button>
    </nav>
  );
}
