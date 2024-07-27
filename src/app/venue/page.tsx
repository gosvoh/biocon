import VenueBG from "@public/venue/venue_bg.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import VenueLogoMobile from "@public/venue/VENUE.svg";

// gallery
import SkiResort from "@public/venue/photos/ski_resort.png";
import PeopleTatneft from "@public/venue/photos/people.png";
import PeoplePHS from "@public/venue/photos/PeoplePHS.png";
import PeopleBiocon from "@public/venue/photos/PeopleBiocon2023.png";

// Conference Venue
import MapPhoto from "@public/venue/photos/map.png";
import Conference from "@public/venue/photos/conference.png";

// icons
import ConferenceIcon from "@public/venue/icons/0.svg";
import FuelIcon from "@public/venue/icons/1.svg";
import BusIcon from "@public/venue/icons/2.svg";
import CupIcon from "@public/venue/icons/3.svg";
import PlaneIcon from "@public/venue/icons/4.svg";
import CardStopIcon from "@public/venue/icons/5.svg";

import { Architects_Daughter } from "next/font/google";
const font = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
});

export default function VenuePage() {
  const gallerySection = "fcol gap-5";

  return (
    <main>
      <section
        className={cn(
          "relative text-center",
          "text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          "py-8",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px]",
        )}
      >
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px]">
          <Image src={VenueLogoMobile} alt="Biocon" className={"w-full"} />
        </div>
      </section>
      <section className={"fcol gap-5"}>
        <h1 className={"font-normal"}>Almetyevsk</h1>
        <h3 className={"font-normal"}>
          Альметьевск (Russian)
          <br />
          Әлмәт (Tatar)
        </h3>
        <div className={"fcol gap-3"}>
          <p className={"font-light"}>
            In the Republic of Tatarstan, Almetyevsk is often called “The Oil
            Capital” the city is home to the headquarters of Tatneft and 80% of
            its population is employed by the oil sector:
          </p>
          <p className={"font-light"}>
            Almetyevsk boasts its own ski resort, a 150 km network of bike
            paths, the “Almet” community center (Complete with Renaissance-era
            art and Shostakovich’s grand piano) and 30 art ofjects and murals
            spread throughout the city.
          </p>
        </div>
      </section>
      <section className={"fcol gap-16 text-center"}>
        <div className={gallerySection}>
          <Image src={SkiResort} alt={""} className={"rounded-[16px] w-full"} />
          <p className={"font-light"}>
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
            className={"rounded-[16px] w-full"}
          />
          <p className={"font-light"}>
            PJSC Tatneft, together with the Advanced Engineering School ITMO, is
            developing the biotech industry in Almetyevsk.
            <br /> <br />
            AES ITMO is a training school for engineers with the necessary level
            of competence for accelerated transfer of digital technologies to
            the development of new business areas and industrial production.
          </p>
        </div>
        <div className={gallerySection}>
          <Image src={PeoplePHS} alt={""} className={"rounded-[16px] w-full"} />
          <p className={"font-light"}>
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
            className={"rounded-[16px] w-full"}
          />
          <p className={"font-light"}>
            In December 2023, the first international biotechnology conference,
            BIOCON 2023, was held at the Almet Cultural Center. The conference
            took place over three days and brought together the most advanced
            scientists from Russia and the world to share their experience and
            best practices.
          </p>
        </div>
      </section>
      <section className={"fcol gap-10"}>
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
        <div className={"fcol gap-14 items-center justify-center"}>
          <Image src={MapPhoto} alt={""} className={"w-full"} />
          <div className={cn(gallerySection, "items-center")}>
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
            src={Conference}
            alt={""}
            className={"w-full rounded-[16px]"}
          />
        </div>
      </section>
      <section className={"text-center"}>
        <h2 className={"font-normal"}>The terms of participation</h2>
        <div className={"text-start fcol gap-7"}>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={ConferenceIcon} alt={""} />
            <p className={"font-light"}>
              Participation is free for all types of participants!
            </p>
          </div>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={FuelIcon} alt={""} />
            <div className={"fcol gap-3"}>
              <p className={"font-light"}>
                Attendee participants will be selected based on their letters of
                motivation.
              </p>
              <p className={"font-light"}>
                Attendee participants will be selected based on their letters of
                motivation. Contributed speaker and Science Slammer participants
                will be selected based on their CVs, scientific background, and
                video presentations.
              </p>
            </div>
          </div>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={BusIcon} alt={""} />
            <p className={"font-light"}>
              Free shuttle service to Almetyevsk will be organized from the
              points indicated on the map
            </p>
          </div>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={CupIcon} alt={""} />
            <p className={"font-light"}>
              During the days of the conference, meals and coffee breaks will be
              organized for all conference participants.
            </p>
          </div>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={PlaneIcon} alt={""} />
            <div className={"fcol gap-2"}>
              <p className={"font-light"}>
                Participants pay their own travel expenses to transfer
                locations.
              </p>
              <p className={"font-light"}>
                {" "}
                Please note that we have special offers for the conference
                participants.
              </p>
              <p className={"font-light"}>
                {" "}
                After registering, you can get promo codes for discounts at our
                partner airline companies.
              </p>
            </div>
          </div>
          <div className={"grid grid-cols-[0.5fr_4fr] gap-6 items-center"}>
            <Image src={CardStopIcon} alt={""} />
            <p className={"font-light"}>
              Basic accommodation options at hotels that we recommend can be
              found here. During the days of the conference, we will organize
              transfers from these hotels to the conference location.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
