"use client";

import {
  Carousel as ShadCarousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function Carousel({ items = [] }: { items: React.ReactNode[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sub = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", sub);

    return () => {
      api.off("select", sub);
    };
  }, [api]);

  return (
    <div className="w-full fcol justify-center items-center gap-[18px]">
      <ShadCarousel className="w-full" setApi={setApi} opts={{ loop: true }}>
        <CarouselContent>
          {items.map((content, i) => (
            <CarouselItem
              key={`carousel-item-${i}`}
              className="md:basis-1/2 xl:basis-1/3"
            >
              {content}
            </CarouselItem>
          ))}
        </CarouselContent>
      </ShadCarousel>
      <div className="flex flex-row gap-4 items-center">
        <Button
          size={"icon"}
          variant={"ghost"}
          className="flex-shrink-0 flex-grow-1"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="w-4 h-4 lg:hidden" />
          <ArrowLeft className="w-6 h-6 max-lg:hidden" />
        </Button>
        <div className="flex flex-row gap-2">
          {Array.from({ length: items.length }).map((_, i) => (
            <div
              key={`dot-${i}`}
              className={cn(
                "w-2 h-2 bg-gray-300 rounded-full",
                "hover:bg-gray-400 cursor-pointer",
                currentSlide === i && "bg-gray-700",
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
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
    </div>
  );
}
