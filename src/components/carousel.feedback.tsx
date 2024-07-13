"use client";

import { cn } from "@/lib/utils";
import { SiTelegram } from "@icons-pack/react-simple-icons";
import { Modal } from "antd";
import { MoveUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Card from "./card";
import Carousel from "./carousel";

export default function CarouselFeedback({
  cardContent = [],
}: {
  cardContent: {
    icon: StaticImageData;
    name: string;
    affiliation: string;
    description: string;
    tg: string;
  }[];
}) {
  const [modal, context] = Modal.useModal();

  return (
    <>
      {context}
      <Carousel
        items={cardContent.map((content, i) => {
          const CardContent = ({ tgLink }: { tgLink?: boolean }) => (
            <>
              <div className="flex flex-row gap-4 md:gap-6 items-center max-w-none">
                <Image
                  src={content.icon}
                  alt={content.name}
                  className="aspect-square w-20 object-cover rounded-full object-center"
                  sizes="6rem"
                />
                <h3>{content.name}</h3>
              </div>
              <p>{content.affiliation}</p>
              <p>{content.description}</p>
              {tgLink ? (
                <Link
                  href={`https://t.me/${content.tg.replace("@", "")}`}
                  className={cn(
                    "flex flex-row gap-2 items-center !mt-auto mb-0",
                    "text-white/60 hover:text-white max-w-fit",
                  )}
                  target="_blank"
                >
                  <SiTelegram />
                  <span>{content.tg}</span>
                </Link>
              ) : (
                <span className="flex flex-row gap-2 items-center !mt-auto mb-0">
                  <SiTelegram />
                  <span>{content.tg}</span>
                </span>
              )}
            </>
          );

          return (
            <Card
              key={`feedback-card-${i}`}
              icon={<MoveUpRight />}
              onClick={() => {
                modal.info({
                  icon: null,
                  closable: true,
                  maskClosable: true,
                  width: 800,
                  centered: true,
                  okButtonProps: { style: { boxShadow: "none" } },
                  content: (
                    <div className="fcol gap-4">
                      <CardContent tgLink />
                    </div>
                  ),
                });
              }}
              className="feedback-card"
            >
              <CardContent />
            </Card>
          );
        })}
      />
    </>
  );
}
