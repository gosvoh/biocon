import { cn } from "@/lib/utils";
import Link from "./link";
import { componentsClassNames } from "@/app/classNames";
import { Speakers } from "@prisma/client/biocon";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import TrophyFilled from "@ant-design/icons/lib/icons/TrophyFilled";

export default function SpeakerCard({
  speaker,
  className,
  ...props
}: { speaker: Speakers } & React.HTMLProps<HTMLDivElement>) {
  const [isValidImage, setIsValidImage] = useState(false);
  const imgUrl = `/images/${speaker.image}.webp`;
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "https://biocon.international"
      : "";

  useEffect(() => {
    if (!speaker.image) return;
    fetch(baseUrl + imgUrl).then((res) => setIsValidImage(res.ok));
  }, [speaker.image, imgUrl, baseUrl]);

  const Img = isValidImage
    ? () => (
        <div className="relative w-full aspect-square">
          <Image
            src={baseUrl + imgUrl}
            alt={speaker.name}
            fill
            className="rounded-lg object-cover aspect-square"
            sizes="(max-width: 640px) 100vw, 33vw"
          />
        </div>
      )
    : () => <Skeleton className="rounded-lg aspect-square w-full" />;

  return (
    <div
      {...props}
      className={cn(
        "flex flex-col",
        "items-start",
        "w-full p-2",
        componentsClassNames.sm.className,
        "space-y-4",
        className
      )}
    >
      <Img />
      <Link
        href={speaker.nameUrl}
        className={cn(
          componentsClassNames.lg.className,
          "text-center hover:underline mx-auto",
          "min-h-[3.5rem] md:min-h-[4rem]"
        )}
      >
        {speaker.name}
      </Link>
      <Link
        href={speaker.universityUrl}
        className="mb-4 hover:underline text-center mx-auto min-h-[2.5rem] sm:min-h-[3rem] md:min-h-[3.5rem]"
      >
        {speaker.university}
      </Link>
      <p
        className={cn(
          componentsClassNames.base.className,
          "w-full text-center font-bold"
        )}
      >
        {speaker.country}
      </p>
      <div className="border border-white rounded-lg text-center px-4 py-2 w-full">
        <p className={cn(componentsClassNames.lg.className, "font-semibold")}>
          {speaker.hIndex}
        </p>
        <p>
          <span className="italic">h</span>-index
        </p>
      </div>
      {speaker.thunder && (
        <>
          {speaker.thunderUrl ? (
            <Link
              href={speaker.thunderUrl}
              className="text-center flex items-center justify-center gap-2 hover:underline mx-auto"
            >
              <TrophyFilled className="text-yellow-400" /> {speaker.thunder}
            </Link>
          ) : (
            <p className="text-center flex items-center justify-center gap-2">
              <TrophyFilled className="text-yellow-400" /> {speaker.thunder}
            </p>
          )}
        </>
      )}
      {speaker.topic && <p>Lecture topic: {speaker.topic}</p>}
      {speaker.description && <p>{speaker.description}</p>}
    </div>
  );
}
