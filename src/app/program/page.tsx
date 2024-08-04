import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import HeroGlow from "@public/HeroGlow.svg";
import MobileLogo from "@public/program/logo/LogoMobile.png";
import DesktopLogo from "@public/program/logo/LogoPC.png";
import ButtonRegistration from "@/components/button.registration";

// gallery
import PanelDiscussion from "@public/program/gallery/PanelDiscussion.jpg";
import BiotechOpenMic from "@public/program/gallery/BioconOpenMic.jpg";
import Mirza from "@public/program/gallery/mirza.jpeg";

// glows
import BottomGlowPC from "@public/program/glows/bottomglowPC.svg";
import LeftGlowPC from "@public/program/glows/leftGlowPC.svg";

const GridPCGallery = ({
  image,
  title,
  description,
  reverse,
  alt,
  aspect = "2/1",
}: {
  image: StaticImageData;
  title: string;
  description: string;
  reverse: boolean;
  alt: string;
  aspect?: string;
}) => {
  return (
    <div className={"grid grid-cols-2 gap-10 items-center"}>
      <Image
        src={image}
        alt={alt}
        className={`object-cover aspect-[${aspect}] object-top rounded-[28px] ${reverse && "order-2"}`}
      />
      <div className={`fcol gap-9 ${reverse && "order-1"}`}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default function ProgramPage() {
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
            "absolute top-1/3 left-1/2 w-fit h-[225%] -z-10",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none",
          )}
        />
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px]">
          <Image
            src={DesktopLogo}
            alt="Biocon"
            className="hidden md:block w-[80%] mx-auto"
          />
          <Image
            src={MobileLogo}
            alt="Biocon"
            className="block md:hidden w-full"
          />
        </div>
        <div className="wrapper">
          <ButtonRegistration />
        </div>
      </section>
      <section className={"fcol gap-16"}>
        <h1>Topics of BIOCON 2024</h1>
        <div className={"grid grid-cols-3 gap-8 h-[45vh]"}>
          <div className={"p-10 bg-white rounded-[28px] text-black"}>
            <h3>Industrial Biotechnology </h3>
          </div>
          <div className={"p-10 bg-[#6CCD86] rounded-[28px]"}>
            <h3>Agricultural biotechnology </h3>
          </div>
          <div className={"p-10 rounded-[28px] bg-[#2531BA]"}>
            <h3>
              Marine and <br /> fresh-water <br /> biotechnology{" "}
            </h3>
          </div>
        </div>
        <p className={"font-light text-[1.25rem]"}>
          Please click on the bar to access the topic description. We are also
          inviting submissions of disciplinary papers that cover these three
          areas, including but not limited to Agriculture & Environment, Genetic
          Engineering, Food Biotechnology, and Sustainable Biotechnology.
        </p>
      </section>
      <section className={"fcol gap-16 relative"}>
        <Image
          src={LeftGlowPC}
          alt={"left_glow"}
          className={
            "absolute -top-[20%] -z-10 left-0 h-full w-[125%] hidden lg:block"
          }
        />
        <h1>Conference format</h1>
        <p className={"mb-4"}>
          BIOCON 2024 focuses on Industrial Biotechnology, driving innovation
          and sustainability. Enjoy TED-style talks from top international
          researchers, sessions with keynote speakers, and the exciting BioTech
          Open Mic — a fun, science-pop format for young scientists. All this
          takes place in the lively setting of Tatarstan, a region known for its
          rich history and vibrant culture. BIOCON 2024 — the must-attend
          BioTech event of the year!
        </p>
        <div className={"fcol gap-12"}>
          <GridPCGallery
            image={PanelDiscussion}
            title={"Panel discussion"}
            description={
              "The panel discussion is a format where you can hear the insights of leading industry figures and government representatives on the critical role of biotechnology in shaping a sustainable future. We have incorporated interactive elements while retaining the classic aspects of a discussion. This format offers only expert opinions, reliable metrics, and well-founded forecasts."
            }
            reverse={false}
            alt={"panel_discussion"}
          />
          <GridPCGallery
            image={Mirza}
            title={"Panel discussion"}
            description={
              "The panel discussion is a format where you can hear the insights of leading industry figures and government representatives on the critical role of biotechnology in shaping a sustainable future. We have incorporated interactive elements while retaining the classic aspects of a discussion. This format offers only expert opinions, reliable metrics, and well-founded forecasts."
            }
            reverse={true}
            alt={"panel_discussion"}
          />
          <div className={"grid grid-cols-2 gap-10 items-center"}>
            <Image
              src={BiotechOpenMic}
              alt={"biotech_open_mic"}
              className={`object-cover aspect-[4/3] object-top rounded-[28px] order-2`}
            />
            <div className={`fcol gap-9 order-1`}>
              <h3>BioTech OpenMic</h3>
              <p>
                The program includes not only sessions from experts but also
                presentations from rising stars — young scientists and
                entrepreneurs. One such format is the Biotech Open Mic. Based on
                the concept of an open microphone, each prepared presentation
                must be brief and captivating. Participants have exactly 10
                minutes to speak, and when time is up, a familiar bong sound
                will signal the end!
                <br /> <br />
                In this format, speakers are not just presenting, they are
                competing for the title of the best open mic speaker. The winner
                is determined in an unconventional way — by the audience! Using
                a sound meter, we measure the volume of the applause to decide
                the victor. <br /> <br /> Anyone who wishes to share their
                scientific knowledge in an engaging way can participate in this
                part.
              </p>
            </div>
          </div>
          <GridPCGallery
            image={Mirza}
            title={"Panel discussion"}
            description={
              "The panel discussion is a format where you can hear the insights of leading industry figures and government representatives on the critical role of biotechnology in shaping a sustainable future. We have incorporated interactive elements while retaining the classic aspects of a discussion. This format offers only expert opinions, reliable metrics, and well-founded forecasts."
            }
            reverse={true}
            alt={"panel_discussion"}
          />
        </div>
        <Image
          src={BottomGlowPC}
          alt={"glow"}
          className={"absolute -z-10 -bottom-24 w-full left-0 hidden lg:block"}
        />
      </section>
    </main>
  );
}
