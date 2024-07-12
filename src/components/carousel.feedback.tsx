"use client";

import {
  Carousel as ShadCarousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  MoveUpRight,
} from "lucide-react";
import { Button } from "./ui/button";
import Card from "./card";
import Image from "next/image";
import Gurchenko from "@public/humans/Gurchenko.png";

export default function CarouselFeedback() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div className="w-full flex flex-row justify-center items-center gap-[18px] lg:gap-16">
      <Button
        size={"icon"}
        variant={"ghost"}
        className="flex-shrink-0 flex-grow-1"
        onClick={() => api?.scrollPrev()}
      >
        <ChevronLeft className="w-4 h-4 lg:hidden" />
        <ArrowLeft className="w-6 h-6 max-lg:hidden" />
      </Button>
      <ShadCarousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, i) => (
            <CarouselItem
              key={`carousel-item-${i}`}
              className="md:basis-1/2 xl:basis-1/3"
            >
              <Card
                icon={<MoveUpRight />}
                className="space-y-2 lg:space-y-6 max-md:[&>*]:max-w-none max-md:pb-[60px]"
              >
                <div className="flex flex-row gap-4 md:gap-6 items-center">
                  <Image
                    src={Gurchenko}
                    alt="Gurchenko Elena"
                    className="min-w-[50px] h-full w-fit"
                  />
                  <h3>Gurchenko Elena</h3>
                </div>
                <p>
                  It should not be forgotten, however, that consultation with
                  the wider community largely determines the creation of systems
                  of mass participation. The significance of these problems is
                  so obvious that the implementation
                </p>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </ShadCarousel>
      <Button
        size={"icon"}
        variant={"ghost"}
        className="flex-shrink-0"
        onClick={() => api?.scrollNext()}
      >
        <ChevronRight className="w-4 h-4 lg:hidden" />
        <ArrowRight className="w-6 h-6 max-lg:hidden" />
      </Button>
    </div>
  );
}
