import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { componentsClassNames } from "@/app/classNames";

export default function OrganizersSkeleton({
  ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "flex-1 basis-5/12",
        "md:last:flex-grow-0 md:last:basis-1/2",
        "grid grid-cols-[auto,1fr]",
        "justify-center items-center",
        "w-full gap-4 p-4",
        "border-2 border-white rounded-xl",
        "gap-4",
        props.className
      )}
    >
      <Skeleton className="rounded-lg aspect-square w-[100px] md:w-[150px]" />
      <div
        className={cn(
          componentsClassNames.sm.className,
          "flex flex-col justify-center w-full space-y-4"
        )}
      >
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-3/4 h-4" />
      </div>
    </div>
  );
}
