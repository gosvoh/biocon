import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

// logo
import VenueLogoMobile from "@public/venue/VENUE.svg";
import VenueLogoPC from "@public/venue/LogoPC.svg";
import PhotoGradient from "@public/venue/glow/photogradient.svg";

// gallery
import SkiResort from "@public/venue/photos/ski_resort.jpg";
import PeopleTatneft from "@public/venue/photos/people.jpg";
import PeoplePHS from "@public/venue/photos/PeoplePHS.jpg";
import PeopleBiocon from "@public/venue/photos/PeopleBiocon2023.jpg";

// Conference Venue
import MapPhoto from "@public/venue/photos/map.png";
import ConferencePC from "@public/venue/photos/conferencePC.jpg";

// icons
import ConferenceIcon from "@public/venue/icons/0.svg";
import FuelIcon from "@public/venue/icons/1.svg";
import BusIcon from "@public/venue/icons/2.svg";
import CupIcon from "@public/venue/icons/3.svg";
import PlaneIcon from "@public/venue/icons/4.svg";
import CardStopIcon from "@public/venue/icons/5.svg";
import TatarCat from "@public/venue/icons/TatarCat.svg";

// hotels
import DeluxeHotel from "@public/venue/hotels/deluxe.jpg";
import ApartsHotel from "@public/venue/hotels/aparts.jpeg";
import FrissonHotel from "@public/venue/hotels/frisson.jpeg";

// mobile glows
import BottomGlow1 from "@public/venue/glow/mobile/bottomglow.svg";
import BottomGlow2 from "@public/venue/glow/mobile/bottomglow2.svg";
import LeftGlow from "@public/venue/glow/mobile/leftglow.svg";
import RightGlow from "@public/venue/glow/mobile/rightglow.svg";

// desktop glows
import BottomGlowPC from "@public/venue/glow/desktop/bottomglowPC.svg";
import LeftGlowPC from "@public/venue/glow/desktop/leftglowPC.svg";
import RightGlowPC from "@public/venue/glow/desktop/rightglowPC.svg";

// background
import VenueBGPC from "@public/venue/BG_desktop.jpg";

import { RenderHotelsInfo } from "@/app/venue/hotel.info.render";
import { RenderIcons } from "@/app/venue/render.icons";

const font = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
});

const hotels = [
  {
    image: DeluxeHotel,
    name: "DeLuxe hotel chain",
    description:
      "Two cozy hotels of European level in the central district of Almetyevsk. Prices start from 2500 rubles per night.",
    link2Booking: "https://otel-deluxe.ru/",
  },
  {
    image: FrissonHotel,
    name: "Frisson",
    description:
      "Cozy hotel with single and double accommodation in the city center. Prices from 3200 rubles per day.",
    link2Booking: "https://almet-hotel.turbo.site/",
  },
  {
    image: ApartsHotel,
    name: "Apartments",
    description:
      "In Almetyevsk you can also use classic ways of booking accommodation: book apartments on the Yandex.Travel, Ostrovok, 101Hotels and others.",
    link2Booking: "https://101hotels.com/main/cities/almetevsk/apartments",
  },
];

const icons = [
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
export default function VenuePage() {
  const gallerySection =
    "fcol gap-5  lg:grid lg:grid-cols-2 lg:items-center lg:gap-9";
  const galleryImage =
    "rounded-[16px] lg:rounded-[28px] lg:object-cover lg:aspect-[8/4] w-full lg:object-top";

  return (
    <main>
      <section
        className={cn(
          "relative text-center",
          "text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          "py-8",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px] h-[43rem]",
        )}
      >
        <div className="absolute inset-0 -z-10">
          <Image
            src={VenueBGPC}
            alt=""
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px] justify-center">
          <Image
            src={VenueLogoMobile}
            alt="Biocon"
            className={"w-full lg:hidden"}
          />
          <Image
            src={VenueLogoPC}
            alt={""}
            className={" w-[50%] mx-auto hidden lg:block"}
          />
        </div>
        <div className="absolute bottom-0 w-full h-[20%]">
          <Image
            src={PhotoGradient}
            alt=""
            className="w-full h-full object-cover blur-sm"
          />
        </div>
      </section>
      <section className={"relative lg:grid lg:grid-cols-[1fr_1fr]"}>
        <Image
          src={RightGlow}
          alt={""}
          className={"absolute -z-10 right-0 h-fit w-full top-0 lg:hidden"}
        />
        <div className={"fcol gap-5 lg:w-[75%]"}>
          <h1 className={"font-normal"}>Almetyevsk</h1>
          <h3 className={"font-normal"}>
            Альметьевск (Russian)
            <br />
            Әлмәт (Tatar)
          </h3>
          <p className={"font-light"}>
            In the Republic of Tatarstan, Almetyevsk is often called “The Oil
            Capital” the city is home to the headquarters of Tatneft and 80% of
            its population is employed by the oil sector:
          </p>
        </div>
        <Image
          src={TatarCat}
          alt={""}
          className={"hidden lg:block justify-self-center"}
        />
      </section>
      <section className={"fcol gap-16 text-center relative"}>
        <Image
          src={LeftGlowPC}
          alt={""}
          className={
            "absolute left-0 -z-10 blur-md bottom-[10%] hidden lg:block"
          }
        />
        <div className={gallerySection}>
          <Image src={SkiResort} alt={""} className={galleryImage} />
          <p className={"font-light lg:text-left"}>
            Almetyevsk boasts its own ski resort, a 150 km network of bike
            paths, the “Almet” community center (complete with Renaissance-era
            art and Shostakovich’s grand piano), and 30 art objects and murals
            spread throughout the city.
          </p>
        </div>
        <div className={gallerySection}>
          <Image
            src={PeopleTatneft}
            alt={""}
            className={cn(galleryImage, "lg:order-2")}
          />
          <p className={"font-light lg:text-left"}>
            PJSC Tatneft, together with the Advanced Engineering School ITMO, is
            developing the biotech industry in Almetyevsk.
            <br /> <br />
            AES ITMO is a training school for engineers with the necessary level
            of competence for accelerated transfer of digital technologies to
            the development of new business areas and industrial production.
          </p>
        </div>
        <div className={gallerySection}>
          <Image src={PeoplePHS} alt={""} className={galleryImage} />
          <p className={"font-light lg:text-left"}>
            In April 2023, cellular, molecular, microbiological and chemical
            laboratories equipped with advanced research equipment were launched
            on the basis of the Laboratory and Research Building of the
            Petroleum High School.
          </p>
        </div>
        <div className={gallerySection}>
          <Image
            src={PeopleBiocon}
            alt={""}
            className={cn(galleryImage, "lg:order-2")}
          />
          <p className={"font-light  lg:text-left"}>
            In December 2023, the first international biotechnology conference,
            BIOCON 2023, was held at the Almet Cultural Center. The conference
            took place over three days and brought together the most advanced
            scientists from Russia and the world to share their experience and
            best practices.
          </p>
        </div>
      </section>
      <section className={"fcol gap-10 relative"}>
        <div>
          <h2 className={"font-normal"}>Conference venue</h2>
          <p className={"font-light"}>
            “Almet” is a modern and well-equipped venue, which is perfect for
            large-scale events. There is everything necessary for the speakers
            performance: a large screen, loop, laser pointer, duplicate screens,
            clicker. On the eve of the speech our team conducts a preparatory
            briefing.
          </p>
        </div>
        <div className={"grid grid-rows-3 gap-5 lg:hidden"}>
          <Image src={MapPhoto} alt={""} className={"w-full"} />
          <div
            className={
              "bg-[#1A1A1A] rounded-[28px] w-full h-full fcol items-center justify-center gap-3"
            }
          >
            <h1
              className={cn(
                " font-normal text-[#7DEB9A] text-[2.5rem]",
                font.className,
              )}
            >
              +18 °C
            </h1>
            <p>Almetyevsk, Russia</p>
          </div>
          <Image
            src={ConferencePC}
            alt={""}
            className={"w-full rounded-[16px]"}
          />
        </div>
        <div className={"hidden lg:block"}>
          <div className={"grid grid-rows-2 gap-6"}>
            <div className={"grid grid-cols-2 gap-6"}>
              <Image src={MapPhoto} alt={""} className={"w-full"} />
              <div
                className={
                  "bg-[#1A1A1A] rounded-[28px] fcol items-center justify-center gap-3"
                }
              >
                <h1
                  className={cn(
                    " font-normal text-[#7DEB9A] text-[80px]",
                    font.className,
                  )}
                >
                  +18 °C
                </h1>
                <p>Almetyevsk, Russia</p>
              </div>
            </div>
            <div className={"relative"}>
              <Image
                src={ConferencePC}
                alt={""}
                fill={true}
                className={"object-cover aspect-[5/3] rounded-[28px]"}
              />
            </div>
          </div>
        </div>
        <Image
          src={RightGlowPC}
          alt={""}
          className={
            "absolute -z-10 right-0 bottom-0 top-12 w-full blur-md hidden lg:block"
          }
        />
        <Image
          src={LeftGlow}
          alt={""}
          className={
            "absolute -z-10 left-0 w-full h-fit top-1/4 lg:hidden scale-[140%]"
          }
        />
      </section>
      <section className={"text-center"}>
        <h2 className={"font-normal lg:text-start text-center"}>
          The terms of participation
        </h2>
        <RenderIcons icons={icons} />
      </section>
      <section className={"relative mb-24"}>
        <h2 className={"font-normal"}>Accommodation options</h2>
        <p className={"font-light mb-10 lg:mb-24"}>
          We have gathered several accommodation options for the conference
          days. Key locations have been marked on an interactive map.
        </p>
        <div className={"fcol gap-16 lg:gap-24"}>
          <RenderHotelsInfo hotels={hotels} />
        </div>
        <Image
          src={BottomGlow2}
          alt={""}
          className={"absolute -z-10 bottom-32 w-full right-0 lg:hidden"}
        />
        <Image
          src={BottomGlow1}
          alt={""}
          className={
            "absolute -bottom-[10%] -z-10 w-full blur-md left-0 lg:hidden"
          }
        />
        <Image
          src={BottomGlowPC}
          alt={""}
          className={
            "absolute -z-10 -bottom-[15%] left-0 w-full hidden lg:block"
          }
        />
      </section>
    </main>
  );
}
