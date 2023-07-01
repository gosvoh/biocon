"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import Logo from "../../public/logo.svg";

function Registration({ ...props }: {} & React.PropsWithoutRef<DialogProps>) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function Contact({ ...props }: {} & React.PropsWithoutRef<DialogProps>) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  return (
    <>
      <Registration
        open={openRegistration}
        onOpenChange={setOpenRegistration}
      />
      <Contact open={openContact} onOpenChange={setOpenContact} />
      <header className="flex justify-between items-center m-4">
        <Image src={Logo} alt="Biocon" width={125} />
        <MainNav setOpenRegistration={setOpenRegistration} />
        <MobileNav setOpenRegistration={setOpenRegistration} />
      </header>
      <main>
        <section id="header"></section>
        <section id="about"></section>
        <section id="speakers"></section>
        <section id="program"></section>
        <section id="location"></section>
        <section id="contacts"></section>
      </main>
      <footer className="flex flex-col m-4 gap-8">
        <div className="flex flex-row justify-between">
          <Link href="https://www.tatneft.ru/">Татнефть</Link>
          <Link href="https://engineers2030.ru/">ПИШ</Link>
          <Link href="https://itmo.ru/">ИТМО</Link>
        </div>
        <div className="flex flex-row justify-between items-center">
          <Link
            href=""
            className={buttonVariants({ variant: "outline", size: "icon" })}
          >
            T
          </Link>
          <div>
            <p>ITMO University</p>
            <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
            <span>email: </span>
            <Button
              variant="link"
              // line height must be 1
              className="hover:underline p-0 h-auto leading-normal"
              onClick={() => setOpenContact(true)}
            >
              biocon_support@itmo.ru
            </Button>
          </div>
        </div>
      </footer>
    </>
  );
}
