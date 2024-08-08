"use client";
import { Modal } from "antd";
import { ReactNode } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/accordion.program";

const IndustrialBiotechnology = [
  "Production of several chemical ingredients",
  "Industrial production of biofuels and bioenergy",
  "The importance of biopolymers for the future of the industry",
  "Other compounds obtained for industrial purposes",
];

const AgriculturalBiology = [
  "Transgenic or genetically modified organisms",
  "Power generation using green biotechnology tools",
  "Production of biopolymers using green biotechnology",
];

const MarineBiotechnology = [
  "Potential for novel bioactive compounds production",
  "Food industry applications",
  "Cosmetic industry",
  "Biofuels originated from marine resources",
];

const titleArray = [
  "Industrial Biotechnology",
  "Agricultural biotechnology",
  "Marine and fresh-water biotechnology",
];

export const RenderAccordion = ({
  className,
  title,
  description,
}: {
  className?: string;
  title: string | ReactNode;
  description: string | ReactNode;
}) => (
  <Accordion type="single" collapsible className={"block lg:hidden"}>
    <AccordionItem value="item-1">
      <AccordionTrigger className={className}>{title}</AccordionTrigger>
      <AccordionContent>{description}</AccordionContent>
    </AccordionItem>
  </Accordion>
);

const RenderList = ({
  listItems,
  isModal = false,
}: {
  listItems: Array<string>;
  isModal?: boolean;
}) => (
  <>
    <div>
      Main applications:
      <ul className={`${isModal && "pl-8"}`}>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </>
);

export const RenderAccordions = () => (
  <>
    {titleArray.map((title, index) => (
      <RenderAccordion
        key={index}
        title={title}
        description={
          <RenderList
            listItems={
              index == 0
                ? IndustrialBiotechnology
                : index == 1
                  ? AgriculturalBiology
                  : MarineBiotechnology
            }
          />
        }
        className={`${index == 0 && "text-black bg-white"} ${index == 1 && "bg-[#6CCD86]"} ${index == 2 && "text-left text-white pt-5 pb-5 bg-[#2531BA]"}`}
      />
    ))}
  </>
);

export const ProgramPageCards = () => {
  const [api, context] = Modal.useModal();
  return (
    <>
      {context}
      {titleArray.map((title, index) => (
        <div
          onClick={() =>
            api.info({
              icon: null,
              footer: null,
              closable: true,
              className: "max-h-max overflow-y-auto p-6",
              width: "600px",
              content: (
                <div className={"mt-5 mb-5 ml-2 mr-2 fcol gap-8"}>
                  {index == 2 ? (
                    <h3>
                      {title.split(" ")[0]} {title.split(" ")[1]}{" "}
                      {title.split(" ")[2]} <br /> {title.split(" ")[3]}
                    </h3>
                  ) : (
                    <h3>{title}</h3>
                  )}
                  <RenderList
                    isModal={true}
                    listItems={
                      index == 0
                        ? IndustrialBiotechnology
                        : index == 1
                          ? AgriculturalBiology
                          : MarineBiotechnology
                    }
                  />
                </div>
              ),
            })
          }
          key={index}
          className={`p-10 rounded-[28px] ${index == 0 && "text-black bg-white"} ${index == 1 && "bg-[#6CCD86]"} ${index == 2 && "bg-[#2531BA]"} cursor-pointer scale-animation`}
        >
          {index == 2 ? (
            <h3>
              {title.split(" ")[0]} {title.split(" ")[1]} <br />{" "}
              {title.split(" ")[2]} <br /> {title.split(" ")[3]}
            </h3>
          ) : (
            <h3>{title}</h3>
          )}
        </div>
      ))}
    </>
  );
};
