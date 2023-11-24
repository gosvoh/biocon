"use client";

import Image from "next/image";
import { Tooltip } from "antd";

import { cn } from "@/lib/utils";
import { componentsClassNames } from "@/app/classNames";
import Section from "@/components/section";

import Zilant from "$/public/zilant.png";

import "swiper/css";
import "swiper/css/pagination";

import H1, { StrokeFont } from "./h1";
import P from "./paragraph";

export default function Program() {
  const Card = ({
    text,
    className,
    onClick,
  }: {
    text: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <p
      className={cn(
        "border border-white w-full h-full grid place-content-center p-4 text-center text-balance rounded-lg",
        "hover:cursor-pointer hover:bg-white hover:text-black transition-colors",
        className
      )}
      onClick={onClick}
    >
      {text}
    </p>
  );

  return (
    <Section
      className="flex flex-col justify-center items-center relative"
      id="program"
    >
      <H1 className="mb-20">Program</H1>
      <P>
        BIOCON 2023 focuses on UNESCO Sustainable Development Goals. TED-style
        plenary talks from world-renowned researchers, parallel sessions on
        major spheres of biotechnology headlined by recognized keynote speakers,
        an exciting BioTech Open Mic and much more — all infused with
        unforgettable culture of Tatarstan — BIOCON, in one word.
      </P>
      <P
        className={cn(
          "text-center mt-8 font-bold",
          componentsClassNames.lg.className
        )}
      >
        Topics of BIOCON 2023:
      </P>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr mt-4">
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              Sustainable agriculture is farming in such a way to protect the
              environment, aid and expand natural resources and to make the best
              use of nonrenewable resources.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Sustainable agriculture" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              The use of methods that minimize negative impacts on the
              environment, conserve land, water, and biodiversity, and provide
              sustainable food and livelihoods for communities.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Sustainable food production and food security" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              The development and use of biomass and waste for energy
              production, while adhering to ecological, social, and economic
              standards.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Sustainable bioenergy" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              Utilizing microorganisms to develop new products, processes, and
              technologies that have significant implications in fields such as
              food industry, medicine, and ecology.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Microbial biotechnology" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              Researching and applying nanomaterials and nanostructures in
              biotechnology to create enhanced methods of diagnostics, drug
              delivery, and innovative technologies.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Nanobiotechnology" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              Using the methods of genetic and cellular engineering, modern
              biotechnology carries out extensive construction of genetically
              modified organisms, including microorganisms, plants and animals.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Genetic and cellular engineering" />
        </Tooltip>
        <Tooltip
          getPopupContainer={(node) =>
            node.parentElement?.parentElement || document.body
          }
          trigger="click"
          destroyTooltipOnHide
          title={
            <>
              {" "}
              Applying information technology and computer modeling to analyze
              and interpret biological data, such as genetic sequences or
              protein structures, in order to develop new approaches in
              medicine, agriculture, and other fields.
            </>
          }
          color="white"
          overlayInnerStyle={{ color: "black" }}
        >
          <Card text="Bioinformatics" className="md:col-start-2 md:col-end-3" />
        </Tooltip>
      </div>
      <div className="relative flex flex-col items-center mt-6 w-full">
        <Image
          src={Zilant}
          alt="Coming soon image with dragon"
          className="w-3/4 md:w-1/3"
        />
        <p
          className={cn(
            componentsClassNames.xl3.className,
            "stroke absolute translate-y-2/4 bottom-0",
            StrokeFont.className
          )}
        >
          coming soon...
        </p>
      </div>
    </Section>
  );
}
