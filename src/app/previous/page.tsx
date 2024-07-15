import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoDesktop from "@public/LogoDesktop.png";
import LogoMobile from "@public/LogoMobile.png";
import boom_right from "@public/boom_right.svg";
import boom_left from "@public/boom_left.svg";
import boom_down from "@public/boom_down.svg";
import "./noise.css";

// gallery
import img1 from "@public/previous_biocon/BXrm3Nh1_AI.jpg";
import speaker1 from "@public/previous_biocon/KH05oj8MpPo.jpg";
import speaker2 from "@public/previous_biocon/mirza.jpeg";
import img4 from "@public/previous_biocon/D-BUvQriEfw.jpg";
import ButtonRegistration from "@/components/button.registration";
import speaker1_square from "@public/previous_biocon/speaker_square.jpg";
import speaker3_square from "@public/previous_biocon/speaker2_square.jpeg";
import mirza_pc from "@public/previous_biocon/mirza_pc.jpeg";

// glows
import leftglow from "@public/previous_biocon/glow/left.svg";
import lowerglow from "@public/previous_biocon/glow/lower.svg";
import upperglow from "@public/previous_biocon/glow/upper.svg";

// plenary speakers
import meisam_plenary from "@public/previous_biocon/BioconPlenarySpeakers/Meisam.jpeg";
import amin_plenary from "@public/previous_biocon/BioconPlenarySpeakers/amin.jpeg";
import mirza_plenary from "@public/previous_biocon/BioconPlenarySpeakers/mirza.jpeg";
import mukesh_plenary from "@public/previous_biocon/BioconPlenarySpeakers/wzDozYDXwi4.jpg";

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
        <div className={"lg:flex lg:flex-row hidden md:block relative"}>
          <Image
            src={boom_right}
            alt={"boom"}
            className="absolute -right-[3rem] -top-[6rem] w-[4rem]"
          />
          <div className="grid grid-cols-[2.11fr_1fr] gap-6">
            <div className="grid grid-rows-2 gap-6">
              <div className="grid grid-cols-[2fr_1fr] gap-6">
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={img1}
                    alt="GL"
                  />
                </div>
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
                    src={speaker1_square}
                    alt="GL"
                  />
                </div>
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-6">
                <div className="relative flex items-center justify-center h-full">
                  <Image
                    className="rounded-[28px] object-cover w-full h-full"
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
                src={mirza_pc}
                alt="GL"
              />
            </div>
          </div>
          <Image
            src={boom_down}
            alt={"boom"}
            className="absolute -left-[3rem] -bottom-[4.5rem] w-[4rem]"
          />
        </div>
        <div className={"relative flex flex-col gap-4  lg:hidden"}>
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
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-[16px]"
              src="https://www.youtube.com/embed/TzZ0n7WioLQ?si=MsOyjs3zfsLMjO1Y"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-12 text-center font-light lg:grid-cols-4 lg:grid-rows-1 lg:text-2xl">
            <div className={"flex flex-col gap-1 lg:gap-3"}>
              <h1
                className={
                  "font-architect m-0  text-[#A659FF] font-light text-3xl lg:text-4xl"
                }
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
                className={
                  "font-architect m-0  text-[#7DEB9A] font-light text-3xl lg:text-4xl"
                }
              >
                250+
              </h2>
              <p>participants</p>
            </div>
            <div className={"flex flex-col lg:gap-3"}>
              <h2
                className={
                  "font-architect m-0 text-[#7DEB9A] lg:text-[#A659FF] font-light text-3xl lg:text-4xl"
                }
              >
                50+
              </h2>
              <p>
                speakers <br /> and experts
              </p>
            </div>
            <div className={"flex flex-col gap-1 lg:gap-3"}>
              <h2
                className={
                  "font-architect m-0 text-[#A659FF] lg:text-[#7DEB9A] font-light text-3xl lg:text-4xl"
                }
              >
                90+
              </h2>
              <p>affiliations</p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex flex-col gap-4">
        <h2 className="font-normal m-0">BIOCON’23 speakers</h2>
        <p className="font-light">Plenary speakers</p>
        <div className="grid grid-cols-4 gap-6">
          <div className="flex flex-col gap-5 items-stretch justify-center">
            <div className="flex items-center justify-center h-full">
              <Image
                className="rounded-[28px] h-full object-cover"
                src={meisam_plenary}
                alt="mp"
              />
            </div>
            <div>
              <p className={"text-center"}>Meisam Tabatabaei</p>
              <p className={"font-light text-lg text-center"}>
                Universiti Malaysia Terengganu
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-stretch justify-center">
            <div className="flex items-center justify-center h-full">
              <Image
                className="rounded-[28px] h-full object-cover"
                src={mirza_plenary}
                alt="mirp"
              />
            </div>
            <div>
              <p className={"text-center"}>Mirza Hasanuzzaman</p>
              <p className={"font-light text-lg text-center"}>
                Sher-e-Bangla Agricultural University
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-stretch justify-center">
            <div className="flex items-center justify-center h-full">
              <Image
                className="rounded-[28px] h-full object-cover"
                src={amin_plenary}
                alt="ap"
              />
            </div>
            <div>
              <p className={"text-center"}>Amin Mousavi Khaneghah</p>
              <p className={"font-light text-lg text-center"}>
                Institute of Agricultural and Food Biotechnology
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-stretch justify-center">
            <div className="flex items-center justify-center h-full">
              <Image
                className="rounded-[28px] h-full object-cover"
                src={mukesh_plenary}
                alt="mukp"
              />
            </div>
            <div>
              <p className={"text-center"}>Mukesh Kumar Awasthi</p>
              <p className={"font-light text-lg text-center"}>
                Northwest A&F University
              </p>
            </div>
          </div>
        </div>
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
