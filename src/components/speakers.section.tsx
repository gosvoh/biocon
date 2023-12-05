import { useSpeakers } from "@/app/providers/speakers.provider";
import { cn } from "@/lib/utils";
import { Speakers } from "@prisma/client/biocon";
import SpeakerCardSkeleton from "./skeleton/speaker.card";
import SpeakerCard from "./speaker.card";
import { buttonVariants } from "./ui/button";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Icon from "./icon";
import Section from "./section";
import H1 from "./h1";
import { componentsClassNames } from "@/app/classNames";

export default function SpeakersComp() {
  const { speakers, speakersReady } = useSpeakers();
  const NormalWrapper = ({
    elements,
    className,
  }: {
    elements: Speakers[];
    className?: React.HTMLProps<HTMLDivElement>["className"];
  }) => (
    <div
      className={cn(
        "w-full hidden md:flex flex-wrap gap-8 justify-items-center justify-around",
        className
      )}
    >
      {!speakersReady || elements.length === 0
        ? Array.from({ length: 3 }).map((_, i) => (
            <SpeakerCardSkeleton
              key={i}
              className="basis-[80%] md:basis-3/12"
            />
          ))
        : elements.map((speaker) => (
            <SpeakerCard
              key={speaker.id}
              speaker={speaker}
              className="basis-[80%] md:basis-3/12"
            />
          ))}
    </div>
  );

  const MobileWrapper = ({
    elements,
    className,
  }: {
    elements: Speakers[];
    className?: React.HTMLProps<HTMLDivElement>["className"];
  }) => (
    <div className={cn("w-full flex md:hidden gap-4 items-center", className)}>
      <div
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "swiper-button-prev flex-1 aspect-square rounded-full border-white"
        )}
      >
        <Icon name="chevron-left" className="w-4 h-4" />
      </div>
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 3000 }}
      >
        {elements.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SpeakerCardSkeleton />
              </SwiperSlide>
            ))
          : elements.map((speaker) => (
              <SwiperSlide key={speaker.id}>
                <SpeakerCard
                  key={speaker.id}
                  speaker={speaker}
                  className="text-center"
                />
              </SwiperSlide>
            ))}
      </Swiper>
      <div
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "swiper-button-next flex-1 aspect-square rounded-full border-white"
        )}
      >
        <Icon name="chevron-right" className="w-4 h-4" />
      </div>
    </div>
  );

  const Wrapper = ({ elements }: { elements: Speakers[] }) => (
    <>
      <NormalWrapper elements={elements} />
      <MobileWrapper elements={elements} />
    </>
  );

  const plenarySpeakers = speakers.filter(
    (speaker) => speaker.speakerType === "plenary"
  );
  const invitedSpeakers = speakers.filter(
    (speaker) => speaker.speakerType === "invited"
  );
  const chairpersonSpeakers = speakers.filter(
    (speaker) => speaker.speakerType === "chairperson"
  );

  return (
    <Section
      className="flex flex-col justify-center items-center"
      id="speakers"
    >
      <H1 className="text-right">Speakers</H1>
      {plenarySpeakers.length !== 0 && (
        <>
          <h2 className={cn(componentsClassNames.xl2.className, "mb-8")}>
            Plenary
          </h2>
          <Wrapper elements={plenarySpeakers} />
        </>
      )}

      {invitedSpeakers.length !== 0 && (
        <>
          <h2 className={cn(componentsClassNames.xl2.className, "mb-8 mt-32")}>
            Invited
          </h2>
          <Wrapper elements={invitedSpeakers} />
        </>
      )}

      {chairpersonSpeakers.length !== 0 && (
        <>
          <h2 className={cn(componentsClassNames.xl2.className, "mb-8 mt-32")}>
            Chairperson
          </h2>
          <Wrapper elements={chairpersonSpeakers} />
        </>
      )}
    </Section>
  );
}
