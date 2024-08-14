import Image from "next/image";
import Carousel from "./carousel";
import Link from "next/link";
import { MediaAboutUs } from "@/db/schema";
import { biocon } from "@/db/db";
import { Skeleton } from "./ui/skeleton";

export const dynamic = "force-dynamic";

export const MediaAboutUsSkeleton = () => (
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

export default async function MediaAboutUsCarousel() {
  let data: (typeof MediaAboutUs.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(MediaAboutUs);
  } catch (e) {
    console.error(e);
  }

  if (data.length === 0) return <MediaAboutUsSkeleton />;

  return (
    <Carousel
      items={data.reverse().map((x, i) => (
        <div
          key={`media-item-${i}`}
          className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
        >
          <div className={"relative overflow-hidden  w-full aspect-[6/4]"}>
            <Image
              src={`/images/${x.image}`}
              alt=""
              fill
              className="rounded-[16px] lg:rounded-[28px] object-fill"
            />
          </div>
          <p>{x.title}</p>
          <div>
            <Link href={x.href} className="styled-link" target={"_blank"}>
              Read more
            </Link>
          </div>
        </div>
      ))}
    />
  );
}
