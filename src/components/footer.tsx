import links from "@/lib/links";
import NavLogo from "@public/NavLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Tatneft from "@public/tat.png";
import Biotech from "@public/Biotech.svg";
import { cn } from "@/lib/utils";
import YandexMap from "./yandex.map";
import { SiYoutube, SiVk, SiTelegram } from "@icons-pack/react-simple-icons";
import PHS from "@public/agni.png";
import ITMO from "@public/itmo.png";
import PISH from "@public/pish.png";

const Socials = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-row max-md:w-full max-md:justify-between",
      "md:gap-10 py-4",
      className,
    )}
  >
    <Link href={"#"}>
      <SiYoutube className="w-10 h-10" />
    </Link>
    <Link href={"#"}>
      <SiTelegram className="w-10 h-10" />
    </Link>
    <Link href={"#"}>
      <SiVk className="w-10 h-10" />
    </Link>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-default">
      <div className="bg-secondary wrapper px-0 flex flex-row">
        <div className="px-10 md:px-12 lg:px-16 py-10 md:py-16 fcol gap-8 md:gap-16 flex-1">
          <div className="flex flex-row justify-between">
            <Image src={NavLogo} alt="Biocon" className="h-full" />
            <Socials className="max-lg:hidden" />
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-6">
            {links.map((x, i) => (
              <Link href={x.href} key={`footer-link-${i}`}>
                {x.title}
              </Link>
            ))}
          </div>
          <Socials className="lg:hidden" />
        </div>
        <YandexMap className="hidden lg:block flex-1" />
      </div>
      <div className="py-10 md:py-16 flex flex-wrap wrapper gap-8 justify-evenly [&>a>*]:h-20 [&>a>*]:w-fit">
        <Link href={"#"}>
          <Image src={ITMO} alt="ITMO" />
        </Link>
        <Link href={"#"}>
          <Image src={Biotech} alt="Biotech" className=" invert" />
        </Link>
        <Link href={"#"}>
          <Image src={Tatneft} alt="Tatneft" />
        </Link>
        <Link href={"#"}>
          <Image src={PISH} alt="PISH" />
        </Link>
        <Link href={"#"}>
          <Image src={PHS} alt="PHS" />
        </Link>
      </div>
    </footer>
  );
}
