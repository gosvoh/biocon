import Image from "next/image";
import Carousel from "./carousel";
import Link from "next/link";
import { Organizers } from "@/db/schema";
import { Skeleton } from "./ui/skeleton";

export const ContactsSkeleton = () => (
  <Carousel
    items={Array.from({ length: 5 }).map((_, i) => (
      <div
        key={`media-item-${i}`}
        className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
      >
        <Skeleton className="w-full h-60" />
        <div className="space-y-2">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-2/3 h-6" />
          <Skeleton className="w-1/2 h-6" />
        </div>
        <Skeleton className="w-1/3 h-6" />
      </div>
    ))}
  />
);

export default async function ContactsCarousel({
  organizersArray,
}: {
  organizersArray: (typeof Organizers.$inferSelect)[];
}) {
  if (organizersArray.length === 0) return <ContactsSkeleton />;

  return (
    <Carousel
      items={organizersArray.reverse().map((organizer, index) => (
        <div key={index} className={"fcol gap-5 text-center"}>
          <div className={"relative w-full aspect-[4/3]"}>
            <Image
              src={`/images/${organizer.image}`}
              alt={""}
              fill={true}
              className={"object-cover rounded-[21px]"}
            />
          </div>
          <div className={"fcol gap-3"}>
            <div className={"fcol gap-1"}>
              <h3>{organizer.name}</h3>
              <p className={"font-light"}>{organizer.position}</p>
            </div>
            <Link href={`mailto:${organizer.email}`} className={"underline"}>
              <h3>{organizer.email}</h3>
            </Link>
          </div>
        </div>
      ))}
    />
  );
}
