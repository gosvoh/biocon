import Image from "next/image";
import HeroGlow from "@public/HeroGlow.svg";
import LogoDesktop from "@public/LogoDesktop.svg";
import LogoMobile from "@public/LogoMobile.svg";
import { cn } from "@/lib/utils";
import Lines from "@public/lines.png";
import Dude from "@public/Dude.png";
import SideGlow from "@public/SideGlow.svg";
import { Button } from "@/components/ui/button";
import Cite from "@public/cite.png";
import Card from "@/components/card";
import Timeline from "@/components/timeline";
import Aeroflot from "@public/aeroflot.png";
import S7 from "@public/s7.png";
import BottomGlow from "@public/BottomGlow.svg";

const LeftGlow = ({ className }: { className?: string }) => (
  <Image
    src={SideGlow}
    alt=""
    className={cn(
      "absolute top-1/2 -left-14 -z-10 h-[125%] max-lg:blur-3xl w-fit px-0 -translate-y-1/2 max-w-none rotate-180",
      className
    )}
  />
);

const RightGlow = ({ className }: { className?: string }) => (
  <Image
    src={SideGlow}
    alt=""
    className={cn(
      "absolute top-1/2 -right-14 -z-10 h-[125%] max-lg:blur-3xl w-fit px-0 -translate-y-1/2 max-w-none",
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
          "max-w-none px-0"
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
        <div className="wrapper fcol gap-5 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14">
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
      </section>

      <section className="relative xl:flex flex-row justify-between pb-0 fcol xl:flex-row">
        <div className="xl:max-w-1/2 w-full">
          <h2>What is BIOCON?</h2>
          <div className="xl:space-y-6 text-base md:text-xl">
            <p>BIOCON is International Industrial Biotechnology Conference.</p>
            <p>
              Over three days, you will have the opportunity to share innovative
              ideas, research results, and experiences with like-minded biotech
              enthusiasts from around the world.
            </p>
          </div>
        </div>
        <Image
          src={Dude}
          alt=""
          className="hidden xl:block px-0 max-w-1/2 mr-0 object-cover"
        />
        <Image src={Lines} alt="" className="block xl:hidden px-0" />
        <LeftGlow />
      </section>

      <section className="relative fcol lg:flex-row justify-between lg:px-0 lg:py-0 gap-4">
        <RightGlow className="lg:hidden" />
        <Image
          src={Cite}
          alt=""
          className="hidden lg:block w-full h-fit -z-10"
        />
        <Image
          src={LogoDesktop}
          alt="Biocon"
          className="block lg:hidden w-full"
        />
        <p className="text-big text-center lg:hidden">is an opportunity</p>
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

      <section className="relative">
        <h2 className="md:text-center">
          BIOCON — a conference that is conducted entirely in English
        </h2>
        <div className="fcol lg:grid lg:grid-cols-3 gap-2 lg:gap-5">
          <Card plain={false}>
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
        <LeftGlow />
      </section>

      <section className="relative">
        <h2>Choose your role</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-5">
          <Card onClick={() => {}} className="space-y-4">
            <h3>Attendee</h3>
            <p>Full-time participation in conference events</p>
          </Card>
          <Card onClick={() => {}} className="space-y-4">
            <h3>Invited Speaker</h3>
            <p>
              A talk during one of the parallel sessions in conference events
            </p>
          </Card>
          <Card onClick={() => {}} className="space-y-4">
            <h3>BioTech Open Mic</h3>
            <p>
              Present your research in less than 10 minutes in an entertaining
              way. A format in which there is no limits
            </p>
          </Card>
        </div>
        <RightGlow />
      </section>

      <Timeline />

      <section className="relative">
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
