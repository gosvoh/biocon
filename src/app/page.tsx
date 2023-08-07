"use client";

import { Button as UiButton, buttonVariants } from "@/components/ui/button";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

import Cat from "../../public/cat.jpg";
import Biocon from "../../public/biocon.png";
import Logo from "../../public/logo.svg";
import AboutProgram from "../../public/about&program.png";
import OutlineCircle from "../../public/outline-circle.svg";
import { Roboto } from "next/font/google";
import Footer from "./footer";
import RegistrationDialog from "./registration.dialog";
import ContactDialog from "./contact.dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { theme } from "../../tailwind.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Lightning from "../../public/lightning.svg";
import FollowDialog from "./follow.dialog";
import { Separator } from "@/components/ui/separator";
import { useAsync } from "@react-hookz/web";
import { Organizer, Speaker } from "./data";

const Link = ({
  className,
  ...props
}: React.ComponentProps<typeof NextLink>) => (
  <NextLink
    {...props}
    className={cn(className, "text-base min-h-[44px]")}
    prefetch={false}
  />
);

const Button = ({
  className,
  ...props
}: React.ComponentProps<typeof UiButton>) => (
  <UiButton {...props} className={cn(className, "text-base min-h-[44px]")} />
);

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
  thunder,
  ...props
}: {
  name: string;
  index: number;
  image?: StaticImageData | string;
  university: string;
  topic?: string;
  description?: string;
  thunder?: string;
} & React.HTMLProps<HTMLDivElement>) => {
  const Img = image
    ? () => (
        <div className="relative w-full h-full aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-lg object-cover aspect-square flex-grow"
          />
        </div>
      )
    : () => <Skeleton className="rounded-lg aspect-square w-full flex-grow" />;

  return (
    <div
      {...props}
      className={cn("flex flex-col", "justify-center", "w-full p-2", className)}
    >
      <Img />
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full my-8">
        <p>{index}</p>
        <p>h-index</p>
      </div>
      {thunder && (
        <p className="text-sm text-center mb-4">
          <Image src={Lightning} alt={"Lightning"} className="h-5 inline" />{" "}
          {thunder}
        </p>
      )}
      <p className="text-lg mb-4 text-center">{name}</p>
      <p className="mb-4">
        University: <span className="underline">{university}</span>
      </p>
      {topic && <p className="mb-4">Lecture topic: {topic}</p>}
      {description && <p>{description}</p>}
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
        <Skeleton className="rounded-lg aspect-square w-[100px] md:w-[150px]" />
      );

  return (
    <div
      {...props}
      className={cn(
        "flex-1 basis-5/12",
        "md:last:flex-grow-0 md:last:basis-1/2",
        "grid grid-cols-[auto,1fr]",
        "justify-center items-center",
        "w-full gap-4 p-4",
        "border-2 border-white rounded-xl",
        className
      )}
    >
      <Img />
      <div className="flex flex-col justify-center w-full">
        <h3 className="text-lg">{name}</h3>
        <p className="text-sm">{position}</p>
        <div>
          <span className="text-sm">E-mail: </span>
          <Link href={`mailto:${email}`} className="text-sm hover:underline">
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
  const [openFollow, setOpenFollow] = useState(false);
  const [speakersState, speakersAction] = useAsync<Speaker[]>(
    async () => fetch("/api/speakers").then((res) => res.json()),
    []
  );
  const [organizersState, organizersAction] = useAsync<Organizer[]>(
    async () => fetch("/api/organizers").then((res) => res.json()),
    []
  );

  const Section = ({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLProps<HTMLDivElement>) => (
    <section
      {...props}
      className={cn(
        "flex flex-col justify-center items-center w-full scroll-m-12 my-6 md:my-12 first:my-0",
        className
      )}
    >
      {children}
    </section>
  );

  const Header = () => (
    <Section className="flex flex-col justify-center items-end md:min-h-screen">
      <Image
        src={Biocon}
        alt="Biocon"
        className="absolute top-0 left-0 -z-[10]"
        width={800}
      />
      <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase mt-[30vh] md:mt-0">
        BioCon 2023
      </h1>
      <h2 className="text-sm sm:text-2xl md:text-3xl mb-8 mt-2 md:mt-8">
        International Industrial Biotecnology Conference
      </h2>
      <p className="text-sm sm:text-xl font-light">December 18-20, 2023</p>
      <p className="text-sm sm:text-xl font-light uppercase">Almetyevsk</p>
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
      className="flex flex-col justify-center items-center relative mb-4"
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
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-3xl px-6 py-4">
          <h3 className="text-2xl font-bold">Attendee</h3>
          <p>Full-time participation in conference events</p>
        </div>
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-3xl px-6 py-4">
          <h3 className="text-2xl font-bold">Invited speaker</h3>
          <p>A talk during one of the parallel sessions</p>
        </div>
        <div className="flex flex-col justify-center text-center border-2 border-white rounded-3xl px-6 py-4">
          <h3 className="text-2xl font-bold">Science Slammer</h3>
          <p>A science communication talk</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center w-1/2 gap-6 whitespace-nowrap mt-8 md:mt-16 self-center">
        <Button onClick={() => setOpenRegistration(true)} className="flex-1">
          Registration
        </Button>
        <Button
          variant="outline"
          className="flex-1 bg-transparent border-white hover:bg-white hover:text-black"
          onClick={() => setOpenFollow(true)}
        >
          Follow us
        </Button>
      </div>
    </Section>
  );

  const ForWhom = () => {
    const circles = [
      { className: "col-[1] row-[1]" },
      { className: "col-[1] md:col-[2] row-[2]" },
      { className: "col-[2] md:col-[3] row-[1]" },
      { className: "col-[2] md:col-[4] row-[2]" },
    ];

    return (
      <Section className="mt-0">
        <h3 className="text-2xl font-bold">For whom?</h3>
        <div
          className={cn(
            "grid grid-rows-2 grid-cols-2 md:grid-cols-4",
            "mt-8 whitespace-nowrap",
            "w-full h-[15vh]",
            "items-center justify-items-center",
            "text-xs sm:text-base md:text-lg",
            "font-bold"
          )}
        >
          <p
            className="col-[1] row-[1]"
            style={{
              textShadow:
                "0 0 60px #E17A32, 0 0 60px #E17A32, 0 0 60px #E17A32",
            }}
          >
            Young researchers
          </p>
          <p
            className="col-[2] row-[1] md:row-[2]"
            style={{
              textShadow:
                "0 0 60px #E2369D, 0 0 60px #E2369D, 0 0 60px #E2369D",
            }}
          >
            Scientists
          </p>
          <p
            className="col-[1] md:col-[3] row-[2] md:row-[1]"
            style={{
              textShadow:
                "0 0 60px #3278E1, 0 0 60px #3278E1, 0 0 60px #3278E1",
            }}
          >
            Biotech experts
          </p>
          <p
            className="col-[2] md:col-[4] row-[2]"
            style={{
              textShadow:
                "0 0 60px #32E1E1, 0 0 60px #32E1E1, 0 0 60px #32E1E1",
            }}
          >
            Students
          </p>

          {circles.map(({ className }, i) => (
            <Image
              key={i}
              src={OutlineCircle}
              alt="Outline circle"
              className={`${className} h-[45px] md:h-[80px] w-auto`}
            />
          ))}
        </div>
      </Section>
    );
  };

  const Speakers = () => {
    // @ts-ignore
    const screens: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      "2xl": number;
    } = Object.entries(theme!.screens as any).reduce(
      // @ts-ignore
      (acc, [key, val]) => ({ ...acc, [key]: Number(val.slice(0, -2)) }),
      {}
    );
    const LoremText =
      "Lorem ipsum dolor sit amet consectetur. Rnesciunt ipsum maxime natus nobis autem voluptatem impedit, accusamus deleniti ullam incidunt, quas dolore esse facere iure soluta? Tempora, rerum.";

    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
      if (typeof window === undefined) return;
      setScreenWidth(() => window.screen.width);
      const listener = () => setScreenWidth(window.screen.width);
      window.addEventListener("resize", listener);
      return () => window.removeEventListener("resize", listener);
    }, []);

    const speakers =
      screenWidth < screens.md ? (
        <div className="w-full flex gap-4 items-center">
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "swiper-button-prev flex-1 aspect-square rounded-full border-white"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{ clickable: true, dynamicBullets: true }}
            loop={true}
            centeredSlides={true}
            autoplay={{ delay: 3000 }}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SpeakerCard
                  name="John Doe"
                  index={81}
                  university="University of Oxford"
                  description={LoremText}
                  thunder="Highly Cited Researcher 2018"
                  topic="Topic"
                  className="text-center"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "swiper-button-next flex-1 aspect-square rounded-full border-white"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-y-8 gap-x-16 justify-items-center justify-around">
          {Array.from({ length: 4 }).map((_, i) => (
            <SpeakerCard
              key={i}
              name="John Doe"
              index={81}
              university="University of Oxford"
              description={LoremText}
              thunder="Highly Cited Researcher 2018"
              topic="Topic"
              className="basis-[80%] md:basis-3/12"
            />
          ))}
        </div>
      );

    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="speakers"
      >
        <H2 className="text-right">Speakers</H2>
        <h3 className="text-2xl font-bold mb-4">Plenary</h3>
        {speakers}
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
      <p className="md:text-xl">
        TED-style plenary talks from world-renowned researchers, parallel
        sessions on major spheres of biotechnology headlined by recognized
        keynote speakers, an exciting Science Slam and much more — all infused
        with{" "}
        <span className="font-bold">
          unforgettable culture of Tatarstan — BIOCON, in one word.
        </span>
      </p>
      <div className="relative flex flex-col items-center mt-12">
        <Image
          src={Cat}
          alt="Coming soon image with cat"
          className="w-1/2 rounded-xl"
        />
        <p
          className={cn(
            "stroke absolute translate-y-2/4 bottom-0 text-4xl md:text-6xl",
            StrokeFont.className
          )}
        >
          coming soon...
        </p>
      </div>
    </Section>
  );

  const Venue = () => (
    <Section
      className="flex flex-row justify-center items-center relative"
      id="venue"
    >
      <div className="hidden md:block md:relative md:flex-1 md:h-[175%]">
        <Image
          src={"/venue.png"}
          alt={"Venue image"}
          fill
          className="-z-10 opacity-30 md:opacity-100 object-contain object-center"
        />
      </div>
      <div className="flex-1">
        <H2 className="text-right">Venue</H2>
        <div className="relative">
          <Image
            src={"/venue.png"}
            alt={"Venue image"}
            fill
            className="md:hidden -z-10 opacity-30 md:opacity-100 object-contain object-center !top-[-40%] !h-[200%]"
          />
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
      <H2>Organizers</H2>
      <div className="w-full flex flex-wrap gap-4 md:gap-10 justify-items-center justify-center">
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
      <FollowDialog open={openFollow} onOpenChange={setOpenFollow} />
      <Navbar setOpenContact={setOpenContact} />
      <main className="flex flex-col justify-center items-center gap-8">
        <Header />
        <Separator className="bg-white" />
        <About />
        <ForWhom />
        <Separator className="bg-white" />
        <Speakers />
        <Separator className="bg-white" />
        <Program />
        <Separator className="bg-white" />
        <Venue />
        <Separator className="bg-white" />
        <Organizers />
      </main>
      <Footer />
    </>
  );
}
