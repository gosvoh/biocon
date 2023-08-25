import Link from "@/components/link";
import Image from "next/image";
import { socials } from "@/socials";
import { useWindowSize } from "@react-hookz/web";
import { useEffect, useState } from "react";

import Agni from "../../public/agni.png";
import Biotech from "../../public/biotech.png";
import Itmo from "../../public/itmo.png";
import Pish from "../../public/pish.svg";
import Tatneft from "../../public/tat.png";
import Telegram from "../../public/telegram.svg";
import VK from "../../public/vk.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";

export default function Footer({}: {}) {
  const windowSize = useWindowSize();
  const [imgWidth, setImgWidth] = useState(150);

  useEffect(() => {
    if (windowSize.width < 640) setImgWidth(150);
    else setImgWidth(200);
  }, [windowSize]);

  return (
    <footer className="flex flex-col mb-8 mt-16 gap-8">
      <div className="flex flex-wrap md:flex-nowrap flex-row justify-around md:justify-between items-center gap-8">
        <Link href="https://itmo.ru/">
          <Image src={Itmo} alt="Itmo" width={imgWidth} />
        </Link>
        <Link href="https://en.itmo.ru/en/faculty/98/Faculty_of_Biotechnologies.htm">
          <Image src={Biotech} alt="Biotech" width={imgWidth} />
        </Link>
        <Link href="https://www.tatneft.ru/">
          <Image src={Tatneft} alt="Tatneft" width={imgWidth} />
        </Link>
        <Link href="https://pish.itmo.ru/">
          <Image src={Pish} alt="Pish" width={imgWidth} />
        </Link>
        <Link href="https://agni-rt.ru/">
          <Image src={Agni} alt="Agni" width={imgWidth} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 items-center flex-row">
          <Link href={socials.vk}>
            <Image src={VK} alt={"VK social"} width={40} />
          </Link>
          <Link href={socials.telegram}>
            <Image src={Telegram} alt="Telegram social" width={40} />
          </Link>
          <Link href={socials.facebook}>
            <Image src={Facebook} alt={"Facebook social"} width={40} />
          </Link>
          <Link href={socials.youtube}>
            <Image src={YouTube} alt={"YouTube social"} width={40} />
          </Link>
        </div>
        <div className="flex flex-col text-start sm:text-end text-sm sm:text-base md:text-lg">
          <p>ITMO University</p>
          <Link
            className="hover:underline p-0 h-auto leading-normal"
            href={"mailto:biocon@itmo.ru"}
          >
            biocon@itmo.ru
          </Link>
          <Link className="hover:underline" href="/personal_data_policy.pdf">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
