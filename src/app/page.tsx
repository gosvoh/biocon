"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "@/components/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import Logo from "../../public/logo.svg";
import Telegram from "../../public/telegram.svg";
import { cn } from "@/lib/utils";
import useSmoothScroll from "@/lib/useSmoothScroll";

const RegistrationDialog = (props: {} & React.PropsWithoutRef<DialogProps>) => (
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

const ContactDialog = ({
  ...props
}: {} & React.PropsWithoutRef<DialogProps>) => (
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

const Navbar = ({
  setOpenRegistration,
}: {
  setOpenRegistration: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header
      className="flex justify-between items-center my-4 w-full absolute top-0 left-0 right-0"
      style={{ padding: "inherit" }}
    >
      <Link href="/">
        <Image src={Logo} alt="Biocon" width={125} />
      </Link>
      <MainNav setOpenRegistration={setOpenRegistration} />
      <MobileNav setOpenRegistration={setOpenRegistration} />
    </header>
  );
};

const Footer = ({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <footer className="flex flex-col m-4 mt-16 gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <Link href="https://www.tatneft.ru/">Татнефть</Link>
        <Link href="https://engineers2030.ru/">ПИШ</Link>
        <Link href="https://itmo.ru/">ИТМО</Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <Link
          href=""
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex items-center gap-4 hover:underline p-0 h-auto"
          )}
        >
          <Image src={Telegram} alt="Telegram" width={40} />
          <span>@telegram</span>
        </Link>
        <div>
          <p>ITMO University</p>
          <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
          <span>email: </span>
          <Button
            variant="link"
            className="hover:underline p-0 h-auto leading-normal"
            onClick={() => setOpenContact(true)}
          >
            biocon_support@itmo.ru
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const smoothScroll = useSmoothScroll();

  useEffect(() => {
    if (window.location.hash) smoothScroll(window.location.hash);
  }, [smoothScroll]);

  const Section = ({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLProps<HTMLDivElement>) => (
    <section
      {...props}
      className={cn(
        "flex flex-col justify-center items-center w-full",
        className
      )}
    >
      {children}
    </section>
  );

  const Header = () => (
    <Section
      className="flex flex-col justify-center items-center h-screen"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-bold">BioCon</h1>
      <h2 className="text-2xl font-bold">Bioinformatics Conference</h2>
      <p className="text-xl font-bold">October 14-16, 2021</p>
      <p className="text-xl font-bold">St. Petersburg, Russia</p>
      <div className="flex flex-row justify-between items-center w-1/2">
        <Link href="#about" className={buttonVariants({ variant: "outline" })}>
          More info
        </Link>
        <Button onClick={() => setOpenRegistration(true)}>Register</Button>
      </div>
    </Section>
  );

  const About = () => (
    <Section className="flex flex-col justify-center items-center" id="about">
      <h2 className="text-4xl font-bold">About</h2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Speakers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="speakers"
    >
      <h2 className="text-4xl font-bold">Speakers</h2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Program = () => (
    <Section className="flex flex-col justify-center items-center" id="program">
      <h2 className="text-4xl font-bold">Program</h2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Location = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="location"
    >
      <h2 className="text-4xl font-bold">Location</h2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Contacts = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="contacts"
    >
      <h2 className="text-4xl font-bold">Contacts</h2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  return (
    <>
      <RegistrationDialog
        open={openRegistration}
        onOpenChange={setOpenRegistration}
      />
      <ContactDialog open={openContact} onOpenChange={setOpenContact} />
      <Navbar setOpenRegistration={setOpenRegistration} />
      <main className="flex flex-col justify-center items-center gap-8">
        <Header />
        <About />
        <Speakers />
        <Program />
        <Location />
        <Contacts />
      </main>
      <Footer setOpenContact={setOpenContact} />
    </>
  );
}
