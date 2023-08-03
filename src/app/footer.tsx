import Link from "next/link";
import Image from "next/image";

import Agni from "../../public/agni.png";
import Biotech from "../../public/biotech.png";
import Itmo from "../../public/itmo.png";
import Pish from "../../public/pish.png";
import Tatneft from "../../public/tat.png";
import Telegram from "../../public/telegram.svg";
import VK from "../../public/vk.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";

export default function Footer({}: {}) {
  const imgWidth = 200;

  return (
    <footer className="flex flex-col m-4 mt-16 gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <Link href="https://www.tatneft.ru/">
          <Image src={Tatneft} alt="Tatneft" width={imgWidth} />
        </Link>
        <Link href="https://pish.itmo.ru/">
          <Image src={Pish} alt="Pish" width={imgWidth} />
        </Link>
        <Link href="https://agni-rt.ru/">
          <Image src={Agni} alt="Agni" width={imgWidth} />
        </Link>
        <Link href="https://itmo.ru/">
          <Image src={Itmo} alt="Itmo" width={imgWidth} />
        </Link>
        <Link href="https://vk.com/biotech.itmo">
          <Image src={Biotech} alt="Biotech" width={imgWidth} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 items-center flex-row">
          <Link href="https://vk.com/biotech.itmo" target="_blank">
            <Image src={VK} alt={"VK social"} width={40} />
          </Link>
          <Link href="https://t.me/BIOCON_2023" target="_blank">
            <Image src={Telegram} alt="Telegram social" width={40} />
          </Link>
          <Link href="https://facebook.com/biocon2023" target="_blank">
            <Image src={Facebook} alt={"Facebook social"} width={40} />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UC9Z3Z4Z6Z2Z3Z4Z6Z2Z3Z4Z6"
            target="_blank"
          >
            <Image src={YouTube} alt={"YouTube social"} width={40} />
          </Link>
        </div>
        <div className="text-start text-xs sm:text-end sm:text-base">
          <p>ITMO University</p>
          <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
          <span>email: </span>
          <Link
            className="hover:underline p-0 h-auto leading-normal"
            href={"mailto:biocon@itmo.ru"}
          >
            biocon@itmo.ru
          </Link>
        </div>
      </div>
    </footer>
  );
}
