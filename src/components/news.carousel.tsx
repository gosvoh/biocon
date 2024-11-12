import Image from "next/image";
import Carousel from "./carousel";
import Link from "next/link";
import { News } from "@/db/schema";
import { biocon } from "@/db/db";
import { Skeleton } from "./ui/skeleton";

export const revalidate = 3600;

export const NewsSkeleton = () => (
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

export default async function NewsCarousel() {
  let data: (typeof News.$inferSelect)[] = [];

  try {
    data = (await biocon.select().from(News)).filter((x) => x.show_article);
  } catch (e) {
    console.error(e);
  }

  if (data.length === 0) return <NewsSkeleton />;

  return (
    <Carousel
      items={data.reverse().map((x, i) => (
        <div
          key={`media-item-${i}`}
          className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
        >
          <Link
            href={x.show_article ? `/news/${x.id}` : x.href}
            target={"_blank"}
            className={"relative overflow-hidden  w-full aspect-[6/4] "}
          >
            <Image
              src={`https://biocon.international/images/${x.image}`}
              alt=""
              fill
              className="rounded-[16px] lg:rounded-[28px] object-fill"
            />
          </Link>
          <p>{x.title}</p>
          <div>
            <Link
              href={x.show_article ? `/news/${x.id}` : x.href}
              className={"styled-link"}
              target={"_blank"}
            >
              Read more
            </Link>
          </div>
        </div>
      ))}
    />
  );
}
