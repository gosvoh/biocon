import NavLogo from "@public/NavLogo.svg";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon, X } from "lucide-react";
import Image from "next/image";
import links from "@/lib/links";
import { SiTelegram } from "@icons-pack/react-simple-icons";

const MobileNav = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button size="icon" variant="ghost" className="lg:hidden">
        <MenuIcon className="w-10 h-10" />
      </Button>
    </SheetTrigger>
    <SheetContent side={"top"} className="h-full px-10 py-5">
      <SheetHeader className="fcol gap-20">
        <SheetTitle className="flex flex-row justify-between items-center">
          <Link href="/">
            <Image src={NavLogo} alt="Biocon" className="h-10" />
          </Link>
          <SheetClose>
            <X className="w-10 h-10" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetTitle>
        <SheetDescription>
          <nav className="flex flex-col gap-8 items-start">
            {links.map(({ href, title }, i) => (
              <SheetClose asChild key={`link-${i}`}>
                <Link className="text-left" href={href}>
                  {title}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);

const DesktopNav = () => (
  <nav className="hidden lg:inline-flex gap-6 text-left bg-secondary py-5 px-10 rounded-full">
    {links.map(({ href, title }, i) => (
      <Link
        className={"link-hover-underline no-underline hover:no-underline"}
        key={`link-${i}`}
        href={href}
      >
        {title}
      </Link>
    ))}
  </nav>
);

export default function Header() {
  return (
    <header className="w-full py-8 lg:py-5 top-0 bg-secondary lg:bg-default">
      <div className="flex flex-row justify-between items-center gap-4 wrapper">
        <Link href="/">
          <Image src={NavLogo} alt="Biocon" className="h-10" />
        </Link>
        <MobileNav />
        <DesktopNav />
        <Link
          href="https://t.me/BIOCON_2023"
          className="hidden lg:block scale-animation"
          target={"_blank"}
        >
          <SiTelegram className="w-10 h-10" />
        </Link>
      </div>
    </header>
  );
}
