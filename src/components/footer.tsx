import links from "@/lib/links";
import NavLogo from "@public/NavLogo.svg";
import Image from "next/image";
import Link from "next/link";
import Tatneft from "@public/tat.png";
import Biotech from "@public/Biotech.svg";
import { cn } from "@/lib/utils";
import YandexMap from "./yandex.map";

const Socials = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex flex-row max-md:w-full max-md:justify-between",
      "md:gap-8",
      className
    )}
  >
    <p>fb</p>
    <p>fb</p>
    <p>fb</p>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-default">
      <div className="bg-secondary wrapper px-0 flex flex-row">
        <div className="px-10 md:px-12 lg:px-16 py-10 md:py-16 fcol gap-8 md:gap-16 flex-1">
          <div className="flex flex-row justify-between">
            <Image src={NavLogo} alt="Biocon" className="h-10" />
            <Socials className="max-lg:hidden" />
          </div>
          <div className="grid grid-rows-3 grid-flow-col">
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
      <div className="py-10 md:py-16 flex flex-wrap wrapper gap-8 justify-evenly">
        <Image
          src={Tatneft}
          alt="Tatneft"
          className="h-10 w-fit object-contain"
        />
        <Image
          src={Biotech}
          alt="Biotech"
          className="h-10 w-fit object-contain invert"
        />
      </div>
    </footer>
  );
}
