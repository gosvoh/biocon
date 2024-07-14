import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoDesktop from "@public/LogoDesktop.png";
import LogoMobile from "@public/LogoMobile.png";
import boom_right from "@public/boom_right.svg";
import boom_left from "@public/boom_left.svg";

// gallery
import img1 from "@public/previous_biocon/BXrm3Nh1_AI.jpg";
import speaker1 from "@public/previous_biocon/KH05oj8MpPo.jpg";
import speaker2 from "@public/previous_biocon/mirza.jpeg";
import img4 from "@public/previous_biocon/D-BUvQriEfw.jpg";
import ButtonRegistration from "@/components/button.registration";

// glows
import leftglow from "@public/previous_biocon/glow/left.svg";
import lowerglow from "@public/previous_biocon/glow/lower.svg";
import upperglow from "@public/previous_biocon/glow/upper.svg";
import Carousel from "@/components/carousel";
import Media1 from "@public/media/1.png";
import Link from "next/link";


const PreviousPage = () => {
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
          src={upperglow}
          alt=""
          className={cn(
            "absolute top-0  w-full -z-10 h-fit -translate-y-[10%]",
            "max-w-none max-h-none",
          )}
        />
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
            className={"lg:text-3xl font-architect font-normal text-[#7DEB9A]"}
          >
            How was it?
          </h2>
        </div>
      </section>
      <section className={"relative flex flex-col gap-8"}>
        <Image
          src={leftglow}
          alt=""
          className={cn(
            "absolute -translate-y-20 left-0 w-full -z-10",
            "max-w-none max-h-none",
          )}
        />
        <div className={"relative flex flex-col gap-4"}>
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
            <Image className={"rounded-[16px]"} src={speaker2} alt={"GL"} />
          </div>
          <Image className={"rounded-[16px]"} src={img4} alt={"GL"} />
        </div>
        <ButtonRegistration text={"View full photo report"} />
      </section>
      <section>
        <h2 className="font-normal">Conference results</h2>
        <div className={"flex flex-col gap-10"}>
            <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-[16px]"
                    src="https://www.youtube.com/embed/TzZ0n7WioLQ?si=MsOyjs3zfsLMjO1Y"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
            <div
                className={
                    "grid grid-cols-2 grid-rows-2 text-center gap-12 font-light"
                }
            >
                <div className={"flex flex-col gap-1"}>
                    <h1
                        className={
                            "font-architect m-0  text-[#A659FF] font-light text-3xl"
                        }
                    >
                        17
                    </h1>
                    <p>
                        participating <br/>
                countries
              </p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <h2
                className={
                  "font-architect m-0  text-[#7DEB9A] font-light text-3xl"
                }
              >
                250+
              </h2>
              <p>participants</p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <h2
                className={
                  "font-architect m-0 text-[#7DEB9A] font-light text-3xl"
                }
              >
                50+
              </h2>
              <p>
                speakers <br /> and experts
              </p>
            </div>
            <div className={"flex flex-col gap-1"}>
              <h2
                className={
                  "font-architect m-0 text-[#A659FF] font-light text-3xl"
                }
              >
                90+
              </h2>
              <p>affiliations</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col gap-2 justify-start">
          <h2 className="font-normal m-0">BIOCON’23 speakers</h2>
          <p className="font-light">Plenary speakers</p>
          <Carousel
              items={Array.from({length: 5}).map((_, i) => (
                  <div
                      key={`media-item-${i}`}
                      className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
                  >
                    <Image src={Media1} alt="" className="w-full flex-1"/>
                    <p>
                      Registration for BIOCON 2024 is now open! Read 5 reasons why you
                      need to become a conference participant
                    </p>
                    <Link href="#" className="underline">
                      Read more
                    </Link>
                  </div>
              ))}
          />
          <Image
              src={lowerglow}
              alt=""
              className="absolute w-full h-auto bottom-0 left-0 -z-10 translate-y-[15%]"
          />
      </section>
    </main>
);
};

export default PreviousPage;
