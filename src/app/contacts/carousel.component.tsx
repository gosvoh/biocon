"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel.speakers.organizers";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Organizers } from "@/db/schema";
import Link from "next/link";
import GradientR from "@public/contacts/gradientr.png";
import GradientL from "@public/contacts/gradientl.png";

export const CarouselComponent = ({
  organizersArray,
}: {
  organizersArray: (typeof Organizers.$inferSelect)[];
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className={"fcol gap-4 text-center"}>
      <Carousel setApi={setApi}>
        <CarouselContent>
          {organizersArray.map((organizer, index) => (
            <CarouselItem key={index}>
              <div className={"fcol gap-5 text-center"}>
                <div className={"relative w-full aspect-[4/3]"}>
                  <Image
                    src={`/images/${organizer.image}`}
                    alt={""}
                    fill={true}
                    className={"object-cover rounded-[21px]"}
                  />
                  <div className="absolute top-0 -right-0 h-full w-[15%] overflow-hidden">
                    <Image
                      src={GradientR}
                      alt=""
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                  <div className="absolute top-0 -left-0 h-full w-[15%] overflow-hidden">
                    <Image
                      src={GradientL}
                      alt=""
                      fill={true}
                      objectFit="cover"
                    />
                  </div>
                </div>
                <div className={"fcol gap-3"}>
                  <div className={"fcol gap-1"}>
                    <h3>{organizer.name}</h3>
                    <p className={"font-light"}>{organizer.position}</p>
                  </div>
                  <Link
                    href={`mailto:${organizer.email}`}
                    className={"underline"}
                  >
                    <h3>{organizer.email}</h3>
                  </Link>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious speakers={false} />
        <CarouselNext speakers={false} />
      </Carousel>
      <p>
        {current} / {count}
      </p>
    </div>
  );
};
