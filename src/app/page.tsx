"use client";

import { Button as UiButton, buttonVariants } from "@/components/ui/button";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

import Cat from "../../public/cat.jpg";
import Biocon from "../../public/biocon.png";
import Logo from "../../public/logo.svg";
import AboutProgram from "../../public/about&program.png";
import OutlineCircle from "../../public/outline-circle.svg";
import { Roboto } from "next/font/google";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import { theme } from "../../tailwind.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAsync, useWindowSize } from "@react-hookz/web";
import { Organizer, Speaker } from "./data";
import React from "react";
import dynamic from "next/dynamic";
import { TrophyFilled } from "@ant-design/icons";

const RegistrationDialog = dynamic(() => import("./registration.dialog"));
const ContactDialog = dynamic(() => import("./contact.dialog"));
const FollowDialog = dynamic(() => import("./follow.dialog"));
const MainNav = dynamic(() => import("@/components/main-nav"));
const MobileNav = dynamic(() => import("@/components/mobile-nav"));

const Link = ({
  className,
  ...props
}: React.ComponentProps<typeof NextLink>) => (
  <NextLink
    {...props}
    className={cn("text-base", className)}
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
    className={cn(
      "text-base sm:text-2xl md:text-3xl text-left w-full",
      className
    )}
  >
    {children}
  </p>
);

const SpeakerCard = ({
  name,
  nameUrl,
  index,
  imageUrl,
  university,
  universityUrl,
  topic,
  description,
  className,
  thunder,
  thunderUrl,
  ...props
}: {
  name: string;
  nameUrl: string;
  index: number;
  imageUrl?: string;
  university: string;
  universityUrl: string;
  topic?: string;
  description?: string;
  thunder: string;
  thunderUrl?: string;
} & React.HTMLProps<HTMLDivElement>) => {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;
    fetch(imageUrl).then((res) => setIsValidImage(res.ok));
  }, [imageUrl]);

  const Img = isValidImage
    ? () => (
        <div className="relative w-full h-full aspect-square">
          <Image
            src={imageUrl as string}
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
      className={cn(
        "flex flex-col",
        "justify-center",
        "w-full p-2",
        "text-lg",
        className
      )}
    >
      <Img />
      <Link
        target="_blank"
        prefetch={false}
        href={nameUrl}
        className="text-3xl my-4 text-center hover:underline"
      >
        {name}
      </Link>
      <Link
        target="_blank"
        prefetch={false}
        href={universityUrl}
        className="mb-4 hover:underline text-center"
      >
        {university}
      </Link>
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full my-4">
        <p className="text-xl font-semibold">{index}</p>
        <p>
          <span className="italic">h</span>-index
        </p>
      </div>
      {thunderUrl ? (
        <Link
          prefetch={false}
          href={thunderUrl}
          target="_blank"
          className="text-center my-4 flex items-center justify-center gap-4 hover:underline"
        >
          <TrophyFilled className="text-yellow-400" /> {thunder}
        </Link>
      ) : (
        <p className="text-center my-4 flex items-center justify-center gap-4">
          <Trophy className="text-yellow-400" /> {thunder}
        </p>
      )}
      {topic && <p className="my-4">Lecture topic: {topic}</p>}
      {description && <p>{description}</p>}
    </div>
  );
};

const SpeakerCardSkeleton = ({ ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(
      "flex flex-col",
      "justify-center",
      "w-full p-2",
      "gap-4",
      props.className
    )}
  >
    <Skeleton className="rounded-lg aspect-square w-full flex-grow" />
    <Skeleton className="w-3/4 h-4 mx-auto" />
    <Skeleton className="w-3/4 h-4 mx-auto" />
    <div className="border border-white rounded-lg text-center px-4 py-2 w-full my-8 space-y-2">
      <Skeleton className="w-1/2 h-6 mx-auto" />
      <Skeleton className="w-1/2 h-6 mx-auto" />
    </div>
    <Skeleton className="w-3/4 h-4" />
    <Skeleton className="w-3/4 h-4" />
    <Skeleton className="w-3/4 h-32" />
  </div>
);

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
      <div className="flex flex-col justify-center w-full text-sm sm:text-base md:text-lg">
        <h3 className="text-base sm:text-2xl md:text-3xl">{name}</h3>
        <p>{position}</p>
        <div>
          <span>E-mail: </span>
          <Link href={`mailto:${email}`} className="hover:underline">
            {email}
          </Link>
        </div>
      </div>
    </div>
  );
};

const OrganizersSkeleton = ({ ...props }: React.HTMLProps<HTMLDivElement>) => (
  <div
    {...props}
    className={cn(
      "flex-1 basis-5/12",
      "md:last:flex-grow-0 md:last:basis-1/2",
      "grid grid-cols-[auto,1fr]",
      "justify-center items-center",
      "w-full gap-4 p-4",
      "border-2 border-white rounded-xl",
      "gap-4",
      props.className
    )}
  >
    <Skeleton className="rounded-lg aspect-square w-[100px] md:w-[150px]" />
    <div className="flex flex-col justify-center w-full text-sm sm:text-base md:text-lg space-y-4">
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  </div>
);

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);

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
    <Section className="flex flex-col justify-center items-end !mb-24">
      <Image
        src={Biocon}
        alt="Biocon"
        className="absolute top-0 left-0 -z-[10]"
        width={900}
      />
      <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold uppercase mt-[30vh]">
        BioCon 2023
      </h1>
      <h2 className="text-sm sm:text-2xl md:text-4xl mb-8 mt-2 md:mt-8">
        International Industrial Biotechnology Conference
      </h2>
      <P className="text-right">December 18-20, 2023</P>
      <P className="text-right uppercase">Almetyevsk</P>
      <div className="flex flex-nowrap flex-col sm:flex-row justify-evenly items-center w-1/2 gap-6 whitespace-nowrap mt-16 self-center">
        <Link
          href="#about"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "bg-transparent",
            "border-white",
            "hover:bg-white",
            "hover:text-black",
            "px-8 py-4",
            "text-base sm:text-lg md:text-2xl",
            "sm:py-5 md:py-6",
            "w-full sm:w-auto"
          )}
        >
          More info
        </Link>
        <Button
          onClick={() => setOpenRegistration(true)}
          className={cn(
            "px-8 py-4",
            "text-base sm:text-lg md:text-2xl",
            "sm:py-5 md:py-6",
            "w-full sm:w-auto"
          )}
        >
          Registration
        </Button>
      </div>
    </Section>
  );

  const About = () => {
    const Card = ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => {
      return (
        <div className="flex-grow md:flex-grow-0 basis-[27.5%] flex flex-col justify-center text-center border-2 border-white rounded-3xl px-12 md:px-16 py-8 hyphens-none">
          <h3 className="text-2xl font-bold">{title}</h3>
          <p>{description}</p>
        </div>
      );
    };

    return (
      <Section
        className="flex flex-col justify-center items-center relative mb-4"
        id="about"
      >
        <Image
          src={AboutProgram}
          alt="About background image"
          fill
          className="-z-10 opacity-25 object-cover object-center"
        />
        <H2>About</H2>
        <P className="my-8">
          Over the three days, you will have the opportunity to share your
          innovative ideas, research results and experiences with like-minded
          biotech enthusiasts from around the world.
        </P>
        <P className="my-8">Oppotunities to participate:</P>
        <div className="flex flex-wrap justify-center gap-6">
          <Card
            title="Attendee"
            description="Full-time participation in conference events"
          />
          <Card
            title="Contributed speaker"
            description="Attendee with opportunity to talk during one of the parallel session"
          />
          <Card
            title="Science Slammer"
            description="Attendee with opportunity to science communication talk"
          />
        </div>
        <div className="flex flex-wrap justify-evenly items-center w-1/2 gap-6 whitespace-nowrap mt-8 md:mt-16 self-center">
          <Button
            onClick={() => setOpenRegistration(true)}
            className="px-8 py-4"
          >
            Registration
          </Button>
          <Button
            variant="outline"
            className="px-8 py-4 bg-transparent border-white hover:bg-white hover:text-black"
            onClick={() => setOpenFollow(true)}
          >
            Follow us
          </Button>
        </div>
      </Section>
    );
  };

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
            "w-full",
            "items-center justify-items-center",
            "text-xs sm:text-base md:text-lg",
            "font-bold",
            "gap-y-8"
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
    const [speakersState, speakersAction] = useAsync<Speaker[]>(
      async () => fetch("/api/speakers").then((res) => res.json()),
      []
    );

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

    const windowSizes = useWindowSize();

    useEffect(() => {
      speakersAction.execute();
    }, [speakersAction]);

    const Wrapper = ({ elements }: { elements: Speaker[] }) => {
      let ret = (
        <div className="w-full flex flex-wrap gap-y-8 gap-x-16 justify-items-center justify-around">
          {speakersState.status === "loading" || elements.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <SpeakerCardSkeleton
                  key={i}
                  className="basis-[80%] md:basis-3/12"
                />
              ))
            : elements.map((speaker) => (
                <SpeakerCard
                  nameUrl={speaker.nameUrl}
                  universityUrl={speaker.universityUrl}
                  thunderUrl={speaker.thunderUrl}
                  key={speaker.id}
                  name={speaker.name}
                  index={speaker.hIndex}
                  university={speaker.university}
                  description={speaker.description}
                  thunder={speaker.thunder}
                  topic={speaker.topic}
                  imageUrl={`/images/${speaker.image}.webp`}
                  className="basis-[80%] md:basis-3/12"
                />
              ))}
        </div>
      );
      if (windowSizes.width && windowSizes.width < screens.md)
        ret = (
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
              {elements.length === 0
                ? Array.from({ length: 3 }).map((_, i) => (
                    <SwiperSlide key={i}>
                      <SpeakerCardSkeleton />
                    </SwiperSlide>
                  ))
                : elements.map((speaker) => (
                    <SwiperSlide key={speaker.id}>
                      <SpeakerCard
                        nameUrl="#"
                        universityUrl="#"
                        thunderUrl="#"
                        name={speaker.name}
                        index={speaker.hIndex}
                        university={speaker.university}
                        description={speaker.description}
                        thunder={speaker.thunder}
                        topic={speaker.topic}
                        imageUrl={`/images/${speaker.image}.webp`}
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
        );

      return ret;
    };

    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="speakers"
      >
        <H2 className="text-right">Speakers</H2>
        <h3 className="text-2xl font-bold mb-4">Plenary</h3>
        <Wrapper
          elements={speakersState.result.filter(
            (speaker) => speaker.speakerType === "plenary"
          )}
        />
        <h3 className="text-2xl font-bold mb-4 mt-16">Invited</h3>
        <Wrapper
          elements={speakersState.result.filter(
            (speaker) => speaker.speakerType === "invited"
          )}
        />
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
        className="-z-10 opacity-25 object-cover md:object-scale-down object-center"
      />
      <H2 className="mb-20">Program</H2>
      <P>
        TED-style plenary talks from world-renowned researchers, parallel
        sessions on major spheres of biotechnology headlined by recognized
        keynote speakers, an exciting Science Slam and much more — all infused
        with{" "}
        <span className="font-bold">
          unforgettable culture of Tatarstan — BIOCON, in one word.
        </span>
      </P>
      <div className="relative flex flex-col items-center mt-12 w-full">
        <Image
          src={Cat}
          alt="Coming soon image with cat"
          className="rounded-xl w-3/4 md:w-1/3"
        />
        <p
          className={cn(
            "stroke absolute translate-y-2/4 bottom-0 text-3xl xs:text-4xl sm:text-5xl",
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
      <div className="hidden md:block relative md:flex-1 md:h-[175%] mt-12">
        <Image
          src={"/venue.png"}
          alt={"Venue image"}
          fill
          className="-z-10 opacity-30 md:opacity-100 object-contain object-center"
        />
      </div>
      <div className="flex-1">
        <H2 className="text-right">Venue</H2>
        <div className="relative text-2xl">
          <Image
            src={"/venue.png"}
            alt={"Venue image"}
            fill
            className="md:hidden -z-10 opacity-30 md:opacity-100 object-contain object-center !top-[-40%] !h-[200%]"
          />
          <p className="font-semibold text-5xl">Almetyevsk</p>
          <p className="my-6">(Russian: Альметьевск; Tatar: Әлмәт)</p>
          <p className="my-6">
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

  const Organizers = () => {
    const [organizersState, organizersAction] = useAsync<Organizer[]>(
      async () => fetch("/api/organizers").then((res) => res.json()),
      []
    );

    useEffect(() => {
      organizersAction.execute();
    }, [organizersAction]);

    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="organizers"
      >
        <H2>Organizers</H2>
        <div className="w-full flex flex-wrap gap-4 md:gap-10 justify-items-center justify-center">
          {organizersState.result.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <OrganizersSkeleton key={i} />
              ))
            : organizersState.result.map((organizer) => (
                <OrganizerCard
                  key={organizer.id}
                  email={organizer.email}
                  name={organizer.name}
                  position={organizer.position}
                  image={`/images/${organizer.image}.webp`}
                  className="flex-1 basis-5/12"
                />
              ))}
        </div>
      </Section>
    );
  };

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
