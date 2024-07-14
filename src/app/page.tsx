import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Card from "@/components/card";
import ButtonRegistration from "@/components/button.registration";
import CarouselFeedback from "@/components/carousel.feedback";
import Timeline from "@/components/timeline";
import Carousel from "@/components/carousel";

import HeroGlow from "@public/HeroGlow.svg";
import SideGlow from "@public/SideGlow.svg";
import BigSideGlow from "@public/BigSideGlow.svg";
import BottomGlow from "@public/BottomGlow.svg";

import LogoDesktop from "@public/LogoDesktop.png";
import LogoMobile from "@public/LogoMobile.png";

import Lines from "@public/lines.png";
import Dude from "@public/Dude.png";
import Cite from "@public/cite.png";

import Aeroflot from "@public/aeroflot.png";
import S7 from "@public/s7.png";

import Barua from "@public/humans/Barua.jpg";
import Gavrilenko from "@public/humans/Gavrilenko.jpg";
import Kalinikin from "@public/humans/Kalinikin.jpg";
import Khayrova from "@public/humans/Khayrova.jpg";
import Polyansky from "@public/humans/Polyansky.jpg";
import Tracey from "@public/humans/Tracey.jpg";

import Media1 from "@public/media/1.png";
import CardChoose from "@/components/card.choose";
import Tag from "@/components/ui/tag";
import Modal from "@/components/ui/modal";
import { MapPin } from "lucide-react";

const LeftGlow = ({
  className,
  big = false,
}: {
  className?: string;
  big?: boolean;
}) => (
  <Image
    src={big ? BigSideGlow : SideGlow}
    alt=""
    className={cn(
      "absolute top-1/2 -left-14 -z-10 h-[125%] w-fit px-0 -translate-y-1/2 max-w-none rotate-180",
      className,
    )}
  />
);

const RightGlow = ({
  className,
  big = false,
}: {
  className?: string;
  big?: boolean;
}) => (
  <Image
    src={big ? BigSideGlow : SideGlow}
    alt=""
    className={cn(
      "absolute top-1/2 -right-14 -z-10 h-[125%] w-fit px-0 -translate-y-1/2 max-w-none",
      className,
    )}
  />
);

export default function Home() {
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
            "absolute -rotate-[7.61deg] top-1/3 left-1/2 w-fit h-[150%] -z-10",
            "-translate-x-1/2 -translate-y-1/2",
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
          <div className="flex flex-col gap-4 md:gap-4 lg:gap-4 xl:gap-[25px]">
            <h1>International Industrial Biotechnology Conference</h1>
            <p className={"lg:text-3xl"}>November 11-13, 2024</p>
          </div>
          <Link
            className={"underline"}
            href={"https://en.wikipedia.org/wiki/Almetyevsk"}
            target={"_blank"}
          >
            <div className="flex gap-2 justify-center items-center">
              <div className="lg:w-10 lg:h-10">
                <MapPin className="w-full h-full" />
              </div>
              <p> Almetyevsk, Republic of Tatarstan</p>
            </div>
          </Link>
        </div>
        <div className="wrapper">
          <ButtonRegistration />
        </div>
      </section>

      <section className="relative max-w-none px-0 pb-0">
        <div className="wrapper fcol lg:flex-row justify-between lg:grid grid-cols-12 grid-rows-1">
          <div className="w-full space-y-6 md:space-y-9 col-start-1 col-end-5 row-[1]">
            <h2>What is BIOCON?</h2>
            <div className="md:space-y-6 text-base md:text-xl">
              <p>
                BIOCON is International Industrial Biotechnology Conference.
              </p>
              <p>
                Over three days, you will have the opportunity to share
                innovative ideas, research results, and experiences with
                like-minded biotech enthusiasts from around the world.
              </p>
            </div>
          </div>
          <Image
            src={Lines}
            alt=""
            className="block md:hidden px-0 -translate-x-14"
          />
          <Image
            src={Dude}
            alt=""
            className="col-start-3 -col-end-1 md:max-lg:mx-auto px-0 mr-0 hidden lg:block self-end object-cover row-[1] translate-x-[15%] h-[110%]"
          />
          <div className="lg:absolute bottom-10 left-1/2 lg:-translate-x-1/2 md:max-lg:my-10">
            <ButtonRegistration className="mx-auto" text="Recap BIOCON 2023" />
          </div>
        </div>
        <RightGlow className="max-lg:hidden h-[150%]" />
      </section>

      <section className="relative fcol lg:flex-row justify-between lg:px-0 lg:py-0 gap-4">
        <LeftGlow big className="lg:hidden h-[350%]" />
        {/* <LeftGlow className="mix-blend-exclusion" /> */}
        <Image
          src={Cite}
          alt=""
          className="hidden lg:block w-full h-fit -z-10"
        />
        <div className="space-y-4 lg:hidden">
          <Image src={LogoDesktop} alt="Biocon" className="block w-full" />
          <p className="text-big text-center">is an opportunity</p>
        </div>
        <div className="lg:absolute bottom-16 left-0 lg:wrapper lg:max-w-1/2 space-y-6 max-lg:pt-8 z-10">
          <p>
            BIOCON is everyone’s spotlight: whether you are a schoolkid or a
            leading researcher, the talk is plenary. Your aspirations, endeavors
            and achievements create a unique scientific fusion called BIOCON.
            Come together. Almetyevsk. November 2024.
          </p>
          <p className="font-bold">
            Mikhail Kurushkin
            <br />
            Chair of BIOCON 2024
          </p>
        </div>
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <h2 className="md:text-center">
          BIOCON — a conference that is conducted entirely in English
        </h2>
        <div className="fcol lg:grid lg:grid-cols-3 gap-2 lg:gap-5">
          <Card>
            <p>
              Immerse yourself in the world of biotechnology and gain new
              insights for three days
            </p>
          </Card>
          <Card>
            <p>Find new colleagues, partners and investors for your projects</p>
          </Card>
          <Card>
            <p>
              Opportunity to speak about your scientific research to a larger
              audience
            </p>
          </Card>
          <Card>
            <p>Become a participant in interdisciplinary projects</p>
          </Card>
          <Card>
            <p>
              Establish new projects at the Research and Development Center in
              Almetevsk
            </p>
          </Card>
          <Card>
            <p>Improve soft-skills and public speaking skills</p>
          </Card>
        </div>
        <LeftGlow className="max-lg:hidden h-[200%] 2xl:h-[150%]" />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <h2>Choose your role</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <CardChoose
            title="Attendee"
            description="Full-time participation in conference events"
            modalContent={
              <div className="fcol gap-4">
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For everyone who is immersed in the field of biotechnology and
                  wants to learn something new
                </p>
                <div className="tags">
                  <Tag text="Students" color="orange" />
                  <Tag text="Junior and young researchers" color="orange" />
                  <Tag text="Teachers" color="orange" />
                  <Tag text="Business representatives" color="orange" />
                  <Tag text="BioTech enthusiasts" color="orange" />
                </div>
                <p className="font-bold">You must specify when registering:</p>
                <div className="tags">
                  <Tag text="Motivation letter" color="green" />
                </div>
              </div>
            }
          />
          <CardChoose
            title="Contributed speaker"
            description="Become part of one of the parallel sessions"
            modalContent={
              <div className="fcol gap-4">
                <p>Performance time: 15-20 min</p>
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For young researchers and scientists with experience who want
                  to share their scientific research
                </p>
                <div className="tags">
                  <Tag
                    text="Recognised and established researchers"
                    color="orange"
                  />
                  <Tag text="BioTech experts" color="orange" />
                  <Tag text="Business representatives" color="orange" />
                </div>
                <p className="font-bold">You must specify when registering:</p>
                <div className="tags">
                  <Tag text="Your CV in English" color="green" />
                  <Tag
                    text="Short video with your self-presentation in English"
                    color="green"
                  />
                  <Tag
                    text="Your Google Scholar, Scopus, ORCID or ResearchGate profile"
                    color="green"
                  />
                  <Tag
                    text="The preliminary title of your speech"
                    color="green"
                  />
                </div>
              </div>
            }
          />
          <CardChoose
            title="BioTech Open Mic"
            description={`Present your research in an entertaining way in only 10 minutes. A format in which there is no "framework"`}
            modalContent={
              <div className="fcol gap-4">
                <p>Performance time: 7-10 min</p>
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For scientists who want to try themselves in an unusual, witty
                  format and tell interestingly about their research, startups
                  or failures — performance without limits!
                </p>
                <div className="tags">
                  <Tag
                    text="Recognised and established researchers"
                    color="orange"
                  />
                  <Tag text="BioTech experts" color="orange" />
                  <Tag text="BioTech enthusiasts" color="orange" />
                </div>
                <p className="font-bold">You must specify when registering:</p>
                <div className="tags">
                  <Tag text="Your CV in English" color="green" />
                  <Tag
                    text="Short video with a teaser of your talk in English"
                    color="green"
                  />
                  <Tag
                    text="Your Google Scholar, Scopus, ORCID or ResearchGate profile"
                    color="green"
                  />
                </div>
              </div>
            }
          />
        </div>
        <RightGlow big className="lg:hidden h-[300%]" />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <Timeline />
      </section>

      <section className="relative">
        <h2>Feedback from participants</h2>
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
              icon: Gavrilenko,
              name: "Alexander Gavrilenko",
              affiliation: "????????????",
              description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus aperiam quam dignissimos molestias. Dolor quibusdam possimus animi! Architecto ab quae officia atque, debitis nisi quaerat!",
              tg: "???????????????????",
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
                "BIOCON 2023 made me an integral part of the Faculty of Biotechnologies at ITMO University. I made some invaluable connections and expanded my networ",
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
        <RightGlow />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <h2>NEWS</h2>
        <Carousel
          items={Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`media-item-${i}`}
              className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
            >
              <Image src={Media1} alt="" className="w-full flex-1" />
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
        <LeftGlow />
      </section>

      <section className="relative space-y-6 md:space-y-9">
        <h2>Partners</h2>
        <div className="fcol md:flex-row gap-20">
          <Modal
            title="Aeroflot"
            trigger={
              <div className="fcol gap-8 flex-1 items-center cursor-pointer">
                <Image src={Aeroflot} alt="Aeroflot" className="h-full" />
                <p>
                  Aeroflot is the leading company in Russian commercial aviation
                  and the national carrier. Company was founded on 17 March 1923
                  and is both one of the oldest airlines in the world and one of
                  the most recognisable Russian brands.
                </p>
              </div>
            }
            modalContent={
              <div className="space-y-8">
                <p>
                  We are pleased to announce that Aeroflot is a partner of the
                  conference and provides discounts on the purchase of air
                  tickets for participants of the BIOCON 2024.
                </p>
                <p>
                  In order to get a discount on the purchase of a ticket, you
                  need to register for the conference.
                </p>
              </div>
            }
          />
          <Modal
            title="S7 Airlines"
            trigger={
              <div className="fcol gap-8 flex-1 items-center cursor-pointer">
                <Image
                  src={S7}
                  alt="S7"
                  className="h-full max-w-[45%] object-contain"
                />
                <p>
                  S7 Airlines is the largest private airline in Russia, with the
                  most modern fleet in the Russian air transit market. Their
                  extensive network of routes allows our passengers to travel to
                  181 cities in 26 countries across the world.
                </p>
              </div>
            }
            modalContent={
              <div className="space-y-8">
                <p>
                  We are pleased to announce that S7 Airlines is a partner of
                  the conference and provides discounts on the purchase of air
                  tickets for participants of the BIOCON 2024.
                </p>
                <p>
                  In order to get a discount on the purchase of a ticket, you
                  need to register for the conference.
                </p>
              </div>
            }
          />
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
