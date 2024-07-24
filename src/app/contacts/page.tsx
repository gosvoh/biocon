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

const mockContacts = [
  {
    id: 1,
    name: "John Doe",
    position: "CEO",
    email: "john.doe@example.com",
    phone: "+1-555-123-4567",
    image: "/humans/Barua.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "CTO",
    email: "jane.smith@example.com",
    phone: "+1-555-234-5678",
    image: "/humans/Barua.jpg",
  },
  {
    id: 3,
    name: "Robert Johnson",
    position: "CFO",
    email: "robert.johnson@example.com",
    phone: "+1-555-345-6789",
    image: "/humans/Barua.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "COO",
    email: "emily.davis@example.com",
    phone: null,
    image: "/humans/Barua.jpg",
  },
  {
    id: 5,
    name: "Michael Brown",
    position: "CMO",
    email: "michael.brown@example.com",
    phone: "+1-555-567-8901",
    image: "/humans/Barua.jpg",
  },
  {
    id: 6,
    name: "Jessica Wilson",
    position: "CIO",
    email: "jessica.wilson@example.com",
    phone: "+1-555-678-9012",
    image: "/humans/Barua.jpg",
  },
  {
    id: 7,
    name: "David Martinez David Martinez ",
    position: "CHRO",
    email: "david.martinez@example.com",
    phone: null,
    image: "/humans/Barua.jpg",
  },
  {
    id: 8,
    name: "Laura Lee",
    position: "CPO",
    email: "laura.lee@example.com",
    phone: "+1-555-890-1234",
    image: "/humans/Barua.jpg",
  },
  {
    id: 9,
    name: "James White",
    position: "CLO",
    email: "james.white@example.com",
    phone: "+1-555-901-2345",
    image: "/humans/Barua.jpg",
  },
  {
    id: 10,
    name: "Sarah Harris ",
    position: "CCO",
    email: "sarah.harris@example.com",
    phone: null,
    image: "/humans/Barua.jpg",
  },
];

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
      "absolute top-[90%] h-[120%] -left-0 -z-10 px-0 w-fit -translate-y-1/2 max-w-none blur-md",
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

export default function ContactsPage() {
  return (
    <main>
      <section className={"fcol lg:gap-14 gap-7 relative"}>
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
          {mockContacts.map((mockContact, index) => (
            <div key={index} className={"fcol gap-6"}>
              <div className={"relative w-full aspect-square"}>
                <Image
                  src={"/humans/Barua.jpg"}
                  alt={"2222"}
                  fill={true}
                  className={"object-cover rounded-[28px]"}
                />
              </div>
              <div className={"fcol gap-3"}>
                <h3 className={"font-normal"}>{mockContact.name}</h3>
                <p>{mockContact.position}</p>
                <div className={"fcol"}>
                  <small className={"font-light"}>{mockContact.email}</small>
                  {mockContact.phone && (
                    <small className={"font-light"}>{mockContact.phone}</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={"block lg:hidden"}>
          <CarouselComponent organizersArray={mockContacts} />
        </div>
        <LeftGlow className="hidden lg:block" />
      </section>
      <section className={" relative"}>
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
          className="absolute h-[90%] -bottom-32 right-0 w-full -z-10 hidden lg:block"
        />
        <Image
          src={BottomGlowMobile}
          alt=""
          className="absolute h-fit w-[100%] max-w-none -bottom-16 left-0 -z-10 lg:hidden"
        />
      </section>
    </main>
  );
}
