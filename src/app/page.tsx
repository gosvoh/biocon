"use client";

import Image, { StaticImageData } from "next/image";
import { Roboto } from "next/font/google";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import React, { useEffect, useState } from "react";

import Link from "@/components/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator as UiSeparator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import VenueImg from "../../public/venue.jpg";
import Cat from "../../public/cat.jpg";
import Logo from "../../public/logo_transparent.png";
import AboutProgram from "../../public/about&program.png";
import OutlineCircle from "../../public/outline-circle.svg";
import Footer from "./footer";
import { theme as tailwindTheme } from "../../tailwind.config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useAsync, useWindowSize } from "@react-hookz/web";
import { TrophyFilled } from "@ant-design/icons";
import { FloatButton } from "antd";

import type { Speakers, Organizers } from "@prisma/client/biocon";

const RegistrationDialog = dynamic(() => import("./registration.dialog"));
const ContactDialog = dynamic(() => import("./contact.dialog"));
const FollowDialog = dynamic(() => import("./follow.dialog"));
const MainNav = dynamic(() => import("@/components/main-nav"));
const MobileNav = dynamic(() => import("@/components/mobile-nav"));

const componentsClassNames = {
  h1: {
    className: "text-5xl sm:text-7xl md:text-9xl",
  },
  bigH2: {
    className: "text-3xl sm:text-4xl md:text-5xl",
  },
  h2: {
    className: "text-2xl sm:text-3xl md:text-4xl mb-8 mt-2 md:mt-8",
  },
  h3: {
    className: "text-xl sm:text-2xl md:text-3xl",
  },
  bigP: {
    className: "text-base sm:text-ls md:text-xl",
  },
  p: {
    className: "text-sm sm:text-base md:text-lg",
  },
  button: {
    className: "px-8 py-4 text-base sm:text-lg md:text-xl font-normal",
    get accent() {
      return {
        className: cn("sm:py-5 md:py-6", "w-full sm:w-auto", this.className),
      };
    },
    get outline() {
      return {
        className: cn(
          buttonVariants({ variant: "outline" }),
          "bg-transparent",
          "border-white",
          "hover:bg-white",
          "hover:text-black",
          "sm:py-5 md:py-6",
          "w-full sm:w-auto",
          this.className
        ),
      };
    },
  },
};

const Navbar = ({
  setOpenContact,
  className,
  ...props
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
} & React.HTMLProps<HTMLDivElement>) => {
  return (
    <header
      className={cn("flex justify-between items-center py-4 w-full", className)}
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

const H1 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h1
      {...props}
      className={cn(
        "text-4xl sm:text-6xl md:text-8xl font-bold stroke text-left w-full uppercase mb-12",
        StrokeFont.className,
        className
      )}
    >
      {children}
    </h1>
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
      "text-base sm:text-lg md:text-2xl text-left w-full",
      className
    )}
  >
    {children}
  </p>
);

const SpeakerCard = ({
  name,
  nameUrl,
  hIndex: hIndex,
  image,
  university,
  universityUrl,
  topic,
  description,
  className,
  thunder,
  thunderUrl,
  country,
  ...props
}: Omit<Speakers, "id" | "speakerType"> & React.HTMLProps<HTMLDivElement>) => {
  const [isValidImage, setIsValidImage] = useState(false);

  useEffect(() => {
    if (!image) return;
    fetch(image).then((res) => setIsValidImage(res.ok));
  }, [image]);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://biocon.international"
      : "";

  const Img = isValidImage
    ? () => (
        <div className="relative w-full aspect-square">
          <Image
            src={baseUrl + image}
            alt={name}
            fill
            className="rounded-lg object-cover aspect-square"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      )
    : () => <Skeleton className="rounded-lg aspect-square w-full" />;

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col",
        "items-start",
        "w-full p-2",
        "text-sm sm:text-base md:text-lg",
        "space-y-4",
        className
      )}
    >
      <Img />
      <Link
        href={nameUrl}
        className="text-lg sm:text-xl md:text-2xl text-center hover:underline mx-auto"
      >
        {name}
      </Link>
      <Link
        href={universityUrl}
        className="mb-4 hover:underline text-center mx-auto min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]"
      >
        {university}
      </Link>
      <p className="w-full text-center font-bold text-base sm:text-lg md:text-xl">
        {country}
      </p>
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full">
        <p className="text-xl font-semibold">{hIndex}</p>
        <p>
          <span className="italic">h</span>-index
        </p>
      </div>
      {thunderUrl ? (
        <Link
          href={thunderUrl}
          className="text-center flex items-center justify-center gap-2 whitespace-nowrap hover:underline mx-auto"
        >
          <TrophyFilled className="text-yellow-400" /> {thunder}
        </Link>
      ) : (
        <p className="text-center flex items-center justify-center gap-2 whitespace-nowrap">
          <TrophyFilled className="text-yellow-400" /> {thunder}
        </p>
      )}
      {topic && <p>Lecture topic: {topic}</p>}
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
    <Skeleton className="w-1/2 h-4 mx-auto" />
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
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://biocon.international"
      : "";

  const Img = image
    ? () => (
        <Image
          src={baseUrl + image}
          alt={name}
          width={150}
          height={150}
          className="rounded-lg aspect-square object-cover"
          sizes="300px, (min-width: 768px) 600px"
        />
      )
    : () => (
        <Skeleton className="rounded-lg aspect-square w-[100px] md:w-[150px]" />
      );

  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-[auto,1fr]",
        "justify-center items-center",
        "w-full gap-4 p-4",
        "border-2 border-white rounded-xl",
        className
      )}
    >
      <Img />
      <div className="flex flex-col justify-center w-full text-sm sm:text-base md:text-lg">
        <h2 className="text-base sm:text-2xl md:text-3xl">{name}</h2>
        <p>{position}</p>
        <Link href={`mailto:${email}`} className="hover:underline">
          {email}
        </Link>
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
  const router = useRouter();

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
    <div role="none" className="flex flex-col min-h-screen gap-8">
      <Navbar setOpenContact={setOpenContact} />
      <Section className="flex-1 flex flex-col justify-center items-end">
        <div
          role="none"
          className="flex-1 flex flex-col items-end justify-center"
        >
          <h1
            className={cn(
              componentsClassNames.h1.className,
              "text-right",
              "font-bold",
              "uppercase"
            )}
          >
            BioCon 2023
          </h1>
          <h2 className={cn(componentsClassNames.h2.className, "text-right")}>
            International Industrial Biotechnology Conference
          </h2>
          <P className="text-right">December 18-20, 2023</P>
          <P className="text-right uppercase mb-16">
            <Link href="https://en.wikipedia.org/wiki/Almetyevsk">
              ALMETYEVSK, REPUBLIC OF TATARSTAN
            </Link>
          </P>
        </div>
        <div className="mt-auto mb-16 flex flex-nowrap flex-col sm:flex-row justify-evenly items-center w-1/2 gap-6 whitespace-nowrap self-center">
          <Link href="#about" {...componentsClassNames.button.outline}>
            More info
          </Link>
          <Button
            onClick={() => setOpenRegistration(true)}
            {...componentsClassNames.button.accent}
          >
            Registration
          </Button>
        </div>
      </Section>
    </div>
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
        <div
          className={cn(
            "flex-grow",
            "basis-[27.5%] flex flex-col",
            "justify-center text-center",
            "border-2 border-white",
            "rounded-3xl hyphens-none",
            "px-8 sm:px-10 md:px-12 py-10",
            "hover:bg-white hover:text-black transition-colors"
          )}
        >
          <h3
            className={cn(
              componentsClassNames.h3.className,
              "mb-4",
              "font-semibold"
            )}
          >
            {title}
          </h3>
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
          className="-z-10 opacity-25 object-cover lg:object-contain object-center"
        />
        <H1>About</H1>
        <P className="my-8">
          Over three days, you will have the opportunity to share innovative
          ideas, research results, and experiences with like-minded biotech
          enthusiasts from around the world.
        </P>
        <P className="my-8">Choose your role:</P>
        <div className="flex flex-wrap justify-center gap-6">
          <Card
            title="Attendee"
            description="Participate in all conference events"
          />
          <Card
            title="Contributed speaker"
            description="Become part of one of the parallel sessions"
          />
          <Card
            title="Science Slammer"
            description="Present your research in an entertaining way in only 10 minutes"
          />
        </div>
        <div className="flex flex-wrap justify-evenly items-center w-1/2 gap-6 whitespace-nowrap mt-8 md:mt-16 self-center">
          <Button
            onClick={() => setOpenRegistration(true)}
            {...componentsClassNames.button.accent}
          >
            Registration
          </Button>
          <Button
            variant="outline"
            {...componentsClassNames.button.outline}
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
      { className: "col-[2] row-[2]" },
      { className: "col-[1] md:col-[3] row-[3] md:row-[1]" },
      { className: "col-[2] md:col-[4] row-[4] md:row-[2]" },
    ];

    return (
      <Section className="mt-0">
        <h2 {...componentsClassNames.h2}>
          BIOCON will be especially beneficial for:
        </h2>
        <div
          className={cn(
            "grid grid-rows-4 md:grid-rows-2 grid-cols-2 md:grid-cols-4",
            "mt-8 whitespace-nowrap",
            "w-full",
            "items-center justify-items-center",
            "text-sm sm:text-lg md:text-xl",
            "font-bold",
            "gap-y-8"
          )}
        >
          <p className={cn(circles[0].className, "text-center")}>
            Junior and
            <br />
            young researchers
          </p>
          <p className={cn(circles[1].className, "text-center")}>
            Recognised and <br /> established researchers
          </p>
          <p className={circles[2].className}>Biotech experts</p>
          <p className={circles[3].className}>Biotech enthusiasts</p>

          {circles.map(({ className }, i) => (
            <Image
              key={i}
              src={OutlineCircle}
              alt="Outline circle"
              className={`${className} h-[60px] md:h-[100px] w-auto`}
            />
          ))}
        </div>
      </Section>
    );
  };

  const TimeLine = () => {
    return (
      <div className="my-16 timeline grid grid-cols-[auto,1fr] grid-rows[7] justify-center items-center justify-items-center gap-x-6 md:gap-x-16 hyphens-auto">
        <div className="row-[1] col-[1] rounded-full border-[3px] border-white w-24 h-24 md:w-20 md:h-20" />
        <div className="row-[2] col-[1] bg-white w-[3px] h-14 md:h-20" />
        <div className="row-[3] col-[1] rounded-full border-[3px] border-white border-dashed w-24 h-24 md:w-20 md:h-20" />
        <div className="row-[4] col-[1] bg-white w-[3px] h-14 md:h-20" />
        <div className="row-[5] col-[1] rounded-full border-[3px] border-white w-24 h-24 md:w-20 md:h-20" />
        <div className="row-[6] col-[1] bg-white w-[3px] h-14 md:h-20" />
        <div className="row-[7] col-[1] rounded-full bg-white border-[3px] border-white w-24 h-24 md:w-20 md:h-20" />

        <div className="row-[1] h-full justify-self-start flex flex-col justify-around">
          <p
            className={cn(
              componentsClassNames.h3.className,
              "text-[#6CCD86]",
              "font-semibold"
            )}
          >
            August 22
          </p>

          <p className={componentsClassNames.p.className}>Registration opens</p>
        </div>
        <div className="row-[3] h-full justify-self-start flex flex-col justify-around">
          <p className={cn(componentsClassNames.h3.className, "font-semibold")}>
            November 1
          </p>
          <p className={componentsClassNames.p.className}>
            Registration ends for participants from from{" "}
            <Link
              className="underline"
              href="https://electronic-visa.kdmid.ru/country_en.html"
            >
              non-listed countries
            </Link>{" "}
            who do not already hold a Russian visa
          </p>
        </div>
        <div className="row-[5] h-full justify-self-start flex flex-col justify-around">
          <p
            className={cn(
              componentsClassNames.h3.className,
              "text-[#FE6F61]",
              "font-semibold"
            )}
          >
            December 1
          </p>
          <p className={componentsClassNames.p.className}>
            Registration ends for all participants
          </p>
        </div>
        <div className="row-[7] h-full justify-self-start flex flex-col justify-around">
          <p className={cn(componentsClassNames.h3.className, "font-semibold")}>
            December 18-20
          </p>
          <p className={componentsClassNames.p.className}>
            See you in Almetyevsk!
          </p>
        </div>
      </div>
    );
  };

  const SpeakersComp = () => {
    const [speakersState, speakersAction] = useAsync<Speakers[]>(
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
    } = Object.entries(tailwindTheme!.screens as any).reduce(
      // @ts-ignore
      (acc, [key, val]) => ({ ...acc, [key]: Number(val.slice(0, -2)) }),
      {}
    );
    const windowSizes = useWindowSize();

    useEffect(() => {
      speakersAction.execute();
    }, [speakersAction]);

    const Wrapper = ({ elements }: { elements: Speakers[] }) => {
      let ret = (
        <div className="w-full flex flex-wrap gap-y-8 gap-x-12 justify-items-center justify-around">
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
                  hIndex={speaker.hIndex}
                  university={speaker.university}
                  description={speaker.description}
                  thunder={speaker.thunder}
                  topic={speaker.topic}
                  image={`/images/${speaker.image}.webp`}
                  className="basis-[80%] md:basis-3/12"
                  country={speaker.country}
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
                        hIndex={speaker.hIndex}
                        university={speaker.university}
                        description={speaker.description}
                        thunder={speaker.thunder}
                        topic={speaker.topic}
                        image={`/images/${speaker.image}.webp`}
                        className="text-center"
                        country={speaker.country}
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
        <H1 className="text-right">Speakers</H1>
        <h2 className={cn(componentsClassNames.h2.className, "mb-8")}>
          Plenary
        </h2>
        <Wrapper
          elements={speakersState.result.filter(
            (speaker) => speaker.speakerType === "plenary"
          )}
        />

        {speakersState.result.filter(
          (speaker) => speaker.speakerType === "invited"
        ).length !== 0 && (
          <>
            <h2 className={cn(componentsClassNames.h2.className, "mb-8 mt-32")}>
              Invited
            </h2>
            <Wrapper
              elements={speakersState.result.filter(
                (speaker) => speaker.speakerType === "invited"
              )}
            />
          </>
        )}
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
      <H1 className="mb-20">Program</H1>
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
      className="flex flex-col justify-center items-center relative md:grid md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-32 md:!mb-20"
      id="venue"
    >
      <div className="hidden md:block relative md:flex-1 md:h-[175%] mt-12">
        <Image
          src={"/venue.png"}
          alt={"Venue image"}
          fill
          className="-z-10 opacity-30 md:opacity-100 object-contain object-[50%_60%] h-auto"
          sizes="100vw"
        />
      </div>
      <div className="flex-1">
        <H1 className="text-right">Venue</H1>
        <div className="relative">
          <Image
            src={"/venue.png"}
            alt={"Venue image"}
            fill
            className="md:hidden -z-10 opacity-30 md:opacity-100 object-contain object-center !top-[-40%] !h-[200%]"
            sizes="50vw"
          />
        </div>
        <div className="space-y-3">
          <p
            className={cn(
              "font-semibold",
              componentsClassNames.bigH2.className
            )}
          >
            <Link
              href="https://goo.gl/maps/JBbZYQ8ynVZas14g9"
              className="hover:underline"
            >
              Almetyevsk{" "}
              <MapPin
                className="h-12"
                height="2rem"
                width="2rem"
                style={{ display: "unset" }}
              />
            </Link>
          </p>
          <p className={cn(componentsClassNames.bigH2.className, "font-light")}>
            Альметьевск{" "}
            <span
              className={cn(
                componentsClassNames.h3.className,
                "text-lg sm:text-xl md:text-2xl"
              )}
            >
              (Russian)
            </span>
          </p>
          <p className={cn(componentsClassNames.bigH2.className, "font-light")}>
            Әлмәт{" "}
            <span
              className={cn(
                componentsClassNames.h3.className,
                "text-lg sm:text-xl md:text-2xl"
              )}
            >
              (Tatar)
            </span>
          </p>
          <p className={cn(componentsClassNames.bigP.className)}>
            In the Republic of Tatarstan, Almetyevsk is often called the “Oil
            Capital”: the city is home to the headquarters of Tatneft and 80% of
            its population is employed by the oil sector.
          </p>
        </div>
      </div>
      <p
        className={cn(
          componentsClassNames.bigP.className,
          "text-lg sm:text-xl md:text-2xl"
        )}
      >
        Almetyevsk boasts its own ski resort, a 150 km network of bike paths,
        the “Almet” community center (complete with Renaissance-era art and
        Shostakovich’s grand piano), and 30 art objects and murals spread
        throughout the city.
      </p>
      <div className="relative w-full h-[300px] md:h-[150%]">
        <Image
          src={VenueImg}
          alt="Venue image"
          className="rounded-3xl object-cover object-center"
          sizes="(max-width: 768px) 100vw, 50vw"
          fill
        />
      </div>
    </Section>
  );

  const Organizers = () => {
    const [organizersState, organizersAction] = useAsync<Organizers[]>(
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
        <H1>Organizers</H1>
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
                  className="flex-1 basis-auto md:basis-5/12 lg:last:grow-0"
                />
              ))}
        </div>
      </Section>
    );
  };

  const Separator = () => (
    <div className="separator w-full">
      <UiSeparator className="bg-white" />
    </div>
  );

  return (
    <>
      <RegistrationDialog
        open={openRegistration}
        onOpenChange={setOpenRegistration}
      />
      <ContactDialog open={openContact} onOpenChange={setOpenContact} />
      <FollowDialog
        open={openFollow}
        onOk={() => setOpenFollow(false)}
        onCancel={() => setOpenFollow(false)}
      />
      <Header />
      <Separator />
      <About />
      <ForWhom />
      <TimeLine />
      <Separator />
      <SpeakersComp />
      <Separator />
      <Program />
      <Separator />
      <Venue />
      <Separator />
      <Organizers />
      <Footer />
      <FloatButton.BackTop
        className="bg-white hover:bg-gray-200"
        onClick={() => router.push("/")}
      />
    </>
  );
}
