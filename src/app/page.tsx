"use client";

import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import Image, { StaticImageData } from "next/image";
import Script from "next/script";

import React, { useEffect, useState } from "react";

import Link from "@/components/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator as UiSeparator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

import { IdcardOutlined, TrophyFilled } from "@ant-design/icons";
import { useAsync } from "@react-hookz/web";
import {
  BusIcon,
  HotelIcon,
  MapPin,
  PlaneIcon,
  RussianRubleIcon,
  UtensilsIcon,
} from "lucide-react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import AboutProgram from "../../public/about&program.png";
import Logo from "../../public/logo_transparent.png";
import OutlineCircle from "../../public/outline-circle.svg";
import VenueImg from "../../public/venue.jpg";
import Zilant from "../../public/zilant.png";
import MapImg from "../../public/map.png";

import Icon from "@/components/icon";
import type { Organizers, Speakers } from "@prisma/client/biocon";
import FloatButton from "antd/es/float-button";

import "swiper/css";
import "swiper/css/pagination";
import AntdConfigProvider from "./ant.config.provider";
import { Modal } from "antd";

const RegistrationDialog = dynamic(() => import("./registration.dialog"));
const ContactDialog = dynamic(() => import("./contact.dialog"));
const FollowDialog = dynamic(() => import("./follow.dialog"));
const MainNav = dynamic(() => import("@/components/main-nav"));
const MobileNav = dynamic(() => import("@/components/mobile-nav"));
const Footer = dynamic(() => import("./footer"));

const componentsClassNames = {
  xl5: {
    className: "text-5xl sm:text-7xl md:text-9xl",
  },
  xl4: {
    className: "text-4xl sm:text-6xl md:text-8xl",
  },
  xl3: {
    className: "text-3xl sm:text-4xl md:text-5xl",
  },
  xl2: {
    className: "text-2xl sm:text-3xl md:text-4xl",
  },
  xl: {
    className: "text-xl sm:text-2xl md:text-3xl",
  },
  lg: {
    className: "text-lg sm:text-xl md:text-2xl",
  },
  base: {
    className: "text-base sm:text-ls md:text-xl",
  },
  sm: {
    className: "text-sm sm:text-base md:text-lg",
  },
  xs: {
    className: "text-xs sm:text-sm md:text-base",
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
        componentsClassNames.xl4.className,
        "font-bold stroke text-left w-full uppercase mb-12",
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
      componentsClassNames.base.className,
      "text-left w-full",
      className
    )}
  >
    {children}
  </p>
);

const SpeakerCard = ({
  speaker,
  className,
  ...props
}: { speaker: Speakers } & React.HTMLProps<HTMLDivElement>) => {
  const [isValidImage, setIsValidImage] = useState(false);
  const imgUrl = `/images/${speaker.image}.webp`;
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://biocon.international"
      : "";

  useEffect(() => {
    if (!speaker.image) return;
    fetch(baseUrl + imgUrl).then((res) => setIsValidImage(res.ok));
  }, [speaker.image, imgUrl, baseUrl]);

  const Img = isValidImage
    ? () => (
        <div className="relative w-full aspect-square">
          <Image
            src={baseUrl + imgUrl}
            alt={speaker.name}
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
        componentsClassNames.sm.className,
        "space-y-4",
        className
      )}
    >
      <Img />
      <Link
        href={speaker.nameUrl}
        className={cn(
          componentsClassNames.lg.className,
          "text-center hover:underline mx-auto",
          "min-h-[3.5rem] md:min-h-[4rem]"
        )}
      >
        {speaker.name}
      </Link>
      <Link
        href={speaker.universityUrl}
        className="mb-4 hover:underline text-center mx-auto min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]"
      >
        {speaker.university}
      </Link>
      <p
        className={cn(
          componentsClassNames.base.className,
          "w-full text-center font-bold"
        )}
      >
        {speaker.country}
      </p>
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full">
        <p className={cn(componentsClassNames.lg.className, "font-semibold")}>
          {speaker.hIndex}
        </p>
        <p>
          <span className="italic">h</span>-index
        </p>
      </div>
      {speaker.thunderUrl ? (
        <Link
          href={speaker.thunderUrl}
          className="text-center flex items-center justify-center gap-2 hover:underline mx-auto"
        >
          <TrophyFilled className="text-yellow-400" /> {speaker.thunder}
        </Link>
      ) : (
        <p className="text-center flex items-center justify-center gap-2">
          <TrophyFilled className="text-yellow-400" /> {speaker.thunder}
        </p>
      )}
      {speaker.topic && <p>Lecture topic: {speaker.topic}</p>}
      {speaker.description && <p>{speaker.description}</p>}
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
    <Skeleton className="w-3/4 h-[3.5rem] md:h-[4rem] mx-auto" />
    <Skeleton className="w-3/4 h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] mx-auto" />
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
      <div
        className={cn(
          componentsClassNames.sm.className,
          "flex flex-col justify-center w-full"
        )}
      >
        <h2 className={cn(componentsClassNames.base.className)}>{name}</h2>
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
    <div
      className={cn(
        componentsClassNames.sm.className,
        "flex flex-col justify-center w-full space-y-4"
      )}
    >
      <Skeleton className="w-3/4 h-8" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-3/4 h-4" />
    </div>
  </div>
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

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [openFollow, setOpenFollow] = useState(false);
  const [speakersState, speakersAction] = useAsync<Speakers[]>(
    async () =>
      fetch("/api/speakers")
        .then((res) => res.json())
        .then((speakers: Speakers[]) =>
          speakers.sort((a, b) => a.order - b.order)
        ),
    []
  );
  const [organizersState, organizersAction] = useAsync<Organizers[]>(
    async () => fetch("/api/organizers").then((res) => res.json()),
    []
  );

  useEffect(() => {
    speakersAction.execute();
    organizersAction.execute();
  }, [speakersAction, organizersAction]);

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
              componentsClassNames.xl5.className,
              "text-right",
              "font-bold",
              "uppercase"
            )}
          >
            BioCon 2023
          </h1>
          <h2 className={cn(componentsClassNames.xl2.className, "text-right")}>
            International Industrial Biotechnology Conference
          </h2>
          <P
            className={cn(
              "text-right mt-16",
              componentsClassNames.xl.className
            )}
          >
            December 18-20, 2023
          </P>
          <P
            className={cn(
              "text-right mb-16 hover:underline",
              componentsClassNames.xl.className
            )}
          >
            <Link href="https://en.wikipedia.org/wiki/Almetyevsk">
              Almetyevsk, Republic of Tatarstan
            </Link>
          </P>
        </div>
        <div className="mt-auto mb-16 flex flex-nowrap flex-col sm:flex-row justify-evenly items-center w-1/2 gap-6 whitespace-nowrap self-center">
          <Link
            target="_parent"
            href="#about"
            {...componentsClassNames.button.outline}
          >
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
              componentsClassNames.xl.className,
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
      { className: "col-[1] md:col-[5] row-[5] md:row-[1]" },
    ];

    return (
      <Section className="mt-0">
        <h2 {...componentsClassNames.xl2}>
          BIOCON will be especially beneficial for:
        </h2>
        <div
          className={cn(
            "grid grid-rows-5 md:grid-rows-2 grid-cols-2 md:grid-cols-5",
            "mt-8 whitespace-nowrap",
            "w-full",
            "items-center justify-items-center",
            componentsClassNames.xs.className,
            "font-bold",
            "gap-y-8"
          )}
        >
          <p
            className={cn(
              circles[0].className,
              "text-center",
              "-translate-y-1"
            )}
          >
            Junior and
            <br />
            young researchers
          </p>
          <p
            className={cn(
              circles[1].className,
              "text-center",
              "-translate-y-1"
            )}
          >
            Recognised and <br /> established researchers
          </p>
          <p className={circles[2].className}>Biotech experts</p>
          <p className={circles[3].className}>Biotech enthusiasts</p>
          <p
            className={cn(
              circles[4].className,
              "text-center",
              "-translate-y-1"
            )}
          >
            Business <br /> representatives
          </p>

          {circles.map(({ className }, i) => (
            <Image
              key={i}
              src={OutlineCircle}
              alt="Outline circle"
              className={cn(className, "h-[60px] md:h-[100px] w-auto")}
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
              componentsClassNames.xl.className,
              "text-[#6CCD86]",
              "font-semibold"
            )}
          >
            August 22
          </p>

          <p className={componentsClassNames.sm.className}>
            Registration opens
          </p>
        </div>
        <div className="row-[3] h-full justify-self-start flex flex-col justify-around">
          <p className={cn(componentsClassNames.xl.className, "font-semibold")}>
            November 1
          </p>
          <p className={componentsClassNames.sm.className}>
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
              componentsClassNames.xl.className,
              "text-[#FE6F61]",
              "font-semibold"
            )}
          >
            December 1
          </p>
          <p className={componentsClassNames.sm.className}>
            Registration ends for all participants
          </p>
        </div>
        <div className="row-[7] h-full justify-self-start flex flex-col justify-around">
          <p className={cn(componentsClassNames.xl.className, "font-semibold")}>
            December 18-20
          </p>
          <p className={componentsClassNames.sm.className}>
            See you in Almetyevsk!
          </p>
        </div>
      </div>
    );
  };

  const SpeakersComp = () => {
    const NormalWrapper = ({
      elements,
      className,
    }: {
      elements: Speakers[];
      className?: React.HTMLProps<HTMLDivElement>["className"];
    }) => (
      <div
        className={cn(
          "w-full hidden md:flex flex-wrap gap-8 justify-items-center justify-around",
          className
        )}
      >
        {speakersState.status === "loading" || elements.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <SpeakerCardSkeleton
                key={i}
                className="basis-[80%] md:basis-3/12"
              />
            ))
          : elements.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                className="basis-[80%] md:basis-3/12"
              />
            ))}
      </div>
    );

    const MobileWrapper = ({
      elements,
      className,
    }: {
      elements: Speakers[];
      className?: React.HTMLProps<HTMLDivElement>["className"];
    }) => (
      <div
        className={cn("w-full flex md:hidden gap-4 items-center", className)}
      >
        <div
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "swiper-button-prev flex-1 aspect-square rounded-full border-white"
          )}
        >
          <Icon name="chevron-left" className="w-4 h-4" />
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
                    key={speaker.id}
                    speaker={speaker}
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
          <Icon name="chevron-right" className="w-4 h-4" />
        </div>
      </div>
    );

    const Wrapper = ({ elements }: { elements: Speakers[] }) => (
      <>
        <NormalWrapper elements={elements} />
        <MobileWrapper elements={elements} />
      </>
    );

    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="speakers"
      >
        <H1 className="text-right">Speakers</H1>
        <h2 className={cn(componentsClassNames.xl2.className, "mb-8")}>
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
            <h2
              className={cn(componentsClassNames.xl2.className, "mb-8 mt-32")}
            >
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
      <div className="relative flex flex-col items-center mt-6 w-full">
        <Image
          src={Zilant}
          alt="Coming soon image with dragon"
          className="w-3/4 md:w-1/3"
        />
        <p
          className={cn(
            componentsClassNames.xl3.className,
            "stroke absolute translate-y-2/4 bottom-0",
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
            className={cn("font-semibold", componentsClassNames.xl3.className)}
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
          <p className={cn(componentsClassNames.xl2.className, "font-light")}>
            Альметьевск{" "}
            <span className={cn(componentsClassNames.base.className)}>
              (Russian)
            </span>
          </p>
          <p className={cn(componentsClassNames.xl2.className, "font-light")}>
            Әлмәт{" "}
            <span className={cn(componentsClassNames.base.className)}>
              (Tatar)
            </span>
          </p>
          <p className={cn(componentsClassNames.lg.className, "md:!mt-8")}>
            In the Republic of Tatarstan, Almetyevsk is often called the “Oil
            Capital”: the city is home to the headquarters of Tatneft and 80% of
            its population is employed by the oil sector.
          </p>
        </div>
      </div>
      <p className={cn(componentsClassNames.lg.className)}>
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

  const Map = () => {
    const [planeOpen, setPlaneOpen] = useState(false);
    const [hotelOpen, setHotelOpen] = useState(false);

    const iconClassName =
      "aspect-square border-white border-2 rounded-md p-3 w-auto h-auto";

    const Container = ({
      icon,
      text,
      onClick,
    }: {
      text: string | React.ReactNode;
      onClick?: () => void;
      icon: React.ReactNode;
    }) => {
      return (
        <div
          className={cn(
            "flex items-center gap-4",
            onClick && "cursor-pointer",
            componentsClassNames.base.className
          )}
          onClick={onClick}
        >
          <div className="basis-[15%] flex-shrink-0 grid w-full h-full items-center justify-items-stretch">
            {icon}
          </div>
          {typeof text === "string" ? <p>{text}</p> : text}
        </div>
      );
    };

    return (
      <>
        <AntdConfigProvider>
          <Modal
            open={planeOpen}
            onCancel={() => setPlaneOpen(false)}
            className={cn(componentsClassNames.xl.className, "text-center")}
            cancelButtonProps={{ className: "hidden" }}
            onOk={() => setPlaneOpen(false)}
            okButtonProps={{ type: "default" }}
            title="Plane tickets"
          >
            <p className="mb-4 tex">
              When buying tickets, please note that the conference will take
              place on December 18-20.
            </p>
            <p className="font-bold">
              We recommend arriving on December 17, 2023.
            </p>
            <p className="font-bold">
              We recommend leaving on December 21, 2023.
            </p>
            <p className="mt-4 text-left">
              Free transfer to the conference’s location will be organized from
              the following points:
            </p>
            <ol className="list-decimal list-inside text-left">
              <li>Kazan-Passazhirskaya (Kazan railway station)</li>
              <li>Kazan-Passazhirskaya 2 (Kazan railway station)</li>
              <li>Kazan (Airport)</li>
              <li>Bugulma (Railway station)</li>
              <li>Bugulma (Airport)</li>
              <li>Begishevo (Airport Nizhnekamsk)</li>
            </ol>
            <p className="mt-4">
              If you have any questions, write at{" "}
              <Link
                className="font-bold hover:underline"
                href="mailto:biocon@itmo.ru"
              >
                biocon@itmo.ru
              </Link>
            </p>
          </Modal>
          <Modal
            open={hotelOpen}
            onCancel={() => setHotelOpen(false)}
            className={cn(componentsClassNames.xl.className, "text-center")}
            cancelButtonProps={{ className: "hidden" }}
            onOk={() => setHotelOpen(false)}
            okButtonProps={{ type: "default" }}
            title="Accommodation"
          >
            <p className="mb-4">
              You can find accommodation options in the city of Almetyevsk{" "}
              <Link className="font-bold hover:underline" href="#">
                here
              </Link>{" "}
              (the information will soon be updated).
            </p>
            <p className="mb-4">
              When booking accommodation, please note that the conference will
              take place on December 18-20.
            </p>
            <p className="font-bold">
              We recommend arriving on December 17, 2023.
            </p>
            <p className="font-bold">
              We recommend leaving on December 21, 2023.
            </p>
            <p className="mt-4">
              You can book accommodation at a hotel by writing at{" "}
              <Link className="font-bold hover:underline" href="mailto:">
                __________
              </Link>{" "}
              or calling{" "}
              <Link className="font-bold hover:underline" href="tel:">
                __________
              </Link>
              .
            </p>
            <p>
              If you experience any trouble, please write at{" "}
              <Link
                className="font-bold hover:underline"
                href="mailto:biocon@itmo.ru"
              >
                biocon@itmo.ru
              </Link>
              .
            </p>
          </Modal>
        </AntdConfigProvider>
        <Section>
          <H1>The terms of participation</H1>
          <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8")}>
            <Container
              icon={<RussianRubleIcon className={iconClassName} />}
              text={
                <p>
                  Participation is <b>free</b> for all types of participants!
                </p>
              }
            />
            <Container
              icon={<IdcardOutlined className={iconClassName} />}
              text={
                <p>
                  Attendee participants will be selected based on their letters
                  of motivation.
                  <br />
                  <br />
                  Contributed speaker and Science Slammer participants will be
                  selected based on their CVs, scientific background, and video
                  presentations.
                </p>
              }
            />
            <Container
              icon={<PlaneIcon className={iconClassName} />}
              text={
                <p>
                  Participants <b>pay their own travel expenses</b> to transfer
                  locations.
                  <br />
                  <br />
                  Please note that we have special offers for the conference
                  participants.
                  <br />
                  After registering, you can get <b>promo codes</b> for
                  discounts at our partner airline companies.
                </p>
              }
              onClick={() => setPlaneOpen(true)}
            />
            <Container
              icon={<UtensilsIcon className={iconClassName} />}
              text={
                <p>
                  During the days of the conference,{" "}
                  <b>meals and coffee breaks</b> will be organized for all
                  conference participants.
                </p>
              }
            />
            <Container
              icon={<BusIcon className={iconClassName} />}
              text={
                "Free shuttle service to Almetyevsk will be organized from the points indicated on the map"
              }
            />
            <Container
              icon={<HotelIcon className={iconClassName} />}
              text={
                <p>
                  Basic accommodation options at hotels that we recommend can be
                  found{" "}
                  <Link className="font-bold hover:underline" href="#">
                    here
                  </Link>
                  .
                  <br />
                  <br />
                  During the days of the conference, we will organize transfers
                  from these hotels to the conference location.
                </p>
              }
              onClick={() => setHotelOpen(true)}
            />
          </div>
          <Image src={MapImg} alt="Map image" />
        </Section>
      </>
    );
  };

  const Organizers = () => {
    return (
      <Section
        className="flex flex-col justify-center items-center"
        id="organizers"
      >
        <H1 className="text-right">Organizers</H1>
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
      <Map />
      <Separator />
      <Organizers />
      <Footer />
      <FloatButton.BackTop className="bg-white hover:bg-gray-200" href="#" />
      <Script id="yandex-metrika">{`
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(94808565, "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
        });
      `}</Script>
    </>
  );
}
