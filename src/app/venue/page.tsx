import Image from "next/image";
import { cn } from "@/lib/utils";
import Head from "next/head";

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

import TatarCat from "@public/venue/icons/TatarCat.svg";

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
import { RenderTemperature } from "@/app/venue/render.temperature";
import Link from "next/link";

export const metadata = {
  title: "BIOCON 2024 - Venue",
  openGraph: {
    title: "BIOCON 2024 - Venue",
    description: "Venue page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/Venue.png",
      secureUrl: "https://biocon.international/openGraph/Venue.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - Venue",
    description: "Venue page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/Venue.png"],
  },
};

export default function VenuePage() {
  const gallerySection =
    "fcol gap-5  lg:grid lg:grid-cols-2 lg:items-center lg:gap-9";
  const galleryImage =
    "rounded-[16px] lg:rounded-[28px] lg:object-cover lg:aspect-[8/4] w-full lg:object-top";

  return (
    <main>
      <Head>
        <meta property="og:image" content="/metadata/Venue.jpg" />
      </Head>
      <section
        className={cn(
          "relative text-center",
          "text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl",
          "py-8",
          "max-w-none px-0",
          "space-y-[42px] md:space-y-[80px] h-[30rem] lg:h-[45rem]",
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
        <div className="absolute -bottom-12 w-full h-[30%]">
          <Image
            src={PhotoGradient}
            alt=""
            className="w-full h-full object-cover blur-xl bg-[rgba(0,0,0,0.1)]"
          />
        </div>
      </section>
      <section className={"relative lg:grid lg:grid-cols-[1fr_1fr]"}>
        <Image
          src={RightGlow}
          alt={""}
          className={"absolute -z-10 right-0 h-fit w-full top-0 lg:hidden"}
        />
        <div className={"fcol gap-5 lg:gap-8 lg:w-[75%]"}>
          <h1>Almetyevsk</h1>
          <h3>
            Альметьевск (Russian)
            <br />
            Әлмәт (Tatar)
          </h3>
          <p>
            In the Republic of Tatarstan, Almetyevsk is often called “The Oil
            Capital” the city is home to the headquarters of Tatneft and 80% of
            its population is employed by the oil sector <br /> <br />
            In November, the climate in Almetyevsk is generally characterized by
            cool and overcast conditions, with temperatures typically ranging
            from -3°C to 5°C (27°F to 41°F). During this month, it is common to
            experience rain and occasional light snowfall, which contributes to
            the overall chilly atmosphere.
          </p>
        </div>
        <Image
          src={TatarCat}
          alt={""}
          className={"hidden lg:block justify-self-center w-fit h-[80%]"}
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
          <p className={"lg:text-left"}>
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
          <p className={"lg:text-left"}>
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
          <p className={"lg:text-left"}>
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
          <p className={"lg:text-left"}>
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
          <h2>Conference venue</h2>
          <p>
            “Almet” is a modern and well-equipped venue, which is perfect for
            large-scale events. There is everything necessary for the speakers
            performance: a large screen, loop, laser pointer, duplicate screens,
            clicker. On the eve of the speech our team conducts a preparatory
            briefing.
          </p>
        </div>
        <div className={"grid grid-rows-3 gap-5 lg:hidden"}>
          <Link href={"https://yandex.ru/maps/-/CDWhELKO"} target={"_blank"}>
            <Image
              src={MapPhoto}
              alt={""}
              className={"w-full rounded-[16px]"}
            />
          </Link>
          <RenderTemperature />
          <Image
            src={ConferencePC}
            alt={""}
            className={"w-full rounded-[16px]"}
          />
        </div>
        <div className={"hidden lg:block"}>
          <div className={"grid grid-rows-2 gap-6"}>
            <div className={"grid grid-cols-[1fr,1fr] gap-6"}>
              <Link
                href={"https://yandex.ru/maps/-/CDWhELKO"}
                target={"_blank"}
              >
                <Image
                  src={MapPhoto}
                  alt={""}
                  className={"w-full rounded-[28px] h-full"}
                />
              </Link>
              <RenderTemperature />
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
            "absolute -z-10 left-0 w-full h-fit top-1/4 lg:hidden blur-md"
          }
        />
      </section>
      <section className={"text-center"}>
        <h2 className={"lg:text-start text-center"}>
          The terms of participation
        </h2>
        <RenderIcons />
      </section>
      <section className={"relative mb-24"}>
        <h2>Accommodation options</h2>
        <p className={"mb-10 lg:mb-24"}>
          We have gathered several accommodation options for the conference
          days. Key locations have been marked on an{" "}
          <Link
            href={
              "https://yandex.ru/maps/11121/almetyevsk/?azimuth=6.231099757965407&ll=52.322867%2C54.923325&mode=usermaps&source=constructorLink&um=constructor%3A3336d62a0f098e4a7df825d70c7345ac755a8ab05d0b6a4d8a55a818bf5632cf&z=11"
            }
            target={"_blank"}
            className={"link-hover-underline text-[#FE6F61]"}
          >
            interactive map.
          </Link>
        </p>
        <div className={"fcol gap-16 lg:gap-24"}>
          <RenderHotelsInfo />
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
