"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Mail, SidebarOpen } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "../links";
import Image from "next/image";
import Logo from "../../public/logo.svg";

export default function MobileNav({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
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
        className="flex flex-col justify-between max-xs:w-full"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>
            <Image src={Logo} alt="Logo" width={125} />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
              className="hover:underline"
            >
              {link.title}
            </a>
          ))}
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(false);
              setOpenContact(true);
            }}
            className="flex items-center gap-4 mt-6"
          >
            <Mail />
            <span>Contact us</span>
          </Button>
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
