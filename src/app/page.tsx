"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";
import useSmoothScroll from "@/lib/useSmoothScroll";

import Cat from "../../public/cat.jpg";
import Biocon from "../../public/biocon.png";
import Logo from "../../public/logo.svg";
import { Roboto } from "next/font/google";
import Footer from "./footer";
import RegistrationDialog from "./registration.dialog";
import ContactDialog from "./contact.dialog";
import AboutProgram from "../../public/about&program.png";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = ({
  setOpenContact,
  className,
  ...props
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
} & React.HTMLProps<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        "flex justify-between items-center my-4 w-full absolute top-0 left-0 right-0",
        className
      )}
      style={{ padding: "inherit" }}
      {...props}
    >
      <a href="/">
        <Image src={Logo} alt="Biocon" width={75} />
      </a>
      <MainNav setOpenContact={setOpenContact} />
      <MobileNav setOpenContact={setOpenContact} />
    </header>
  );
};

const StrokeFont = Roboto({
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
        "text-4xl sm:text-6xl md:text-8xl font-bold stroke text-left w-full uppercase mb-12",
        StrokeFont.className,
        className
      )}
    >
      {children}
    </h2>
  );
};

const P = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLParagraphElement>) => (
  <p
    {...props}
    className={cn("text-sm sm:text-xl font-light text-left w-full", className)}
  >
    {children}
  </p>
);

const SpeakerCard = ({
  name,
  index,
  image,
  university,
  topic,
  description,
  className,
  ...props
}: {
  name: string;
  index: number;
  image?: StaticImageData | string;
  university: string;
  topic?: string;
  description: string;
} & React.HTMLProps<HTMLDivElement>) => {
  const Img = image
    ? () => (
        <div className="relative w-full h-full aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className={cn("rounded-lg object-cover", className)}
          />
        </div>
      )
    : () => (
        <Skeleton
          className={cn("rounded-lg aspect-square w-full h-full", className)}
        />
      );

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col",
        "justify-center items-center",
        "w-full p-2",
        className
      )}
    >
      <Img />
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full my-8">
        <p>{index}</p>
        <p>h-index</p>
      </div>
      <p className="text-lg">{name}</p>
      <p className="underline mb-8">{university}</p>
      <p className={topic ? "my-4" : ""}>{topic}</p>
      <p>{description}</p>
    </div>
  );
};

const OrganizerCard = ({
  name,
  position,
  image,
  email,
  className,
  ...props
}: {
  name: string;
  position: string;
  image?: StaticImageData | string;
  email: string;
} & React.HTMLProps<HTMLDivElement>) => {
  const Img = image
    ? () => (
        <Image
          src={image}
          alt={name}
          width={150}
          height={150}
          className="rounded-lg aspect-square object-cover"
        />
      )
    : () => (
        <Skeleton className="rounded-lg aspect-square w-[150px] h-[150px]" />
      );

  return (
    <div
      {...props}
      className={cn(
        "flex-1 basis-5/12",
        "last:flex-grow-0 last:basis-1/2",
        "grid grid-cols-[auto,1fr]",
        "justify-center items-center",
        "w-full gap-4 p-2",
        "border-2 border-white rounded-xl",
        className
      )}
    >
      <Img />
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-lg font-bold uppercase">{name}</h3>
        <p className="text-sm font-light uppercase">{position}</p>
        <div>
          <span className="text-sm font-light">E-mail: </span>
          <Link
            href={`mailto:${email}`}
            className="text-sm font-light hover:underline"
          >
            {email}
          </Link>
        </div>
      </div>
    </div>
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
        "flex flex-col justify-center items-center w-full scroll-m-12 my-12 first:my-0",
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
      <Image
        src={Biocon}
        alt="Biocon"
        className="absolute top-0 left-0 -z-[1]"
        width={1000}
      />
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase">
        BioCon 2023
      </h1>
      <h2 className="text-sm sm:text-2xl md:text-3xl font-bold my-8">
        International Industrial Biotecnology Conference
      </h2>
      <p className="text-sm sm:text-xl font-light">december 18-20, 2023</p>
      <p className="text-sm sm:text-xl font-light capitalize">Almetyevsk</p>
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
    <Section
      className="flex flex-col justify-center items-center relative"
      id="about"
    >
      <Image
        src={AboutProgram}
        alt="About background image"
        fill
        className="-z-10 opacity-25 object-contain object-center"
      />
      <H2>About</H2>
      <P>
        Over the three days, you will have the opportunity to share your
        innovative ideas, research results and experiences with like-minded
        biotech enthusiasts from around the world.
      </P>
      <P className="my-8">Oppotunities to participate:</P>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-md px-6 py-4">
          <h3 className="text-2xl font-bold">Attendee</h3>
          <p>Full-time participation in conference events</p>
        </div>
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-md px-6 py-4">
          <h3 className="text-2xl font-bold">Inited speaker</h3>
          <p>A talk during one of the parallel sessions</p>
        </div>
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-md px-6 py-4">
          <h3 className="text-2xl font-bold">Science Slammer</h3>
          <p>A science communication talk</p>
        </div>
      </div>
      <div
        className="flex flex-row gap-8 mt-16
      flex-nowrap w-full xs:w-1/2
      "
      >
        <Button onClick={() => setOpenRegistration(true)} className="flex-1">
          Registration
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent border-white hover:bg-white hover:text-black"
        >
          Follow us
        </Button>
      </div>
    </Section>
  );

  const Speakers = () => {
    const LoremText =
      "Lorem ipsum dolor sit amet consectetur adipisicing el recusanunt corporis totam ad id, vel nulla dolore quos aspernatur perspiciatis, ducimus architecto dolor consectetur! Sit, quasi velit hic quisquam voluptates beatae aliquam nam qui aperiam nihil illo sed ea, ipsum explicabo. Reiciendis delectus sint consequatur hic repellat iste odit quasi nesciunt ipsum maxime natus nobis autem voluptatem impedit, accusamus deleniti ullam incidunt, quas dolore esse facere iure soluta? Tempora, rerum.";

    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="speakers"
      >
        <H2 className="text-right">Speakers</H2>
        <div className="w-full grid grid-cols-3 gap-x-32 gap-y-8 justify-items-center justify-center">
          {Array.from({ length: 7 }).map((_, i) => (
            <SpeakerCard
              key={i}
              name="John Doe"
              index={81}
              university="University of Oxford"
              description={LoremText}
            />
          ))}
        </div>
      </Section>
    );
  };

  const Program = () => (
    <Section
      className="flex flex-col justify-center items-center relative"
      id="program"
    >
      <Image
        src={AboutProgram}
        alt="Program background image"
        fill
        className="-z-10 opacity-25 object-contain object-center"
      />
      <H2>Program</H2>
      <p>
        TED-style plenary talks from world-renowned researchers, parallel
        sessions on major spheres of biotechnology headlined by recognized
        keynote speakers, an exciting Science Slam and much more — all infused
        with unforgettable culture ofTatarstan — BIOCON, in one word.
      </p>
      <div className="relative flex flex-col items-center mt-12">
        <Image
          src={Cat}
          alt="Coming soon image with cat"
          className="w-1/2 rounded-xl"
        />
        <p
          className={cn(
            "stroke absolute translate-y-2/4 bottom-0 text-6xl",
            StrokeFont.className
          )}
        >
          coming soon...
        </p>
      </div>
    </Section>
  );

  const Venue = () => (
    <Section className="flex flex-row justify-center items-center" id="venue">
      <div className="relative flex-1 h-[200%]">
        <Image
          src={"/venue.png"}
          alt={"Venue image"}
          fill
          className="object-contain object-center"
        />
      </div>
      <div className="flex-1">
        <H2 className="text-right">Venue</H2>
        <div>
          <p className="font-semibold text-xl">Almetyevsk</p>
          <p className="my-4">(Russian: Альметьевск; Tatar: Әлмәт)</p>
          <p className="my-4">
            Is a city in Tatarstan, Russia, located on the left bank of Zay
            River.
          </p>
          <p className="mt-8">
            The oil-rich city of Almetyevsk in Tatarstan region has ambitious
            plans to transform into a major biotechnology hub in Russia.
          </p>
        </div>
      </div>
    </Section>
  );

  const Organizers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="organizers"
    >
      <H2>Organaizers</H2>
      {/* Flex container with 2 columns, but the last item must be centered */}
      <div className="w-full flex flex-wrap gap-10 justify-items-center justify-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <OrganizerCard
            key={i}
            email="email@email.com"
            name="Name Surname"
            position="Position"
            className="flex-1 basis-5/12"
          />
        ))}
      </div>
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
      <Footer />
    </>
  );
}
