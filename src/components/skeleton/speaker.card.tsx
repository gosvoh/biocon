import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function SpeakerCardSkeleton({
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col",
        "justify-center",
        "w-full p-2",
        "gap-4",
        props.className
      )}
    >
      <Skeleton className="rounded-lg aspect-square w-full flex-grow" />
      <Skeleton className="w-3/4 h-[3.5rem] md:h-[4rem] mx-auto" />
      <Skeleton className="w-3/4 h-[2.5rem] sm:h-[3rem] md:h-[3.5rem] mx-auto" />
      <Skeleton className="w-1/2 h-4 mx-auto" />
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full my-8 space-y-2">
        <Skeleton className="w-1/2 h-6 mx-auto" />
        <Skeleton className="w-1/2 h-6 mx-auto" />
      </div>
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-3/4 h-4" />
      <Skeleton className="w-3/4 h-32" />
    </div>
  );
}
