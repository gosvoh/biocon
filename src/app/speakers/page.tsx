import Image from "next/image";
import { cn } from "@/lib/utils";
import { biocon } from "@/db/db";
import { Speakers } from "@/db/schema";
import HeroGlow from "@public/HeroGlow.svg";
import SpeakersPageLogoDesktop from "@public/speakers_page/speakers_desktop.svg";
import SpeakersPageLogoMobile from "@public/speakers_page/speakers_mobile.svg";

import ButtonRegistration from "@/components/button.registration";
import BottomGlow from "@public/BottomGlow.svg";
import Card from "@/components/card";
import { Trophy } from "lucide-react";
import { findCountryFlagByName } from "@/app/speakers/country.flags";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "BIOCON 2024 - Speakers",
  openGraph: {
    title: "BIOCON 2024 - Speakers",
    description: "Speakers page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/SPEAKERS.png",
      secureUrl: "https://biocon.international/openGraph/SPEAKERS.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - Speakers",
    description: "Speakers page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/SPEAKERS.png"],
  },
};

export default async function SpeakersPage() {
  let speakers: (typeof Speakers.$inferSelect)[] = [];
  try {
    speakers = await biocon.select().from(Speakers);
  } catch (e) {
    console.error(e);
  }

  return (
    <main>
      <section
        className={cn(
          "relative text-center",
          "text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          "py-8",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px]",
        )}
      >
        <Image
          src={HeroGlow}
          alt=""
          className={cn(
            "absolute  top-1/3 left-1/2 w-fit h-[250%] -z-10",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none",
          )}
        />
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px]">
          <Image
            src={SpeakersPageLogoDesktop}
            alt="Biocon"
            className="hidden md:block w-[80%] mx-auto"
          />
          <Image
            src={SpeakersPageLogoMobile}
            alt="Biocon"
            className="block md:hidden w-full"
          />
        </div>
        <div className="wrapper">
          <ButtonRegistration text={"I want to be a speaker"} />
        </div>
      </section>
      <section className="relative space-y-6 md:space-y-9">
        <div className={"hidden flex-col gap-5 xl:flex"}>
          {speakers.map((speaker, index) => (
            <Card key={index} className="p-0 relative">
              <Image
                alt={""}
                width={"90"}
                height={"180"}
                src={findCountryFlagByName(speaker.country)}
                className={
                  "absolute right-10 top-10 border-white border-[1px] rounded-[10px]"
                }
              />
              <div className={"grid grid-cols-[25rem_2fr] "}>
                <div
                  className={
                    "relative rounded-l-[25px] overflow-hidden aspect-[3/4] w-full  h-full"
                  }
                >
                  <Image
                    className={"object-cover"}
                    src={"/images/" + speaker.image}
                    alt=""
                    fill
                  />
                </div>
                <div
                  className={
                    "flex flex-col gap-6 p-12 pt-7 font-light w-full text-lg"
                  }
                >
                  <div>
                    <Link
                      href={speaker.nameUrl}
                      target={"_blank"}
                      className={"link-hover-underline"}
                    >
                      <p className={"text-2xl font-normal"}>{speaker.name}</p>
                    </Link>
                  </div>
                  <div className={"flex flex-col gap-3 font-normal"}>
                    <div>
                      <Link
                        href={speaker.universityUrl}
                        target={"_blank"}
                        className={"link-hover-underline"}
                      >
                        <p>{speaker.university}</p>
                      </Link>
                    </div>
                    <div>
                      {speaker.thunderUrl ? (
                        <Link
                          href={speaker.thunderUrl}
                          target={"_blank"}
                          className={"link-hover-underline"}
                        >
                          <div className={"flex gap-2 items-center"}>
                            <div className="lg:w-5 lg:h-5">
                              <Trophy className="w-full h-full" />
                            </div>
                            <p>{speaker.thunder}</p>
                          </div>
                        </Link>
                      ) : (
                        speaker.thunder && (
                          <div className={"flex gap-2 items-center"}>
                            <div className="lg:w-5 lg:h-5">
                              <Trophy className="w-full h-full" />
                            </div>
                            <p>{speaker.thunder}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  {speaker.hIndex && (
                    <div className="p-5 pl-12 pr-12 border-2 border-white rounded-[66px] min-w-[30%] max-w-max text-center whitespace-nowrap">
                      h-index: {speaker.hIndex}
                    </div>
                  )}
                  <div
                    className={"whitespace-pre-line"}
                    dangerouslySetInnerHTML={{
                      __html: String(speaker.description),
                    }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className={"flex flex-col gap-5 xl:hidden"}>
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="rounded-[16px] grid grid-rows-[auto, auto] bg-[#6B2DAD] gap-7"
            >
              <div
                className={
                  "relative rounded-t-[16px] overflow-hidden aspect-[5/4] w-full"
                }
              >
                <Image
                  alt={""}
                  width={"70"}
                  height={"140"}
                  src={findCountryFlagByName(speaker.country)}
                  className={
                    "absolute right-5 top-5 z-20 border-white border-[1px] rounded-[10px]"
                  }
                />
                <Image
                  className={"object-cover z-10 aspect-auto"}
                  src={"/images/" + speaker.image}
                  alt=""
                  fill
                />
              </div>
              <div className="p-9 pt-0 flex flex-col gap-4 text-center font-light justify-center items-center">
                <Link
                  href={speaker.nameUrl}
                  className={"underline"}
                  target={"_blank"}
                >
                  <p className={"font-normal text-lg"}>{speaker.name}</p>
                </Link>
                <Link
                  href={speaker.universityUrl}
                  className={"underline"}
                  target={"_blank"}
                >
                  <p className={"font-normal"}>{speaker.university}</p>
                </Link>
                {speaker.thunderUrl ? (
                  <Link
                    href={speaker.thunderUrl}
                    className={"underline"}
                    target={"_blank"}
                  >
                    <p className={"font-normal flex gap-2 items-center"}>
                      <Trophy /> {speaker.thunder}{" "}
                    </p>
                  </Link>
                ) : (
                  speaker.thunder && (
                    <p className={"font-normal flex gap-2 items-center"}>
                      <Trophy /> {speaker.thunder}{" "}
                    </p>
                  )
                )}
                {speaker.hIndex && (
                  <div className="p-2 border border-white rounded-full w-[60%]">
                    h-index: {speaker.hIndex}
                  </div>
                )}
                <div className=" overflow-wrap whitespace-pre-line hyphens-auto break-words break-all">
                  <p>{speaker.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Image
          src={BottomGlow}
          alt=""
          className="absolute h-[150%] w-fit md:w-[150%] md:h-fit max-w-none -translate-x-1/2 -bottom-10 left-1/2 -z-10"
        />
      </section>
    </main>
  );
}
