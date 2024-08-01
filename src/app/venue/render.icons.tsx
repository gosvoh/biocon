"use client";

import Image, { StaticImageData } from "next/image";
import ConferenceIcon from "@public/venue/icons/0.svg";
import CupIcon from "@public/venue/icons/3.svg";
import FuelIcon from "@public/venue/icons/1.svg";
import PlaneIcon from "@public/venue/icons/4.svg";
import BusIcon from "@public/venue/icons/2.svg";
import CardStopIcon from "@public/venue/icons/5.svg";
import { Modal } from "antd";
import { isPlainText } from "nodemailer/lib/mime-funcs";
import Link from "next/link";

const icons = [
  {
    description: "Participation is free for all types of participants!",
    description2: "",
    icon: ConferenceIcon,
  },
  {
    description:
      "During the days of the conference, meals and coffee breaks will be organized for all conference participants.",
    description2: "",
    icon: CupIcon,
  },
  {
    description:
      "Attendee participants will be selected based on their letters of motivation.",
    description2:
      "Contributed speaker and Science Slammer participants will be selected based on their CVs, scientific background, and video presentations.",
    icon: FuelIcon,
  },
  {
    description:
      "Participants pay their own travel expenses to transfer locations.",
    description2:
      "Please note that we have special offers for the conference participants. After registering, you can get promo codes for discounts at our partner airline companies.",
    icon: PlaneIcon,
  },
  {
    description:
      "Free shuttle service to Almetyevsk will be organized from the points indicated on the map",
    description2: "",
    icon: BusIcon,
  },
  {
    description:
      "Basic accommodation options at hotels that we recommend can be found below.",
    icon: CardStopIcon,
  },
];

const mobileIcons = [
  {
    description: "Participation is free for all types of participants!",
    description2: "",
    icon: ConferenceIcon,
  },
  {
    description:
      "Attendee participants will be selected based on their letters of motivation.",
    description2:
      "Contributed speaker and Science Slammer participants will be selected based on their CVs, scientific background, and video presentations.",
    icon: FuelIcon,
  },
  {
    description:
      "Free shuttle service to Almetyevsk will be organized from the points indicated on the map",
    description2: "",
    icon: BusIcon,
  },
  {
    description:
      "During the days of the conference, meals and coffee breaks will be organized for all conference participants.",
    description2: "",
    icon: CupIcon,
  },
  {
    description:
      "Participants pay their own travel expenses to transfer locations.",
    description2:
      "Please note that we have special offers for the conference participants. After registering, you can get promo codes for discounts at our partner airline companies.",
    icon: PlaneIcon,
  },
  {
    description:
      "Basic accommodation options at hotels that we recommend can be found below.",
    icon: CardStopIcon,
  },
];

export const RenderIcons = () => {
  const [modal, context] = Modal.useModal();

  const RenderIcon = ({
    icon,
    description,
    description2,
  }: {
    icon: StaticImageData;
    description: string;
    description2?: string;
  }) => (
    <div
      className={`${description2 && "fcol gap-2"} ${icon == PlaneIcon && "cursor-pointer hover:text-[#FE6F61] duration-300"}`}
      onClick={() => {
        icon == PlaneIcon &&
          modal.info({
            icon: null,
            title: "Plane tickets",
            width: "800px",
            footer: <></>,
            closable: true,
            content: (
              <div className={"fcol gap-5"}>
                <p>
                  When buying tickets, please note that the conference will take
                  place on November 11-13.
                </p>
                <p className={"font-bold"}>
                  We recommend arriving on November 10, 2024. <br />
                  We recommend leaving on November 14, 2024.
                </p>
                <p>
                  Free transfer to the conference’s location will be organized
                  from the following points:
                </p>
                <ol>
                  <li>1. Kazan-Passazhirskaya (Kazan railway station)</li>
                  <li>2. Kazan-Passazhirskaya 2 (Kazan railway station)</li>
                  <li>3. Kazan (Airport)</li>
                  <li>4. Bugulma (Railway station)</li>
                  <li>5. Bugulma (Airport)</li>
                  <li>6. Begishevo (Airport Nizhnekamsk)</li>
                </ol>
                <div className={"flex gap-1 items-center"}>
                  <p>If you have any questions, write at</p>
                  <Link
                    href={"mailto:biocon@itmo.ru"}
                    className={
                      "font-bold link-hover-underline text-white hover:text-white"
                    }
                  >
                    biocon@itmo.ru
                  </Link>
                </div>
              </div>
            ),
          });
      }}
    >
      <p>{description}</p>
      <p>{description2}</p>
    </div>
  );

  return (
    <>
      {context}
      <div className={"grid grid-cols-1 gap-y-9 lg:hidden"}>
        {mobileIcons.map((icon, index) => (
          <div
            key={index}
            className={
              "grid grid-cols-[0.35fr_2fr] items-center gap-9 text-left"
            }
          >
            <Image src={icon.icon} alt={""} className={"w-full h-full"} />
            <RenderIcon
              icon={icon.icon}
              description={icon.description}
              description2={icon.description2}
            />
          </div>
        ))}
      </div>
      <div className={"lg:grid grid-cols-2 gap-x-36 gap-y-16 hidden"}>
        {icons.map((icon, index) => (
          <div
            key={index}
            className={
              "grid grid-cols-[0.5fr_4fr] items-center gap-9 text-left"
            }
          >
            <Image src={icon.icon} alt={""} className={"w-full h-full"} />
            <RenderIcon
              icon={icon.icon}
              description={icon.description}
              description2={icon.description2}
            />
          </div>
        ))}
      </div>
    </>
  );
};
