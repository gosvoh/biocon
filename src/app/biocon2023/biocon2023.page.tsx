import { cn } from "@/lib/utils";
import Image from "next/image";
import { Architects_Daughter } from "next/font/google";
import LogoDesktop from "@public/LogoDesktop.png";
import LogoMobile from "@public/LogoMobile.png";
import boom_right from "@public/boom_right.svg";
import boom_left from "@public/boom_left.svg";
import boom_down from "@public/boom_down.svg";
import { Speakers2023 } from "@/db/schema";

import "./noise.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel.speakers.organizers";
import MediaAboutUsAsyncCarousel from "@/components/media.about.us.async.carousel";
import CarouselFeedback from "@/components/carousel.feedback";

// glows
import UpperGlow from "@public/previous_biocon/glow/upper.svg";
import LeftGlow from "@public/previous_biocon/glow/left.svg";
import BottomGlow from "@public/previous_biocon/glow/lower.svg";
import UpperGlowPC from "@public/previous_biocon/glow/upperPC.svg";
import LeftGlowPC from "@public/previous_biocon/glow/leftPC.svg";
import BottomGlowPC from "@public/previous_biocon/glow/lowerPC.svg";
import MediaAboutUsGlowPC from "@public/previous_biocon/glow/RightGlowMediaAboutUs.svg";

// gallery
import img1 from "@public/previous_biocon/BXrm3Nh1_AI.jpg";
import speaker1 from "@public/previous_biocon/KH05oj8MpPo.jpg";
import speaker2 from "@public/previous_biocon/mirza.jpeg";
import img4 from "@public/previous_biocon/D-BUvQriEfw.jpg";
import speaker1_square from "@public/previous_biocon/speaker_square.jpg";
import speaker3_square from "@public/previous_biocon/speaker2_square.jpeg";
import mirzamob from "@public/previous_biocon/mirzamob.jpeg";

// lower gallery
import lower_anna_speaker from "@public/previous_biocon/ZZZ_6500.jpg";
import lower_man_speaker from "@public/previous_biocon/ZZZ_5948.jpg";
import lower_woman_speaker from "@public/previous_biocon/ZZZ_7525.jpg";
import lower_man_affiliation_speaker from "@public/previous_biocon/ZZZ_9953.jpg";
import lower_man_with_glasses_speaker from "@public/previous_biocon/ZZZ_2148.jpg";

import Barua from "@public/humans/Barua.jpg";
import Kalinikin from "@public/humans/Kalinikin.jpg";
import Khayrova from "@public/humans/Khayrova.jpg";
import Polyansky from "@public/humans/Polyansky.jpg";
import Tracey from "@public/humans/Tracey.jpg";

const font = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
});

const prepareSpeakers = (speakers: (typeof Speakers2023.$inferSelect)[]) => {
  const typeOrder = [
    "Plenary speakers",
    "Genomics and structural biology",
    "Gene therapy",
    "Viruses & Vaccines",
    "Agriculture & Environment",
    "Biomaterials",
    "Food biotechnology",
    "Biotech Open Mic",
  ];

  const typesOfSpeakers = speakers
    .reduce((accumulator, currentValue) => {
      if (accumulator.indexOf(currentValue.type) == -1) {
        accumulator.push(currentValue.type);
      }
      return accumulator;
    }, [] as string[])
    .sort((a, b) => {
      return typeOrder.indexOf(a) - typeOrder.indexOf(b);
    })
    .reverse();

  return typesOfSpeakers
    .map((type) => {
      const typeData = speakers.filter((speaker) => speaker.type === type);
      return { type, speakersData: typeData };
    })
    .reverse();
};

export default function Biocon2023Page({
  data,
}: {
  data: (typeof Speakers2023.$inferSelect)[];
}) {
  const preparedData = prepareSpeakers(data);
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
        <Image
          src={UpperGlow}
          alt={""}
          className={"absolute w-full -top-1/4 right-0 -z-10 lg:hidden blur-md"}
        />
        <Image
          src={UpperGlowPC}
          alt={""}
          className={
            "absolute -top-[36%] w-full h-[300%] -z-10 hidden lg:block blur-md"
          }
        />
        <div
          className={
            "flex flex-col lg:flex-row lg:items-baseline lg:justify-center text-center lg:gap-5"
          }
        >
          <h1 className="lg:text-[2.75rem]">BIOCON 2023</h1>
          <h1 className={"hidden lg:block"}>—</h1>
          <h2 className={cn("text-[#7DEB9A] lg:text-6xl", font.className)}>
            how was it?
          </h2>
        </div>
      </section>

      <section className={"relative fcol gap-8"}>
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
        <div className={"relative fcol gap-4 lg:hidden"}>
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
        <button className={"main-button"}>
          <a
            href={"https://vk.com/album-221897115_300549037"}
            target={"_blank"}
          >
            View full photo report
          </a>
        </button>
        <Image
          src={LeftGlow}
          alt={""}
          className={
            "absolute -z-10 left-0 w-full h-[150%] top-[10%] lg:hidden blur-md"
          }
        />
      </section>

      <Image
        src={LeftGlowPC}
        alt={""}
        className={
          "absolute -z-10 -left-0 w-full top-[15%] blur-md hidden lg:block"
        }
      />

      <section className={"relative"}>
        <h2>Conference results</h2>
        <div className={"fcol gap-10"}>
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
            <div className={"fcol gap-2 lg:gap-3"}>
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
            <div className={"fcol gap-1 lg:gap-3"}>
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
            <div className={"fcol gap-1 lg:gap-3"}>
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
            <div className={"fcol gap-1 lg:gap-3"}>
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
        <Image
          src={MediaAboutUsGlowPC}
          alt={"glow"}
          className={
            "absolute -right-16 w-full -bottom-[60%] -z-10 hidden lg:block blur-md"
          }
        />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <h2>Media about us</h2>
        <MediaAboutUsAsyncCarousel />
      </section>

      <section className="relative fcol gap-3 lg:gap-6">
        <h2 className="m-0">BIOCON’23 speakers</h2>
        <div className={"hidden lg:block"}>
          {preparedData.map((speakerData, index) => (
            <>
              <h3 className={`mb-6 ${index !== 0 ? "mt-8" : ""}`}>
                {speakerData.type}
              </h3>
              <div className="grid-cols-4 gap-7 grid">
                {speakerData.speakersData.map((speaker, index) => (
                  <div
                    key={index}
                    className="grid grid-rows-[1fr,0.5fr] xl:grid-rows-[1fr,0.3fr] gap-6"
                  >
                    <div
                      className={
                        "relative rounded-[28px] overflow-hidden aspect-square w-full"
                      }
                    >
                      <Image
                        className={"object-cover"}
                        src={"/images/" + speaker.image}
                        alt=""
                        fill
                      />
                    </div>
                    <div>
                      <p className={"text-center"}>{speaker.name}</p>
                      <p className={"font-light text-lg text-center"}>
                        {speaker.university}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
        <div className={"lg:hidden"}>
          {preparedData.map((speakerData) => (
            <>
              <h3 className="mb-6">{speakerData.type}</h3>
              <Carousel>
                <CarouselContent>
                  {speakerData.speakersData.map((speaker, index) => (
                    <CarouselItem
                      key={index}
                      className={"md:basis-1/2 xl:basis-1/3"}
                    >
                      <div
                        key={index}
                        className="grid grid-rows-[1fr,0.3fr] gap-5"
                      >
                        <div
                          className={
                            "relative rounded-[28px] overflow-hidden aspect-square w-full"
                          }
                        >
                          <Image
                            className={"object-cover"}
                            src={"/images/" + speaker.image}
                            alt=""
                            fill
                          />
                        </div>
                        <div>
                          <p className={"text-center"}>{speaker.name}</p>
                          <p className={"font-light lg:text-lg text-center"}>
                            {speaker.university}
                          </p>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious speakers />
                <CarouselNext speakers />
              </Carousel>
            </>
          ))}
        </div>
        {preparedData.length && preparedData.length >= 3 && (
          <>
            <Image
              src={LeftGlowPC}
              alt={""}
              className={
                "absolute blur-md rotate-180 right-0 -z-10 bottom-[10%] w-[150%] h-full hidden lg:block max-w-none"
              }
            />
            <Image
              src={LeftGlow}
              alt={""}
              className={
                "absolute blur-md block lg:hidden rotate-180 right-0 -z-10 w-[150%] h-fit top-0 max-w-none"
              }
            />
          </>
        )}
      </section>

      <section className="relative">
        <h2 className={"text-center lg:text-left"}>
          Feedback from participants
        </h2>
        <CarouselFeedback
          cardContent={[
            {
              icon: Kalinikin,
              name: "Danila Kalinikin",
              affiliation: "AI Talent Hub",
              description:
                "BIOCON is a platform with a high concentration of expertise in the field of biotech and new technologies. For me, as a person from the entrepreneurial environment, BIOCON has become a reference point in forming new connections with industry representatives. I can confidently say that BIOCON is a place of attraction of opportunities and biotech content of high quality.",
              tg: "@Chem_Dan",
            },
            {
              icon: Tracey,
              name: "Chantal Tracey",
              affiliation: "SCAMT, ITMO University",
              description:
                "BIOCON 2023 was absolutely electric. Every day was jam packed with interesting presentations that describe highly innovative approaches to solving many of the sustainability challenges of the twenty-first century. The little 'mini excursions' to interesting places around Almetyevsk were nice interludes between the conference sessions. The conference was also an excellent networking opportunity, where everyone from bachelor's students to highly cited leading biotechnologists were able to converse and share ideas and entertain potential collaboration. I highly recommend attending BIOCON 2024.",
              tg: "@Chantalena",
            },
            {
              icon: Khayrova,
              name: "Adelya Khayrova",
              affiliation: "Russian Academy of Sciences",
              description:
                "I really enjoyed the BIOCON 2023 conference held in Almetyevsk last year. It was exceptionally well-organised, featuring fun and engaging formats like TED-style presentations. The networking opportunities were fantastic, allowing me to meet and connect with leading experts from the biotech industry. The laboratory tour and discussions with established foreign researchers were particularly enriching, providing valuable insights and fostering meaningful professional connections. I highly recommend this conference for industry professionals, academics, and young students considering a career in biotechnology",
              tg: "@adelya_khayrova",
            },
            {
              icon: Barua,
              name: "Subhrajit Barua",
              affiliation: "ITMO University",
              description:
                "BIOCON 2023 made me an integral part of the Faculty of Biotechnologies at ITMO University. I made some invaluable connections and expanded my network",
              tg: "@subhrajit_barua",
            },
            {
              icon: Polyansky,
              name: "Dmitriy Polyansky",
              affiliation:
                "N.F. Gamaleya National Research Center for Epidemiology and Microbiology",
              description:
                "BIOCON 2023 is a great opportunity to prove yourself. This event allowed me to learn in more detail about the most promising and sought-after areas in biotechnology. It is worth noting that the organizers did a great job. Everything from the meeting at the airport to the closing of the conference was at the highest level. This show will forever remain in my memory.",
              tg: "@Dmitriy_Polyansky",
            },
          ]}
        />
      </section>

      <Image
        src={BottomGlowPC}
        alt={""}
        className={"absolute -z-10 -bottom-[3%] w-full hidden lg:block"}
      />
      <Image
        src={BottomGlow}
        alt={""}
        className={"absolute -bottom-[5%] -z-10 w-full lg:hidden"}
      />
    </main>
  );
}
