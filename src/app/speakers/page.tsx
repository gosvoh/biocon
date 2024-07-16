import Image from "next/image";
import { cn } from "@/lib/utils";

import HeroGlow from "@public/HeroGlow.svg";
import SpeakersPageLogoDesktop from "@public/speakers_page/speakers_desktop.svg";
import SpeakersPageLogoMobile from "@public/speakers_page/speakers_mobile.svg";

import ButtonRegistration from "@/components/button.registration";
import BottomGlow from "@public/BottomGlow.svg";
import { speakersOnPage } from "@/app/speakers/speakersOnPage";
import Card from "@/components/card";
import { MapPin, Trophy } from "lucide-react";

export default function SpeakersPage() {
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
        <div className={"hidden flex-col gap-5 lg:flex"}>
          {speakersOnPage.map((speaker, index) => (
            <Card key={index} className="p-0">
              <div className={"grid grid-cols-[1.25fr_1.5fr] "}>
                <Image
                  src={speaker.photo}
                  alt={""}
                  className={"rounded-l-[23px] w-full h-full"}
                />
                <div
                  className={
                    "flex flex-col gap-6 p-9 pt-7 font-light w-full text-lg"
                  }
                >
                  <p className={"text-2xl font-normal"}>{speaker.name}</p>
                  <div className={"flex flex-col gap-3"}>
                    <p>{speaker.university}</p>
                    <p className={"flex gap-2 items-center"}>
                      <div className="lg:w-5 lg:h-5">
                        <Trophy className="w-full h-full" />
                      </div>
                      {speaker.subtitle}
                    </p>
                  </div>
                  <div className="p-3 border border-white rounded-full w-[50%] text-center">
                    h-index: {speaker.hIndex}
                  </div>
                  <p>{speaker.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className={"flex flex-col gap-5 lg:hidden"}>
          {speakersOnPage.map((speaker, index) => (
            <div
              key={index}
              className="rounded-[16px] grid grid-rows-[auto, auto] bg-[#6B2DAD] gap-7"
            >
              <div className="relative">
                <Image
                  src={speaker.photo}
                  alt={""}
                  className="w-full h-auto rounded-t-[16px] aspect-[4/3] object-cover"
                />
              </div>
              <div className="p-9 pt-0 flex flex-col gap-5 text-center font-light justify-center items-center">
                <p className={"font-normal text-lg"}>{speaker.name}</p>
                <p className={"font-normal"}>{speaker.university}</p>
                <p className={"font-normal flex gap-2 items-center"}>
                  <Trophy /> {speaker.subtitle}{" "}
                </p>
                <div className="p-2 border border-white rounded-full w-[60%]">
                  h-index: {speaker.hIndex}
                </div>
                <p>{speaker.description}</p>
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
