import Carousel from "./carousel";
import { MediaAboutUs } from "@/db/schema";
import { biocon } from "@/db/db";
import { Skeleton } from "./ui/skeleton";
import MediaAboutUsCarousel from "./media.about.us.carousel";

export const revalidate = 3600;

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

export default async function MediaAboutUsAsyncCarousel() {
  let data: (typeof MediaAboutUs.$inferSelect)[] = [];

  try {
    data = await biocon.select().from(MediaAboutUs);
  } catch (e) {
    console.error(e);
  }

  if (data.length === 0) return <MediaAboutUsSkeleton />;

  return <MediaAboutUsCarousel data={data} />;
}
