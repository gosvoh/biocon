import Image from "next/image";
import BigSideGlow from "@public/BigSideGlow.svg";
import SideGlow from "@public/contacts/LeftGlow.svg";
import { cn } from "@/lib/utils";
import BottomGlow from "@public/contacts/BottomGlow.svg";
import BottomGlowMobile from "@public/contacts/BottomGlowMobile.svg";
import { CarouselComponent } from "@/app/contacts/carousel.component";
import HeroGlow from "@public/HeroGlow.svg";
import { ContactUsForm } from "@/app/contacts/contact.us.form";
import { Organizers } from "@/db/schema";
import Link from "next/link";
import { ContactsCard } from "@/app/contacts/contacts.card";

const LeftGlow = ({
  className,
  big = false,
}: {
  className?: string;
  big?: boolean;
}) => (
  <Image
    src={big ? BigSideGlow : SideGlow}
    alt=""
    className={cn(
      "absolute top-[50%] h-[250%] -left-0 -z-10 px-0 w-fit -translate-y-1/2 max-w-none blur-md",
      className,
    )}
  />
);

const RightGlow = ({
  className,
  big = false,
}: {
  className?: string;
  big?: boolean;
}) => (
  <Image
    src={big ? BigSideGlow : SideGlow}
    alt=""
    className={cn(
      "absolute top-[80%] -right-20 -z-10 h-[150%] w-fit px-0 -translate-y-1/2 max-w-none",
      className,
    )}
  />
);

const RenderPartnersInfoCards = ({
  infoArray,
}: {
  infoArray: Array<{
    title: string;
    description: string;
    redirectInstantly?: boolean;
    redirectLink: string;
    redirectLinkRu?: string;
  }>;
}) => (
  <div className={"fcol gap-5 lg:grid lg:grid-cols-4"}>
    {infoArray.map((infoElem, index) => (
      <ContactsCard
        key={index}
        title={infoElem.title}
        description={infoElem.description}
        redirectLink={infoElem.redirectLink}
        redirectInstantly={infoElem.redirectInstantly}
        redirectLinkRu={infoElem.redirectLinkRu}
      />
    ))}
  </div>
);

export default function ContactsPage({
  organizers,
}: {
  organizers: (typeof Organizers.$inferSelect)[];
}) {
  return (
    <main>
      <section className={"fcol lg:gap-14 gap-7 relative"}>
        <Image
          src={HeroGlow}
          alt=""
          className={cn(
            "absolute rotate-[40deg] top-1/4 left-[70%] w-fit h-[140%] -z-10 scale-75 blur-xl lg:hidden",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none overflow-x-hidden",
          )}
        />
        <h2 className={"font-normal m-0"}>Contacts</h2>
        <div className={"hidden lg:grid grid-cols-4 gap-x-8 gap-y-16 "}>
          {organizers.map((organizer, index) => (
            <div key={index} className={"fcol gap-6"}>
              <div className={"relative w-full aspect-square"}>
                <Image
                  src={`/images/${organizer.image}`}
                  alt={""}
                  fill={true}
                  className={"object-cover rounded-[28px]"}
                />
              </div>
              <div className={"fcol gap-2"}>
                <div className={"fcol gap-1"}>
                  <h3 className={"font-normal"}>{organizer.name}</h3>
                  <p>{organizer.position}</p>
                </div>
                <Link
                  href={`mailto:${organizer.email}`}
                  className={"underline"}
                >
                  <small className={"font-light"}>{organizer.email}</small>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className={"block lg:hidden"}>
          <CarouselComponent organizersArray={organizers} />
        </div>
      </section>
      <section className={"relative "}>
        <LeftGlow className="hidden lg:block" />
        <h2 className={"font-normal"}>For our partners</h2>
        <RenderPartnersInfoCards
          infoArray={[
            {
              title: "Become our media partner",
              description: "Download partners program",
              redirectLink:
                "https://drive.google.com/file/d/1zEgF5HRVqiVg8LDHHCyAEh5vNDQI_sK1/view",
              redirectInstantly: true,
            },
            {
              title: "About BIOCON",
              description: "Download presentation",
              redirectLink:
                "https://drive.google.com/file/d/1fuGzWuepbX90mcQbV_a8TqmNH5wo6DhV/view?usp=sharing",
              redirectLinkRu:
                "https://drive.google.com/file/d/11frvCVFJJzZ0KCBF1S0DaX7eWfaMbBrG/view?usp=sharing",
            },
            {
              title: "Media press kit",
              description: "Download press release",
              redirectLink:
                "https://drive.google.com/file/d/10NzuVeS03_pYk8EzAE8vM7vpxNmZ1Uh_/view",
              redirectInstantly: true,
            },
            {
              title: "Use of logos and identity",
              description: "Download brand breech",
              redirectLink:
                "https://drive.google.com/file/d/1HzM96rD4MTUy0hne3B6UeicCfkp5cnZx/view?usp=sharing",
              redirectLinkRu:
                "https://drive.google.com/file/d/1XBJtG32W0I44WoDtVGIson6bcmif2z_J/view?usp=sharing",
            },
          ]}
        />
        <RightGlow big className=" w-[180%] lg:hidden" />
      </section>
      <section className="relative">
        <div className={"lg:fcol lg:items-center"}>
          <h2 className={"font-normal"}>Contact us</h2>
          <ContactUsForm />
        </div>
        <Image
          src={BottomGlow}
          alt=""
          className="absolute h-[90%] -bottom-32 right-0 w-[150%] -z-10 hidden lg:block blur-md"
        />
        <Image
          src={BottomGlowMobile}
          alt=""
          className="absolute h-fit w-[100%] max-w-none -bottom-16 left-0 -z-10 lg:hidden "
        />
      </section>
    </main>
  );
}
