import Image from "next/image";
import ConferenceIcon from "@public/venue/icons/0.svg";
import CupIcon from "@public/venue/icons/3.svg";
import FuelIcon from "@public/venue/icons/1.svg";
import PlaneIcon from "@public/venue/icons/4.svg";
import BusIcon from "@public/venue/icons/2.svg";
import CardStopIcon from "@public/venue/icons/5.svg";

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
      "Basic accommodation options at hotels that we recommend can be found here.",
    description2:
      "During the days of the conference, we will organize transfers from these hotels to the conference location.",
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
      "Basic accommodation options at hotels that we recommend can be found here.",
    description2:
      "During the days of the conference, we will organize transfers from these hotels to the conference location.",
    icon: CardStopIcon,
  },
];

export const RenderIcons = () => {
  return (
    <>
      <div className={"grid grid-cols-1 gap-y-9 lg:hidden"}>
        {mobileIcons.map((icon, index) => (
          <div
            key={index}
            className={
              "grid grid-cols-[0.35fr_2fr] items-center gap-9 text-left"
            }
          >
            <Image src={icon.icon} alt={""} className={"w-full h-full"} />
            <div className={`${icon.description2 && "fcol gap-2"}`}>
              <p>{icon.description}</p>
              <p>{icon.description2}</p>
            </div>
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
            <div className={`${icon.description2 && "fcol gap-2"}`}>
              <p>{icon.description}</p>
              <p>{icon.description2}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
