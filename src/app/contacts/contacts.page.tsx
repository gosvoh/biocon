import Card from "@/components/card";
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
  infoArray: Array<{ title: string; description: string }>;
}) => (
  <div className={"fcol gap-5 lg:grid lg:grid-cols-4"}>
    {infoArray.map((infoElem, index) => (
      <Card
        moveIcon
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6A25BA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
        }
        key={index}
        className={"relative lg:rounded-[28px] rounded-[16px] p-7 lg:p-11"}
      >
        <div className={"grid grid-rows-[1fr,0.5fr] gap-3 "}>
          <div className={"fcol gap-5"}>
            <h3 className={"font-normal"}>{infoElem.title}</h3>
            <p className={"font-light"}>{infoElem.description}</p>
          </div>
        </div>
      </Card>
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
      <section className={"fcol lg:gap-14 gap-7"}>
        <Image
          src={HeroGlow}
          alt=""
          className={cn(
            "absolute rotate-[40deg] top-1/4 left-[70%] w-fit h-[140%] -z-10 scale-75 blur-xl lg:hidden",
            "-translate-x-1/2 -translate-y-1/2",
            "max-w-none max-h-none",
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
            },
            {
              title: "About BIOCON",
              description: "Download presentation",
            },
            {
              title: "Media press kit",
              description: "Download press release",
            },
            {
              title: "Use of logos and identity",
              description: "Download brand breech",
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
