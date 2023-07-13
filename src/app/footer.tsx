import Link from "next/link";
import Image from "next/image";

import Agni from "../../public/agni.png";
import Biotech from "../../public/biotech.png";
import Itmo from "../../public/itmo.png";
import Pish from "../../public/pish.png";
import Tatneft from "../../public/tat.png";
import Telegram from "../../public/telegram.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Footer({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        <Link
          href="https://t.me/BIOCON_2023"
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex items-center gap-4 hover:underline p-0 h-auto"
          )}
          target="_blank"
        >
          <Image src={Telegram} alt="Telegram" width={40} />
          <span>@BIOCON_2023</span>
        </Link>
        <div className="text-center sm:text-end">
          <p>ITMO University</p>
          <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
          <span>email: </span>
          <Button
            variant="link"
            className="hover:underline p-0 h-auto leading-normal"
            onClick={() => setOpenContact(true)}
          >
            biocon@itmo.ru
          </Button>
        </div>
      </div>
    </footer>
  );
}
