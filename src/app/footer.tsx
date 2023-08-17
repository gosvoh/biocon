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
import { socials } from "@/socials";
import { useWindowSize } from "@react-hookz/web";
import { useEffect, useState } from "react";

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
        <Link href="https://itmo.ru/" prefetch={false}>
          <Image src={Itmo} alt="Itmo" width={imgWidth} />
        </Link>
        <Link
          href="https://en.itmo.ru/en/faculty/98/Faculty_of_Biotechnologies.htm"
          prefetch={false}
          target="_blank"
        >
          <Image src={Biotech} alt="Biotech" width={imgWidth} />
        </Link>
        <Link href="https://www.tatneft.ru/" prefetch={false} target="_blank">
          <Image src={Tatneft} alt="Tatneft" width={imgWidth} />
        </Link>
        <Link href="https://pish-itmo.ru/" prefetch={false} target="_blank">
          <Image src={Pish} alt="Pish" width={imgWidth} />
        </Link>
        <Link href="https://agni-rt.ru/" prefetch={false} target="_blank">
          <Image src={Agni} alt="Agni" width={imgWidth} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 items-center flex-row">
          <Link href={socials.vk} target="_blank" prefetch={false}>
            <Image src={VK} alt={"VK social"} width={40} />
          </Link>
          <Link href={socials.telegram} target="_blank" prefetch={false}>
            <Image src={Telegram} alt="Telegram social" width={40} />
          </Link>
          <Link href={socials.facebook} target="_blank" prefetch={false}>
            <Image src={Facebook} alt={"Facebook social"} width={40} />
          </Link>
          <Link href={socials.youtube} target="_blank" prefetch={false}>
            <Image src={YouTube} alt={"YouTube social"} width={40} />
          </Link>
        </div>
        <div className="text-start sm:text-end text-sm sm:text-base md:text-lg">
          <p>ITMO University</p>
          <Link
            className="hover:underline p-0 h-auto leading-normal"
            href={"mailto:biocon@itmo.ru"}
            prefetch={false}
          >
            biocon@itmo.ru
          </Link>
        </div>
      </div>
    </footer>
  );
}
