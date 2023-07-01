"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { SidebarOpen } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "./links";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo.svg";

export default function MobileNav({
  setOpenRegistration,
}: {
  setOpenRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <SidebarOpen />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        // when size is smaller than sm, the sheet will be full screen
        className="flex flex-col justify-between max-xs:w-full"
      >
        <SheetTitle>
          <Image src={Logo} alt="Logo" width={125} />
        </SheetTitle>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="ghost">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
