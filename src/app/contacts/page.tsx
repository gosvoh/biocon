import Card from "@/components/card";
import Image from "next/image";
import BigSideGlow from "@public/BigSideGlow.svg";
import SideGlow from "@public/SideGlow.svg";
import { cn } from "@/lib/utils";
import BottomGlow from "@public/BottomGlow.svg";
import { CarouselComponent } from "@/app/contacts/carousel.component";

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
      "absolute top-1/2 h-[125%] -left-16 -z-10 w-fit px-0 -translate-y-1/2 max-w-none rotate-180",
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
      "absolute top-1/2 -right-14 -z-10 h-[125%] w-fit px-0 -translate-y-1/2 max-w-none",
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
        <LeftGlow big className="" />
      </section>
      <section className={"relative"}>
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
      </section>
      <section className="relative">
        <h2 className={"font-normal"}>Contact us</h2>
        <Image
          src={BottomGlow}
          alt=""
          className="absolute h-[150%] w-fit md:w-[150%] md:h-fit max-w-none -translate-x-1/2 -bottom-10 left-1/2 -z-10"
        />
      </section>
    </main>
  );
}
