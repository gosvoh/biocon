import { cn } from "@/lib/utils";
import Image from "next/image";
import HeroGlow from "@public/HeroGlow.svg";
import MobileLogo from "@public/program/logo/LogoMobile.png";
import DesktopLogo from "@public/program/logo/LogoPC.png";
import ButtonRegistration from "@/components/button.registration";

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
            "absolute -rotate-[7.61deg] top-1/3 left-1/2 w-fit h-[150%] -z-10",
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
      <section className={"fcol gap-10"}>
        <h1 className={"font-normal"}>Topics of BIOCON 2024</h1>
        <div className={"grid grid-cols-3 gap-8 h-[45vh]"}>
          <div className={"p-10 bg-white rounded-[28px] text-black"}>
            <h3 className={"font-normal"}>Industrial Biotechnology </h3>
          </div>
          <div className={"p-10 bg-[#6CCD86] rounded-[28px]"}>
            <h3 className={"font-normal"}>Agricultural biotechnology </h3>
          </div>
          <div className={"p-10 rounded-[28px] bg-[#2531BA]"}>
            <h3 className={"font-normal"}>
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
      <section></section>
    </main>
  );
}
