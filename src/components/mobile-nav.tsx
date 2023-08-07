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
import { Grip, Mail, SidebarOpen } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "../links";
import Image from "next/image";
import Link from "next/link";
import VK from "../../public/vk.svg";
import Telegram from "../../public/telegram.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";
import React from "react";
import { Separator } from "./ui/separator";
import { socials } from "@/socials";

export default function MobileNav({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden border border-white"
        >
          <Grip />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex flex-col justify-between w-full"
        style={{
          backgroundImage: `url(/mobile-nav-bg.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader></SheetHeader>
        <div className="flex flex-col gap-4">
          <Separator className="bg-white" />
          {links.map((link, i) => (
            <React.Fragment key={i}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="hover:underline ml-4 uppercase"
              >
                {link.title}
              </Link>
              <Separator className="bg-white" />
            </React.Fragment>
          ))}
          <Link
            href=""
            onClick={() => {
              setOpen(false);
              setOpenContact(true);
            }}
            className="hover:underline ml-4 uppercase"
          >
            Contact us
          </Link>
        </div>
        <SheetFooter className="flex-col gap-8">
          <div className="flex gap-8 items-center flex-row justify-between">
            <Link href={socials.vk} target="_blank" prefetch={false}>
              <Image src={VK} alt={"VK social"} width={40} />
            </Link>
            <Link href={socials.telegram} target="_blank" prefetch={false}>
              <Image src={Telegram} alt="Telegram social" width={40} />
            </Link>
            <Link href={socials.facebook} target="_blank" prefetch={false}>
              <Image src={Facebook} alt={"Facebook social"} width={40} />
            </Link>
            <Link href={socials.youtube} target="_blank" prefetch={false}>
              <Image src={YouTube} alt={"YouTube social"} width={40} />
            </Link>
          </div>
          <div className="text-start text-xs sm:text-end sm:text-base">
            <p>ITMO University</p>
            <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
            <span>email: </span>
            <Link
              className="hover:underline p-0 h-auto leading-normal"
              href={"mailto:biocon@itmo.ru"}
              prefetch={false}
            >
              biocon@itmo.ru
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
