import Image from "next/image";
import { cn } from "@/lib/utils";
import { biocon } from "@/db/db";
import { Speakers } from "@/db/schema";
import HeroGlow from "@public/HeroGlow.svg";
import SpeakersPageLogoDesktop from "@public/speakers_page/speakers_desktop.svg";
import SpeakersPageLogoMobile from "@public/speakers_page/speakers_mobile.svg";

import ButtonRegistration from "@/components/button.registration";
import BottomGlow from "@public/BottomGlow.svg";
import Card from "@/components/card";
import { Trophy } from "lucide-react";
import { findCountryFlagByName } from "@/app/speakers/country.flags";
import Link from "next/link";
import { Fragment } from "react";

export const revalidate = 3600;

export const metadata = {
  title: "BIOCON 2024 - Keynote speakers",
  openGraph: {
    title: "BIOCON 2024 - Keynote speakers",
    description: "Keynote speakers page of BIOCON 2024",
    images: {
      url: "https://biocon.international/openGraph/SPEAKERS.png",
      secureUrl: "https://biocon.international/openGraph/SPEAKERS.png",
      width: 1920,
      height: 768,
      alt: "BIOCON 2024",
      type: "image/png",
    },
  },
  twitter: {
    title: "BIOCON 2024 - Keynote speakers",
    description: "Keynote speakers page of BIOCON 2024",
    images: ["https://biocon.international/openGraph/SPEAKERS.png"],
  },
};

const Biocon2023Speskers: (Omit<
  typeof Speakers.$inferSelect,
  "id" | "speakerType" | "order" | "university" | "universityUrl"
> & {
  id?: (typeof Speakers.$inferSelect)["id"];
  university: string | string[];
  universityUrl: string | string[];
})[] = [
  {
    name: "Mirza Hasanuzzaman",
    nameUrl: "https://research.com/u/mirza-hasanuzzaman",
    university: "Sher-e-Bangla Agricultural University",
    universityUrl: "https://sau.edu.bd/",
    country: "Bangladesh",
    // TODO add image
    image: "speakers/2023/mirza_hasanuzzaman.jpg",
    thunder: "Highly Cited Researcher - 2022",
    thunderUrl: "https://www.webofscience.com/wos/author/record/416118",
    hIndex: 98,
    description:
      "Most contributed Topics:\n\n1. Physiological, Biochemical, and Molecular Mechanisms of Heat Stress Tolerance in Plants\n2. Plant Response and Tolerance to Abiotic Oxidative Stress: Antioxidant Defense Is a Key Factor",
  },
  {
    name: "Meisam Tabatabaei",
    nameUrl: "https://scholar.google.com/citations?user=7J3mIw4AAAAJ&hl=en",
    university: "Universiti Malaysia Terengganu",
    universityUrl: "https://www.umt.edu.my/",
    country: "Malaysia",
    // TODO add image
    image: "speakers/2023/meisam_tabatabaei.jpg",
    thunder: "Highly Cited Researcher - 2021",
    thunderUrl: "https://www.webofscience.com/wos/author/record/544482",
    hIndex: 100,
    description:
      "Most contributed Topics:\n\n1. The 2020 report of The Lancet Countdown on health and climate change: responding to converging crises\n2. Lignocellulosic biomass to bioethanol, a comprehensive review with a focus on pretreatment\n3. The 2019 report of The Lancet Countdown on health and climate change: ensuring that the health of a child born today is not defined by a changing climate",
  },
  {
    name: "Amin Mousavi Khaneghah",
    nameUrl:
      "https://scholar.google.com/citations?view_op=search_authors&hl=en&mauthors=Mirza+Hasanuzzaman&btnG=",
    university: ["University of Campinas", "ITMO University"],
    universityUrl: [
      "https://unicamp.br/en/",
      "https://en.itmo.ru/?ysclid=madsv8zhd5229375602",
    ],
    // TODO уточнить
    country: "Russia",
    // TODO add image
    image: "speakers/2023/amin_mousavi_khaneghah.jpg",
    thunder: "Highly Cited Researcher - 2021",
    thunderUrl: "https://www.webofscience.com/wos/author/record/156224",
    hIndex: 87,
    description:
      "Most contributed Topics:\n\n1. Global burden of 369 diseases and injuries in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019\n2. Global burden of 87 risk factors in 204 countries and territories, 1990–2019: a systematic analysis for the Global Burden of Disease Study 2019\n3. Global age-sex-specific fertility, mortality, healthy life expectancy (HALE), and population estimates in 204 countries and territories, 1950–2019: a comprehensive demographic analysis for the Global Burden of Disease Study 2019",
  },
  {
    name: "Mukesh Kumar Awasthi",
    nameUrl: "https://scholar.google.co.in/citations?user=Dj3ktGAAAAAJ&hl=en",
    university: "Northwest A&F University 9",
    universityUrl: "https://en.nwsuaf.edu.cn/",
    // TODO уточнить
    country: "China",
    // TODO add image
    image: "speakers/2023/mukesh_kumar_awasthi.jpg",
    thunder: "Highly Cited Researcher - 2022",
    // TODO add thunderUrl
    thunderUrl: "https://www.webofscience.com/wos/author/record/156224",
    hIndex: 69,
    description:
      "Most contributed Topics:\n\n1. AChallenges and opportunities in the phytoremediation of heavy metals contaminated soils: A review\n2. Enhancing phosphate adsorption by Mg/Al layered double hydroxide functionalized biochar with different Mg/Al ratios\n3. Evaluation of thermophilic fungal consortium for organic municipal solid waste composting",
  },
];

const SpeakersList = ({
  speakers,
}: {
  speakers: (typeof Speakers.$inferSelect)[] | typeof Biocon2023Speskers;
}) => (
  <div className={"flex flex-col gap-5"}>
    {speakers.map((speaker) => (
      <Fragment key={`speaker-${speaker.id || speaker.name}`}>
        <Card className="p-0 relative max-lg:hidden">
          <Image
            alt={""}
            width={"90"}
            height={"180"}
            src={findCountryFlagByName(speaker.country)}
            className={
              "absolute right-10 top-10 border-white border-[1px] rounded-[10px]"
            }
          />
          <div className={"grid grid-cols-[25rem_auto] max-w-3/4"}>
            <div
              className={
                "relative rounded-l-[25px] overflow-hidden aspect-[3/4] w-full  h-full"
              }
            >
              <Image
                className={"object-cover"}
                src={"/images/" + speaker.image}
                alt=""
                fill
              />
            </div>
            <div
              className={
                "flex flex-col gap-6 p-12 pt-7 font-light w-full text-lg"
              }
            >
              <div>
                <Link
                  href={speaker.nameUrl}
                  target={"_blank"}
                  className={"link-hover-underline"}
                >
                  <p className={"text-2xl font-normal"}>{speaker.name}</p>
                </Link>
              </div>
              <div className={"flex flex-col gap-3 font-normal"}>
                <div>
                  {Array.isArray(speaker.university) ||
                  Array.isArray(speaker.universityUrl) ? (
                    <div className={"flex flex-col gap-2"}>
                      {(speaker.university as string[]).map(
                        (university, index) => (
                          <Link
                            key={index}
                            href={speaker.universityUrl[index]}
                            target={"_blank"}
                            className={"link-hover-underline w-fit"}
                          >
                            <p>{university}</p>
                          </Link>
                        ),
                      )}
                    </div>
                  ) : (
                    <Link
                      href={speaker.universityUrl}
                      target={"_blank"}
                      className={"link-hover-underline"}
                    >
                      <p>{speaker.university}</p>
                    </Link>
                  )}
                </div>
                <div>
                  {speaker.thunderUrl ? (
                    <Link
                      href={speaker.thunderUrl}
                      target={"_blank"}
                      className={"link-hover-underline"}
                    >
                      <div className={"flex gap-2 items-center"}>
                        <div className="lg:w-5 lg:h-5">
                          <Trophy className="w-full h-full" />
                        </div>
                        <p>{speaker.thunder}</p>
                      </div>
                    </Link>
                  ) : (
                    speaker.thunder && (
                      <div className={"flex gap-2 items-center"}>
                        <div className="lg:w-5 lg:h-5">
                          <Trophy className="w-full h-full" />
                        </div>
                        <p>{speaker.thunder}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
              {speaker.hIndex && (
                <div className="p-5 pl-12 pr-12 border-2 border-white rounded-[66px] min-w-[30%] max-w-max text-center whitespace-nowrap">
                  h-index: {speaker.hIndex}
                </div>
              )}
              <div className={"whitespace-pre-line"}>{speaker.description}</div>
            </div>
          </div>
        </Card>
        <Card className="p-0 overflow-hidden gap-7 lg:hidden" vertical>
          <div
            className={
              "relative overflow-hidden aspect-[5/4] w-full max-w-none"
            }
          >
            <Image
              alt={""}
              width={"70"}
              height={"140"}
              src={findCountryFlagByName(speaker.country)}
              className={
                "absolute right-5 top-5 z-20 border-white border-[1px] rounded-[10px]"
              }
            />
            <Image
              className={"object-cover z-10 aspect-auto"}
              src={"/images/" + speaker.image}
              alt=""
              fill
            />
          </div>
          <div className="p-9 pt-0 flex flex-col gap-4 text-center font-light justify-center items-center max-w-none">
            <Link
              href={speaker.nameUrl}
              className={"underline"}
              target={"_blank"}
            >
              <p className={"font-normal text-lg"}>{speaker.name}</p>
            </Link>
            {Array.isArray(speaker.university) ||
            Array.isArray(speaker.universityUrl) ? (
              <div>
                {(speaker.university as string[]).map((university, index) => (
                  <Link
                    key={index}
                    href={speaker.universityUrl[index]}
                    target={"_blank"}
                    className={"underline"}
                  >
                    <p className={"font-normal"}>{university}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                href={speaker.universityUrl}
                className={"underline"}
                target={"_blank"}
              >
                <p className={"font-normal"}>{speaker.university}</p>
              </Link>
            )}

            {speaker.thunderUrl ? (
              <Link
                href={speaker.thunderUrl}
                target={"_blank"}
                className={"underline"}
              >
                <p className={"font-normal flex gap-2 items-center"}>
                  <Trophy /> {speaker.thunder}{" "}
                </p>
              </Link>
            ) : (
              speaker.thunder && (
                <p className={"font-normal flex gap-2 items-center"}>
                  <Trophy /> {speaker.thunder}{" "}
                </p>
              )
            )}
            {speaker.hIndex && (
              <div className="p-2 border border-white rounded-full w-[60%]">
                h-index: {speaker.hIndex}
              </div>
            )}
            <div className="overflow-wrap whitespace-pre-line hyphens-auto break-words break-all">
              {speaker.description}
            </div>
          </div>
        </Card>
      </Fragment>
    ))}
  </div>
);

export default async function SpeakersPage() {
  let speakers: (typeof Speakers.$inferSelect)[] = [];
  try {
    speakers = await biocon.select().from(Speakers);
    speakers.sort((a, b) => a.order - b.order);
  } catch (e) {
    console.error(e);
  }

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
        <Image
          src={HeroGlow}
          alt=""
          className={cn(
            "absolute  top-1/3 left-1/2 w-fit h-[250%] -z-10",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none",
          )}
        />
        <div className="wrapper fcol gap-8 md: lg:gap-8 xl:gap-[50px]">
          <Image
            src={SpeakersPageLogoDesktop}
            alt="Biocon"
            className="hidden md:block w-[80%] mx-auto"
          />
          <Image
            src={SpeakersPageLogoMobile}
            alt="Biocon"
            className="block md:hidden w-full"
          />
        </div>
        {/* <div className="wrapper">
          <ButtonRegistration text={"I want to be a speaker"} />
        </div> */}
      </section>
      <section className="relative space-y-6 md:space-y-9">
        <div>
          <h2 className="mb-6">Speakers of BIOCON 2024</h2>
          <SpeakersList speakers={speakers} />
        </div>
        <div>
          <h2 className="mb-6 mt-12">Speakers of BIOCON 2023</h2>
          <SpeakersList speakers={Biocon2023Speskers} />
        </div>
        <Image
          src={BottomGlow}
          alt=""
          className="absolute h-[150%] w-fit md:w-[150%] md:h-fit max-w-none -translate-x-1/2 -bottom-10 left-1/2 -z-10"
        />
      </section>
    </main>
  );
}
