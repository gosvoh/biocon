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

export const CarouselComponent = ({
  organizersArray,
}: {
  organizersArray: Array<{
    id: number;
    name: string;
    position: string;
    email: string;
    phone: string | null;
    image: string;
  }>;
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
          {organizersArray.map((mockContact, index) => (
            <CarouselItem key={index}>
              <div className={"fcol gap-5 text-center"}>
                <div className={"relative w-full aspect-[5/3]"}>
                  <Image
                    src={"/humans/Barua.jpg"}
                    alt={""}
                    fill={true}
                    className={"object-cover rounded-[16px]"}
                  />
                </div>
                <div className={"fcol gap-3"}>
                  <div className={"fcol gap-2"}>
                    <h3 className={"font-normal"}>{mockContact.name}</h3>
                    <p className={"font-light"}>{mockContact.position}</p>
                  </div>
                  <div className={"fcol gap-1"}>
                    <h3 className={"font-normal underline"}>
                      {mockContact.email}
                    </h3>
                    {mockContact.phone && (
                      <h3 className={"font-normal"}>{mockContact.phone}</h3>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className={"left-0 pb-4"} />
        <CarouselNext className={"right-0 pb-4"} />
      </Carousel>
      <p>
        {current} / {count}
      </p>
    </div>
  );
};
