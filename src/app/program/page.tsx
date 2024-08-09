import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import HeroGlow from "@public/HeroGlow.svg";
import MobileLogo from "@public/program/logo/LogoMobile.png";
import DesktopLogo from "@public/program/logo/LogoPC.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion.program";
import {
  ProgramPageCards,
  RenderAccordion,
  RenderAccordions,
} from "@/app/program/program.cards";

// gallery
import PanelDiscussion from "@public/program/gallery/PanelDiscussion.jpg";
import BiotechOpenMic from "@public/program/gallery/BioconOpenMic.jpg";
import Mirza from "@public/program/gallery/mirza.jpeg";
import PeopleConference from "@public/program/gallery/peopleConference.jpg";
import TumourCell from "@public/program/gallery/TumourCell.jpg";
import OpenMicMan from "@public/program/gallery/OpenMicMan.png";
import IdentificationMan from "@public/program/gallery/IdentificationMan.jpg";
import DiscussionImage from "@public/program/gallery/Discussion.png";

// glows
import BottomGlowPC from "@public/program/glows/bottomglowPC.svg";
import LeftGlowPC from "@public/program/glows/leftGlowPC.svg";
import BottomGlowMobile from "@public/program/glows/BottomGlowMobile.svg";
import RightGlowMobile from "@public/program/glows/rightGlowMobile.svg";
import { ProgramButton } from "@/app/program/program.button";

export const metadata = {
  title: "BIOCON 2024 - Program",
  openGraph: {
    title: "BIOCON 2024 - Program",
    description: "Program page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/Program.png",
      secureUrl: "https://biocon.international/openGraph/Program.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - Program",
    description: "Program page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/Program.png"],
  },
};

const GridGallery = ({
  image,
  title,
  description,
  reverse,
  alt,
  aspect = "10/6",
}: {
  image: StaticImageData;
  title: string;
  description: string;
  reverse: boolean;
  alt: string;
  aspect?: string;
}) => {
  return (
    <div
      className={"grid lg:grid-cols-2 lg:gap-10 gap-3 items-center grid-cols-1"}
    >
      <Image
        src={image}
        alt={alt}
        className={`object-cover aspect-[${aspect}] object-top lg:rounded-[28px] rounded-[16px] ${reverse && "lg:order-2"}`}
      />
      <div className={`fcol gap-9 ${reverse && "lg:order-1"} hidden lg:flex`}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <RenderAccordion title={title} description={description} />
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
            "absolute  lg:top-1/3 top-1/2 lg:left-1/2 left-[60%] w-fit lg:h-[240%] h-[140%] rotate-[25deg] lg:rotate-0 -z-10 lg:blur-none blur-xl",
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
          <ProgramButton />
        </div>
      </section>
      <section className={"fcol gap-16 hidden lg:flex"}>
        <h1>Topics of BIOCON 2024</h1>
        <div className={"grid grid-cols-3 gap-8 h-[20rem]"}>
          <ProgramPageCards />
        </div>
        <p className={"text-[1.25rem]"}>
          Please click on the bar to access the topic description. We are also
          inviting submissions of disciplinary papers that cover these three
          areas, including but not limited to Agriculture & Environment, Genetic
          Engineering, Food Biotechnology, and Sustainable Biotechnology.
        </p>
      </section>
      <section className={"lg:hidden fcol gap-6 relative"}>
        <Image
          src={RightGlowMobile}
          alt={"right_glow"}
          className={"absolute -z-10 right-0 w-full top-1/4"}
        />
        <h1>Topics of BIOCON 2024</h1>
        <RenderAccordions />
        <p className={"mt-2"}>
          BIOCON 2023 was focused on UNESCO Sustainable Development Goals.
        </p>
      </section>
      <section className={"fcol lg:gap-16 gap-6 relative"}>
        <Image
          src={LeftGlowPC}
          alt={"left_glow"}
          className={
            "absolute -top-[6%] -z-10 left-0 w-full hidden lg:block scale-110 blur-md"
          }
        />
        <h1>Conference formats</h1>
        <p className={"mb-4 hidden lg:block"}>
          BIOCON 2024 focuses on Industrial Biotechnology, driving innovation
          and sustainability. Enjoy TED-style talks from top international
          researchers, sessions with keynote speakers, and the exciting BioTech
          Open Mic — a fun, science-pop format for young scientists. All this
          takes place in the lively setting of Tatarstan, a region known for its
          rich history and vibrant culture. BIOCON 2024 — the must-attend
          BioTech event of the year!
        </p>
        <div className={"fcol gap-12"}>
          <GridGallery
            image={PanelDiscussion}
            title={"Panel discussion"}
            description={
              "The panel discussion is a format where you can hear the insights of leading industry figures and government representatives on the critical role of biotechnology in shaping a sustainable future. We have incorporated interactive elements while retaining the classic aspects of a discussion. This format offers only expert opinions, reliable metrics, and well-founded forecasts."
            }
            reverse={false}
            alt={"panel_discussion"}
          />
          <GridGallery
            image={Mirza}
            title={"Plenary Session"}
            description={
              "To create a unique atmosphere at the international conference, we invite top scientists from the world industry. These are primarily international top speakers who present their talks in one-hour slots, followed by a Q&A session. After the presentations, you can freely interact with the speakers without any restrictions. Our goal is to remove the barrier between students and established researchers. If you are genuinely interested in the topic, this conversation will definitely be a win-win."
            }
            reverse={true}
            alt={"plenary_session"}
          />
          <Image
            src={PeopleConference}
            alt={"conference"}
            className={
              "w-full hidden lg:block rounded-[28px] aspect-[15/3] object-cover object-top"
            }
          />
          <div
            className={
              "grid lg:grid-cols-2 lg:gap-10 gap-3 items-center grid-cols-1"
            }
          >
            <Image
              src={BiotechOpenMic}
              alt={"biotech_open_mic"}
              className={`object-cover aspect-[4/3] object-top lg:rounded-[28px] lg:order-2 rounded-[16px]`}
            />
            <div className={`fcol gap-9 lg:order-1 hidden lg:flex`}>
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
            <Accordion type="single" collapsible className={"block lg:hidden"}>
              <AccordionItem value="item-1">
                <AccordionTrigger>BioTech OpenMic</AccordionTrigger>
                <AccordionContent>
                  The program includes not only sessions from experts but also
                  presentations from rising stars — young scientists and
                  entrepreneurs. One such format is the Biotech Open Mic. Based
                  on the concept of an open microphone, each prepared
                  presentation must be brief and captivating. Participants have
                  exactly 10 minutes to speak, and when time is up, a familiar
                  bong sound will signal the end!
                  <br /> <br />
                  In this format, speakers are not just presenting, they are
                  competing for the title of the best open mic speaker. The
                  winner is determined in an unconventional way — by the
                  audience! Using a sound meter, we measure the volume of the
                  applause to decide the victor. <br /> <br /> Anyone who wishes
                  to share their scientific knowledge in an engaging way can
                  participate in this part.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className={"hidden lg:grid grid-cols-[1fr_2fr] gap-6"}>
            <Image
              src={OpenMicMan}
              alt={"open_mic_man"}
              className={"w-full object-cover aspect-[5/3] rounded-[28px]"}
            />
            <Image
              src={IdentificationMan}
              alt={"biocon_man"}
              className={
                "w-full object-cover aspect-[10/3] rounded-[28px] object-top"
              }
            />
          </div>
          <GridGallery
            image={TumourCell}
            title={"Biotechnology sessions"}
            description={
              "The most important part of the conference is the presentations on various biotechnology topics. Our focus for 2024 is research in the field of industrial biotechnology. You will have the opportunity to present your scientific research to a broad audience in a 15-minute slot. This is an excellent chance to discover new avenues for your project, as you will have time to engage with like-minded individuals from your field after your presentation. The format includes the speech and a few minutes for a Q&A session. Each session carefully moderated by an invited industry guest."
            }
            reverse={false}
            alt={"tumour_cell"}
          />
          <GridGallery
            image={DiscussionImage}
            title={"Networking"}
            description={
              "Say goodbye to dull dialogues and wasted time! This format is definitely not about casual conversations and exchanging business cards. Networking is an essential part of any conference. What if we create a structured plan for spontaneous interactions, ensuring that by the end of the evening, you will have gained several valuable contacts or joined a new research project?"
            }
            reverse={true}
            alt={"tumour_cell"}
          />
        </div>
        <Image
          src={BottomGlowPC}
          alt={"bottom_glow"}
          className={
            "absolute -z-10 -bottom-24 w-full left-0 hidden lg:block  blur-md"
          }
        />
        <Image
          src={BottomGlowMobile}
          alt={"bottom_glow"}
          className={"absolute -bottom-20 w-full -z-10 right-0 lg:hidden"}
        />
      </section>
    </main>
  );
}
