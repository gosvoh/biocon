import Image, { StaticImageData } from "next/image";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { componentsClassNames } from "@/app/classNames";
import Link from "./link";

export default function OrganizerCard({
  name,
  position,
  image,
  email,
  className,
  ...props
}: {
  name: string;
  position: string;
  image?: StaticImageData | string;
  email: string;
} & React.HTMLProps<HTMLDivElement>) {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://biocon.international"
      : "";

  const Img = image
    ? () => (
        <Image
          src={baseUrl + image}
          alt={name}
          width={150}
          height={150}
          className="rounded-lg aspect-square object-cover"
          sizes="300px, (min-width: 768px) 600px"
        />
      )
    : () => (
        <Skeleton className="rounded-lg aspect-square w-[100px] md:w-[150px]" />
      );

  return (
    <div
      {...props}
      className={cn(
        "grid grid-cols-[auto,1fr]",
        "justify-center items-center",
        "w-full gap-4 p-4",
        "border-2 border-white rounded-xl",
        className
      )}
    >
      <Img />
      <div
        className={cn(
          componentsClassNames.sm.className,
          "flex flex-col justify-center w-full"
        )}
      >
        <h2 className={cn(componentsClassNames.base.className)}>{name}</h2>
        <p>{position}</p>
        <Link href={`mailto:${email}`} className="hover:underline">
          {email}
        </Link>
      </div>
    </div>
  );
}
