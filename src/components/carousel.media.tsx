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
import Image from "next/image";
import Media1 from "@public/media/1.png";
import Link from "next/link";

export default function CarouselMedia() {
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
              className="md:basis-1/2 xl:basis-1/3 fcol gap-6"
            >
              <Image src={Media1} alt="" className="w-full flex-1" />
              <p>
                Registration for BIOCON 2024 is now open! Read 5 reasons why you
                need to become a conference participant
              </p>
              <Link href="#" className="underline">
                Read more
              </Link>
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
