"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useSmoothScroll from "@/lib/useSmoothScroll";

import Logo from "../../public/logo.svg";
import { Roboto } from "next/font/google";
import Footer from "./footer";
import RegistrationDialog from "./registration.dialog";
import ContactDialog from "./contact.dialog";

const Navbar = ({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header
      className="flex justify-between items-center my-4 w-full absolute top-0 left-0 right-0"
      style={{ padding: "inherit" }}
    >
      <a href="/">
        <Image src={Logo} alt="Biocon" width={125} />
      </a>
      <MainNav setOpenContact={setOpenContact} />
      <MobileNav setOpenContact={setOpenContact} />
    </header>
  );
};

const H2Font = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const H2 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h2
      {...props}
      className={cn(
        "text-4xl sm:text-6xl md:text-8xl font-bold stroke text-left w-full uppercase",
        H2Font.className,
        className
      )}
    >
      {children}
    </h2>
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
        "flex flex-col justify-center items-center w-full scroll-m-12",
        className
      )}
    >
      {children}
    </section>
  );

  const Header = () => (
    <Section
      className="flex flex-col justify-center items-end h-screen"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase">
        BioCon 2023
      </h1>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold my-8">
        International Industrial Biotecnology Conference
      </h2>
      <p className="text-xl font-bold">december 18-20, 2023</p>
      <p className="text-xl font-bold capitalize">Almetyevsk</p>
      <div className="flex flex-wrap justify-between items-center w-1/2 gap-6 whitespace-nowrap mt-8 self-center">
        <Link
          href="#about"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "flex-1",
            "bg-transparent",
            "border-white",
            "hover:bg-white",
            "hover:text-black"
          )}
        >
          More info
        </Link>
        <Button onClick={() => setOpenRegistration(true)} className="flex-1">
          Register
        </Button>
      </div>
    </Section>
  );

  const About = () => (
    <Section className="flex flex-col justify-center items-center" id="about">
      <H2>About</H2>
      <p>
        Over the three days, you will have the opportunity to share your
        innovative ideas, research results and experiences with like-minded
        biotech enthusiasts from around the world.
      </p>
    </Section>
  );

  const Speakers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="speakers"
    >
      <H2 className="text-right">Speakers</H2>
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
      <H2>Program</H2>
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

  const Venue = () => (
    <Section className="flex flex-col justify-center items-center" id="venue">
      <H2 className="text-right">Venue</H2>
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

  const Organizers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="organizers"
    >
      <H2>Organaizers</H2>
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
      <Navbar setOpenContact={setOpenContact} />
      <main className="flex flex-col justify-center items-center gap-8">
        <Header />
        <About />
        <Speakers />
        <Program />
        <Venue />
        <Organizers />
      </main>
      <Footer setOpenContact={setOpenContact} />
    </>
  );
}
