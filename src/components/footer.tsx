import links from "@/lib/links";
import NavLogo from "@public/NavLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Tatneft from "@public/tat.png";
import Biotech from "@public/Biotech.svg";
import { cn } from "@/lib/utils";
import YandexMap from "./yandex.map";
import { SiTelegram, SiVk, SiYoutube } from "@icons-pack/react-simple-icons";
import PHS from "@public/agni.png";
import AlmetTech from "@public/almet_tech.png";
import PISH from "@public/pish.svg";
import { GoToTop } from "@/components/go.to.top";
import { Linkedin } from "lucide-react";

const Socials = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-row max-md:w-full max-md:justify-between ",
      "gap-4 lg:gap-10 py-4",
      className,
    )}
  >
    <Link
      href={"https://www.youtube.com/@BIOCON_2023"}
      className={"scale-animation"}
      target={"_blank"}
    >
      <SiYoutube className="w-10 h-10" />
    </Link>
    <Link
      href={"https://t.me/BIOCON_2023"}
      className={"scale-animation"}
      target={"_blank"}
    >
      <SiTelegram className="w-10 h-10" />
    </Link>
    <Link
      href={"https://vk.com/biocon"}
      className={"scale-animation"}
      target={"_blank"}
    >
      <SiVk className="w-10 h-10" />
    </Link>
    <Link
      href={"https://linkedin.com/company/biocon-conference/"}
      className={"scale-animation"}
      target={"_blank"}
    >
      <Linkedin className="w-10 h-10" />
    </Link>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-default">
      <GoToTop />
      <div className="bg-secondary">
        <div className="wrapper px-0 flex flex-row">
          <div className="px-10 md:px-12 lg:px-16 py-10 md:py-16 fcol gap-8 md:gap-16 flex-1">
            <div className="flex flex-row justify-between">
              <Image src={NavLogo} alt="Biocon" className="h-full" />
              <Socials className="max-lg:hidden" />
            </div>
            <div className="flex flex-wrap gap-6">
              {links.map((x, i) => (
                <div key={`footer-link-${i}`}>
                  <Link className="link-hover-underline" href={x.href}>
                    {x.title}
                  </Link>
                </div>
              ))}
            </div>
            <Socials className="lg:hidden" />
            <div className="fcol 2xl:flex-row justify-between gap-6 text-[#969696]">
              <p>ITMO University</p>
              <div>
                <Link
                  className="link-hover-underline"
                  href="mailto:biocon@itmo.ru"
                >
                  biocon@itmo.ru
                </Link>
              </div>
              <div>
                <Link className="link-hover-underline" href="/files/policy.pdf">
                  Privacy policy
                </Link>
              </div>
            </div>
          </div>
          {/* <YandexMap className="hidden lg:block flex-1 max-w-1/2" /> */}
        </div>
      </div>
      <div className="py-10 md:py-16 flex flex-wrap wrapper gap-8 justify-evenly [&>a>*]:h-20 [&>a>*]:w-fit ">
        {/* <Link href={"https://almet.pish.itmo.ru/"} target={"_blank"} className={"w-full lg:w-auto flex items-center justify-center mt-2"}>
          <Image src={AlmetTech} alt="ITMO" className="scale-[250%] self-c"/>
        </Link> */}
        <Link href={"https://biotech.industries/"} target={"_blank"}>
          <Image
            src={Biotech}
            alt="Biotech"
            className="invert transform scale-150"
          />
        </Link>
        {/* <Link
          href={"https://www.tatneft.ru/en"}
          target={"_blank"}
          className={"mb-4 lg:-mt-4 "}
        >
          <Image src={Tatneft} alt="Tatneft" />
        </Link> */}
        <Link href={"https://pish.itmo.ru/"} target={"_blank"}>
          <Image src={PISH} alt="PISH" />
        </Link>
        {/* <Link
          href={"https://xn----7sbhc6c1ah6b.xn--p1ai/en/"}
          target={"_blank"}
        >
          <Image src={PHS} alt="PHS" />
        </Link> */}
      </div>
    </footer>
  );
}
