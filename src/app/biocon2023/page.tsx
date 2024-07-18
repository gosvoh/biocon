import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import { Architects_Daughter } from "next/font/google";
import LogoDesktop from "@public/LogoDesktop.png";
import LogoMobile from "@public/LogoMobile.png";
import boom_right from "@public/boom_right.svg";
import boom_left from "@public/boom_left.svg";
import boom_down from "@public/boom_down.svg";
import { Speakers2023 } from "@/db/schema";
import { biocon } from "@/db/db";

import "./noise.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel.speakers";

// gallery
import img1 from "@public/previous_biocon/BXrm3Nh1_AI.jpg";
import speaker1 from "@public/previous_biocon/KH05oj8MpPo.jpg";
import speaker2 from "@public/previous_biocon/mirza.jpeg";
import img4 from "@public/previous_biocon/D-BUvQriEfw.jpg";
import ButtonRegistration from "@/components/button.registration";
import speaker1_square from "@public/previous_biocon/speaker_square.jpg";
import speaker3_square from "@public/previous_biocon/speaker2_square.jpeg";
import mirzamob from "@public/previous_biocon/mirzamob.jpeg";

// lower gallery
import lower_anna_speaker from "@public/previous_biocon/ZZZ_6500.jpg";
import lower_man_speaker from "@public/previous_biocon/ZZZ_5948.jpg";
import lower_woman_speaker from "@public/previous_biocon/ZZZ_7525.jpg";
import lower_man_affiliation_speaker from "@public/previous_biocon/ZZZ_9953.jpg";
import lower_man_with_glasses_speaker from "@public/previous_biocon/ZZZ_2148.jpg";

// glows
import SideGlow from "@public/SideGlow.svg";
import BigSideGlow from "@public/BigSideGlow.svg";
import BottomGlow from "@public/BottomGlow.svg";
import "./noise.css";

import { plenary_speakers } from "@/app/biocon2023/speakers";

const font = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
});

const LeftGlow = ({
  className,
  big = false,
}: {
  className?: string;
  big?: boolean;
}) => (
  <div>
    <Image
      src={big ? BigSideGlow : SideGlow}
      alt=""
      className={cn(
        "absolute top-1/2 -left-40 -z-10 h-fit w-full px-0 -translate-y-1/2 max-w-none rotate-180",
        className,
      )}
    />
  </div>
);

const getSpeakers = async () => {
  let speakers: (typeof Speakers2023.$inferSelect)[] = [];
  try {
    speakers = await biocon.select().from(Speakers2023);
  } catch (e) {
    console.error(e);
  }
  return speakers;
};

export default function PreviousPage() {
  return (
    <main className="relative noise">
      <section
        className={cn(
          "relative text-center",
          "text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          "py-8",
          "mt-10 lg:mt-20",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px]",
        )}
      >
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px]">
          <Image
            src={LogoDesktop}
            alt="Biocon"
            className="hidden md:block w-[80%] mx-auto"
          />
          <Image
            src={LogoMobile}
            alt="Biocon"
            className="block md:hidden w-full"
          />
        </div>
        <div className="flex flex-col text-center">
          <h1 className="font-[500]">BIOCON 2023</h1>
          <h2
            className={cn(
              "lg:text-3xl font-normal text-[#7DEB9A]",
              font.className,
            )}
          >
            How was it?
          </h2>
        </div>
      </section>

      <section className={"relative flex flex-col gap-8"}>
        <div className={"lg:flex lg:flex-col hidden relative gap-8"}>
          <Image
            src={boom_right}
            alt={"boom"}
            className="absolute -right-12 -top-24 w-16"
          />
          <div className="grid grid-cols-[2fr_0.8fr] gap-8">
            <div className="grid grid-rows-2 gap-8">
              <div className="grid grid-cols-[1.5fr_1fr] gap-8">
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={img1}
                    alt="GL"
                  />
                </div>
                <div className="relative flex items-center justify-center">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full aspect-square"
                    src={speaker1_square}
                    alt="GL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_1.5fr] gap-8">
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full aspect-square"
                    src={speaker3_square}
                    alt="GL"
                  />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={img4}
                    alt="GL"
                  />
                </div>
              </div>
            </div>
            <div className="relative flex items-stretch h-full">
              <Image
                className="rounded-[28px] object-cover w-full h-full"
                src={speaker2}
                alt="GL"
              />
            </div>
          </div>
          <div className="grid grid-cols-[0.775fr_2fr] gap-8">
            <div className="relative flex items-stretch h-50%">
              <Image
                className="rounded-[28px] object-cover w-full h-50% scale-1.3"
                src={lower_anna_speaker}
                alt="GL"
              />
            </div>
            <div className="grid grid-rows-2 gap-8">
              <div className="grid grid-cols-[1fr_1.5fr] gap-8">
                <div className="relative flex items-center justify-center">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full aspect-square"
                    src={lower_man_speaker}
                    alt="GL"
                  />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={lower_woman_speaker}
                    alt="GL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1.5fr_1fr] gap-8">
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={lower_man_affiliation_speaker}
                    alt="GL"
                  />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full aspect-w-1 aspect-h-1"
                    src={lower_man_with_glasses_speaker}
                    alt="GL"
                  />
                </div>
              </div>
            </div>
          </div>
          <Image
            src={boom_down}
            alt={"boom"}
            className="absolute -left-12 -bottom-[6rem] w-16"
          />
        </div>
        <div className={"relative flex flex-col gap-4 lg:hidden"}>
          <div className={"relative flex justify-between"}>
            <Image
              src={boom_left}
              alt=""
              className="absolute -left-[1.5rem] top-1/2 transform -translate-y-1/2 w-[2rem]"
            />
            <Image
              src={boom_right}
              alt=""
              className="absolute -right-[1.5rem] top-1/2 transform -translate-y-1/2 w-[2rem]"
            />
          </div>
          <Image className={"rounded-[16px]"} src={img1} alt={"GL"} />
          <div className={"grid grid-cols-2 gap-3"}>
            <Image className={"rounded-[16px]"} src={speaker1} alt={"GL"} />
            <Image className={"rounded-[16px]"} src={mirzamob} alt={"GL"} />
          </div>
          <Image className={"rounded-[16px]"} src={img4} alt={"GL"} />
        </div>
        <ButtonRegistration text={"View full photo report"} />
      </section>

      <section>
        <h2 className="font-normal">Conference results</h2>
        <div className={"flex flex-col gap-10"}>
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-[16px]"
              src="https://www.youtube.com/embed/TzZ0n7WioLQ?si=MsOyjs3zfsLMjO1Y"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-12 text-center font-light lg:grid-cols-4 lg:grid-rows-1 lg:text-2xl text-xl ">
            <div className={"flex flex-col gap-2 lg:gap-3"}>
              <h1
                className={cn(
                  "m-0 text-[#A659FF] font-light text-4xl lg:text-7xl",
                  font.className,
                )}
              >
                17
              </h1>
              <p>
                participating <br />
                countries
              </p>
            </div>
            <div className={"flex flex-col gap-1 lg:gap-3"}>
              <h2
                className={cn(
                  "m-0  text-[#7DEB9A] font-light text-4xl lg:text-7xl",
                  font.className,
                )}
              >
                250+
              </h2>
              <p>participants</p>
            </div>
            <div className={"flex flex-col gap-1 lg:gap-3"}>
              <h2
                className={cn(
                  "m-0 text-[#7DEB9A] lg:text-[#A659FF] font-light text-4xl lg:text-7xl",
                  font.className,
                )}
              >
                50+
              </h2>
              <p>
                speakers <br /> and experts
              </p>
            </div>
            <div className={"flex flex-col gap-1 lg:gap-3"}>
              <h2
                className={cn(
                  "m-0 text-[#A659FF] lg:text-[#7DEB9A] font-light text-4xl lg:text-7xl",
                  font.className,
                )}
              >
                90+
              </h2>
              <p>affiliations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex flex-col gap-3 lg:gap-6">
        <h2 className="font-normal m-0">BIOCON’23 speakers</h2>
        <h3 className="font-normal lg:mb-6 mb-2">Plenary speakers</h3>
        <div className="hidden grid-cols-4 gap-14 lg:grid">
          {plenary_speakers.map((speaker, index) => (
            <div
              key={index}
              className="grid grid-rows-[1fr,0.5fr] xl:grid-rows-[1fr,0.3fr] gap-5"
            >
              <Image
                className="rounded-[28px] h-full object-cover aspect-square"
                src={speaker.src}
                alt=""
              />
              <div>
                <p className={"text-center"}>{speaker.name}</p>
                <p className={"font-light text-lg text-center"}>
                  {speaker.university}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className={"lg:hidden"}>
          <Carousel>
            <CarouselContent>
              {getSpeakers().then((speakers) =>
                speakers.map((speaker, index) => (
                  <CarouselItem
                    key={index}
                    className={"md:basis-1/2 xl:basis-1/3"}
                  >
                    <div
                      key={index}
                      className="grid grid-rows-[1fr,0.4fr] gap-5"
                    >
                      <Image
                        className="rounded-[28px] h-full object-cover aspect-square"
                        src={"/" + speaker.image}
                        alt="Description of the image"
                        layout="fill"
                        objectFit="cover"
                      />
                      <div>
                        <p className={"text-center"}>{speaker.name}</p>
                        <p className={"font-light lg:text-lg text-center"}>
                          {speaker.university}
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                )),
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <LeftGlow className={"ml-20 w-[150%] h-fit"} />
      <LeftGlow big className={"lg:block hidden"} />
      <Image
        src={BottomGlow}
        alt=""
        className="absolute w-fit md:w-fit md:h-fit max-w-none -translate-x-1/2 -top-20 left-1/2 -z-10 rotate-180"
      />
      <Image
        src={BottomGlow}
        alt=""
        className="absolute w-fit md:h-fit max-w-none -translate-x-1/2 -bottom-10 left-1/2 -z-10"
      />
    </main>
  );
}
