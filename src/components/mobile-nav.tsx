"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Grip } from "lucide-react";
import { Button } from "./ui/button";
import { links } from "../links";
import Image from "next/image";
import VK from "../../public/vk.svg";
import Telegram from "../../public/telegram.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";
import React from "react";
import { Separator } from "./ui/separator";
import { socials } from "@/socials";
import Link from "./link";

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
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backgroundBlendMode: "multiply",
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
                target="_parent"
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
          <Separator className="bg-white" />
        </div>
        <SheetFooter className="flex-col gap-8">
          <div className="flex gap-8 items-center flex-row justify-between">
            <Link href={socials.vk}>
              <Image src={VK} alt={"VK social"} width={40} />
            </Link>
            <Link href={socials.telegram}>
              <Image src={Telegram} alt="Telegram social" width={40} />
            </Link>
            <Link href={socials.facebook}>
              <Image src={Facebook} alt={"Facebook social"} width={40} />
            </Link>
            <Link href={socials.youtube}>
              <Image src={YouTube} alt={"YouTube social"} width={40} />
            </Link>
          </div>
          <div className="flex flex-col text-start text-xs sm:text-end sm:text-base">
            <p>ITMO University</p>
            <Link
              className="hover:underline p-0 h-auto leading-normal"
              href={"mailto:biocon@itmo.ru"}
            >
              biocon@itmo.ru
            </Link>
            <Link className="hover:underline" href="/personal_data_policy.pdf">
              Privacy policy
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
