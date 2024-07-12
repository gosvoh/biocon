import Image from "next/image";
import HeroGlow from "@public/HeroGlow.svg";
import LogoDesktop from "@public/LogoDesktop.svg";
import LogoMobile from "@public/LogoMobile.svg";
import { cn } from "@/lib/utils";
import Lines from "@public/lines.png";
import Dude from "@public/Dude.png";
import SideGlow from "@public/SideGlow.svg";
import Cite from "@public/cite.png";
import Card from "@/components/card";
import Timeline from "@/components/timeline";
import Aeroflot from "@public/aeroflot.png";
import S7 from "@public/s7.png";
import BottomGlow from "@public/BottomGlow.svg";
import ButtonRegistration from "@/components/button.registration";
import CarouselFeedback from "@/components/carousel.feedback";
import CarouselMedia from "@/components/carousel.media";
import BigSideGlow from "@public/BigSideGlow.svg";

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
      className
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
      className
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
          "py-8 md:py-32 lg:py-36 xl:py-40 2xl:py-44",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px]"
        )}
      >
        <Image
          src={HeroGlow}
          alt=""
          className={cn(
            "absolute -rotate-[7.61deg] top-1/3 left-1/2 w-fit h-[150%] -z-10",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none"
          )}
        />
        <div className="wrapper fcol gap-8 md: lg:gap-10 xl:gap-[50px]">
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
          <h1>International Industrial Biotechnology Conference</h1>
          <p>November 11-13, 2024</p>
          <p>Almetyevsk, Republic of Tatarstan</p>
        </div>
        <div className="wrapper">
          <ButtonRegistration />
        </div>
      </section>

      <section className="relative max-w-none px-0 pb-0">
        <div className="wrapper fcol lg:flex-row justify-between">
          <div className="w-full lg:max-w-5/12 pb-32 space-y-6 md:space-y-9">
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
          <div className="h-fit max-w-7/12 md:max-lg:mx-auto px-0 mr-0 hidden lg:block self-end">
            <Image src={Dude} alt="" className="object-cover" />
          </div>
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
            Over three days, you will have the opportunity to share innovative
            ideas, research results, and experiences with like-minded biotech
            enthusiasts from around the world.
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
          <Card onClick={() => {}} className="space-y-4" icon>
            <h3>Attendee</h3>
            <p>Full-time participation in conference events</p>
          </Card>
          <Card onClick={() => {}} className="space-y-4" icon>
            <h3>Invited Speaker</h3>
            <p>
              A talk during one of the parallel sessions in conference events
            </p>
          </Card>
          <Card onClick={() => {}} className="space-y-4" icon>
            <h3>BioTech Open Mic</h3>
            <p>
              Present your research in less than 10 minutes in an entertaining
              way. A format in which there is no limits
            </p>
          </Card>
        </div>
        <RightGlow big className="lg:hidden h-[300%]" />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <Timeline />
      </section>

      <section className="relative">
        <h2>Feedback from participants</h2>
        <CarouselFeedback />
        <RightGlow />
      </section>

      <section className="relative space-y-6 lg:space-y-9">
        <h2>Media about us</h2>
        <CarouselMedia />
        <LeftGlow />
      </section>

      <section className="relative space-y-6 md:space-y-9">
        <h2>Partners</h2>
        <div className="fcol md:flex-row gap-20">
          <div className="fcol gap-8 flex-1 items-center">
            <Image
              src={Aeroflot}
              alt="Aeroflot"
              className="h-full w-fit object-contain"
            />
            <p>
              Aeroflot is the leading company in Russian commercial aviation and
              the national carrier. Company was founded on 17 March 1923 and is
              both one of the oldest airlines in the world and one of the most
              recognisable Russian brands.
            </p>
          </div>
          <div className="fcol gap-8 flex-1 items-center">
            <Image
              src={S7}
              alt="S7"
              className="h-full w-fit object-contain max-w-1/2"
            />
            <p>
              S7 Airlines is the largest private airline in Russia, with the
              most modern fleet in the Russian air transit market. Their
              extensive network of routes allows our passengers to travel to 181
              cities in 26 countries across the world.
            </p>
          </div>
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
