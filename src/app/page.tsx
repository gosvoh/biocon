"use client";

import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import Script from "next/script";

import React, { useState } from "react";

import Link from "@/components/link";
import { Separator as UiSeparator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import Aeroflot from "$/public/aeroflot.png";
import Blasatim from "$/public/blastim.png";
import Logo from "$/public/logo_transparent.png";
import MapImg from "$/public/map.png";
import OutlineCircle from "$/public/outline-circle.svg";
import S7 from "$/public/s7.png";
import S7Ad from "$/public/s7Ad.jpg";
import VenueImg from "$/public/venue.jpg";
import PCR from "$/public/PCR.png";
import { IdcardOutlined } from "@ant-design/icons";
import {
  BusIcon,
  HotelIcon,
  MapPin,
  PlaneIcon,
  RussianRubleIcon,
  UtensilsIcon,
} from "lucide-react";

import FloatButton from "antd/es/float-button";

import About from "@/components/about.section";
import H1 from "@/components/h1";
import OrganizerCard from "@/components/organizer.card";
import P from "@/components/paragraph";
import Program from "@/components/program.section";
import Section from "@/components/section";
import OrganizersSkeleton from "@/components/skeleton/orginizers";
import { Modal } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import { componentsClassNames } from "./classNames";
import AntdConfigProvider from "./providers/ant.config.provider";
import { useOrganizers } from "./providers/organizers.provider";
import SpeakersComp from "@/components/speakers.section";

const Registration = dynamic(() => import("./registration"));
const ContactDialog = dynamic(() => import("./contact.dialog"));
const MainNav = dynamic(() => import("@/components/main-nav"));
const MobileNav = dynamic(() => import("@/components/mobile-nav"));
const Footer = dynamic(() => import("./footer"));

function Navbar({
  setOpenContact,
  className,
  ...props
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
} & React.HTMLProps<HTMLDivElement>) {
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
}

export default function Home() {
  const [openContact, setOpenContact] = useState(false);
  const { organizers, organizersReady } = useOrganizers();

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
          <Registration />
        </div>
      </Section>
    </div>
  );

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

  function PartnerCard({
    image,
    alt,
    text,
    onClick,
    setModalOpen,
  }: {
    image: StaticImageData;
    alt: string;
    text: React.ReactNode;
    onClick?: () => void;
    setModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <div
        className={cn(
          "flex flex-col md:flex-row gap-8 items-center group",
          onClick && setModalOpen && "cursor-pointer"
        )}
        onClick={
          onClick && setModalOpen
            ? () => {
                onClick();
                setModalOpen(true);
              }
            : undefined
        }
      >
        <Image
          src={image}
          alt={alt}
          sizes="(max-width: 640px) 100vw, 20vw"
          className={cn(
            "sm:max-md:w-9/12 flex-1 basis-1/5 object-contain rounded-lg"
          )}
        />
        <div
          className={cn(
            "flex flex-col gap-4 ",
            "border border-white rounded-lg p-8",
            "flex-1 basis-4/5",
            onClick &&
              setModalOpen &&
              "group-hover:text-black group-hover:bg-white transition-all"
          )}
        >
          {text}
        </div>
      </div>
    );
  }
  const Partners = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setMC] = useState(<></>);
    const setModalContent = (
      company: string,
      additionalContent?: React.ReactNode
    ) => {
      setModalTitle(() => company);
      setMC(() => (
        <>
          <p className="text-center">
            We are pleased to announce that {company} is a partner of the
            conference and provides discounts on the purchase of air tickets for
            participants of the BIOCON 2023.
          </p>
          <p className="text-center mt-4">
            In order to get a discount on the purchase of a ticket, you need to
            register for the conference.
          </p>
          {additionalContent}
        </>
      ));
    };

    return (
      <Section>
        <Modal
          open={modalOpen}
          onCancel={() => setModalOpen(false)}
          onOk={() => setModalOpen(false)}
          cancelButtonProps={{ className: "hidden" }}
          okButtonProps={{ type: "default" }}
          title={<div className="text-center">{modalTitle}</div>}
          centered
          width={1000}
        >
          {modalContent}
        </Modal>
        <H1 className="text-right">Partners</H1>
        <div className="flex flex-col gap-12">
          <PartnerCard
            image={Aeroflot}
            alt="Aeroflot logo"
            setModalOpen={setModalOpen}
            text={
              <P>
                <Link
                  className="hover:underline"
                  href="https://www.aeroflot.ru/xx-en"
                >
                  Aeroflot
                </Link>{" "}
                is the leading company in Russian commercial aviation and the
                national carrier. Company was founded on 17 March 1923 and is
                both one of the oldest airlines in the world and one of the most
                recognisable Russian brands.
              </P>
            }
            onClick={() => setModalContent("Aeroflot")}
          />
          <PartnerCard
            image={S7}
            alt="S7 Airlines logo"
            setModalOpen={setModalOpen}
            text={
              <P>
                <Link className="hover:underline" href="https://www.s7.ru/">
                  S7 Airlines
                </Link>{" "}
                is the largest private airline in Russia, with the most modern
                fleet in the Russian air transit market. Their extensive network
                of routes allows our passengers to travel to 181 cities in 26
                countries across the world.
              </P>
            }
            onClick={() =>
              setModalContent(
                "S7 Airlines",
                <Image
                  src={S7Ad}
                  alt="S7 Airlines ad"
                  sizes="100vw"
                  className="rounded-lg mt-8"
                />
              )
            }
          />
          <PartnerCard
            image={Blasatim}
            alt="Blastim logo"
            text={
              <P>
                <Link className="hover:underline" href="https://blastim.ru/">
                  Blastim
                </Link>{" "}
                is an Edtech-company specializing in bioinformatics,
                biochemistry, machine learning, and programming. Since 2015
                Blastim has organized courses, webinars, job fairs to help
                people with building a network and growing in a professional
                field.
              </P>
            }
          />
          <PartnerCard
            image={PCR}
            alt="PCR.NEWS logo"
            text={
              <P>
                <Link className="hover:underline" href="https://pcr.news/">
                  PCR.NEWS
                </Link>{" "}
                is a Russian-language information and analytical portal
                concerning molecular diagnostics and related fields of science
                and practice: molecular biology and medicine. Portal’s materials
                are addressed to professional community of research scientists
                specializing in molecular diagnostics, as well as for
                specialists in laboratory diagnostics, clinicians,
                biotechnologists, and graduate and undergraduate students in
                Life sciences and medicine.
              </P>
            }
          />
        </div>
      </Section>
    );
  };

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
      "aspect-square border-white border-2 rounded-md p-3 w-auto h-auto transition-all";

    const Container = ({
      icon,
      text,
      onClick,
      className,
    }: {
      text: string | React.ReactNode;
      onClick?: () => void;
      icon: React.ReactNode;
      className?: string;
    }) => {
      return (
        <div
          className={cn(
            "flex items-start gap-4",
            onClick && "cursor-pointer",
            componentsClassNames.base.className,
            className,
            "group"
          )}
          onClick={onClick}
        >
          <div
            className={cn(
              "basis-[15%] flex-shrink-0 grid w-full h-full items-start justify-items-stretch"
            )}
          >
            {icon}
          </div>
          {typeof text === "string" ? <p>{text}</p> : text}
        </div>
      );
    };

    return (
      <>
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
            When buying tickets, please note that the conference will take place
            on December 18-20.
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
            <Link
              className="font-bold hover:underline"
              href="/Hotels Almetyevsk for BIOCON 2023.pdf"
            >
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
              icon={
                <PlaneIcon
                  className={cn(
                    iconClassName,
                    "group-hover:bg-white group-hover:text-black"
                  )}
                />
              }
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
              icon={<BusIcon className={iconClassName} />}
              text={
                "Free shuttle service to Almetyevsk will be organized from the points indicated on the map"
              }
            />
            <Container
              icon={
                <HotelIcon
                  className={cn(
                    iconClassName,
                    "group-hover:bg-white group-hover:text-black"
                  )}
                />
              }
              text={
                <p>
                  Basic accommodation options at hotels that we recommend can be
                  found{" "}
                  <Link
                    className="font-bold hover:underline"
                    href="/Hotels Almetyevsk for BIOCON 2023.pdf"
                  >
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
        <H1>Organizers</H1>
        <div className="w-full flex flex-wrap gap-4 md:gap-10 justify-items-center justify-center">
          {organizers.length === 0 || !organizersReady
            ? Array.from({ length: 5 }).map((_, i) => (
                <OrganizersSkeleton key={i} />
              ))
            : organizers.map((organizer) => (
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
    <AntdConfigProvider>
      <ContactDialog open={openContact} onOpenChange={setOpenContact} />
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
      <Map />
      <Separator />
      <Partners />
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
    </AntdConfigProvider>
  );
}
