"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Timeline({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-row lg:flex-col gap-4 timeline", className)}>
      <div
        className={cn(
          "grid grid-cols-[auto,1fr] max-lg:gap-x-6 grid-rows-[auto,1fr,auto,1fr,auto] justify-center items-center justify-items-center hyphens-auto",
          "lg:grid-cols-[auto,1fr,auto,1fr,auto] lg:max-w-3/4 lg:mx-auto lg:w-full",
        )}
      >
        <div className="dot">1</div>
        <div className="dotted" />
        <div className="dot">2</div>
        <div className="dotted" />
        <div className="dot bg-white text-black">3</div>

        <div className="row-[1] mob-col">
          <div className={"flex flex-col gap-1"}>
            <h3>September 1</h3>
            <p>
              Registration ends for participants from from{" "}
              <Link
                className="underline"
                href="https://electronic-visa.kdmid.ru/country_en.html"
              >
                non-listed countries
              </Link>{" "}
              who do not already hold a Russian visa
            </p>
          </div>
        </div>
        <div className="row-[3] mob-col">
          <div className={"flex flex-col gap-1"}>
            <h3>October 25</h3>
            <p>Registration ends for all participants</p>
          </div>
        </div>
        <div className="row-[5] mob-col">
          <div className={"flex flex-col gap-1"}>
            <h3>November 11-13</h3>
            <p>See you in Almetyevsk!</p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-row text-center justify-around flex-1">
        <div className="fcol lg:flex-1 gap-3 items-center mt-4">
          <h3>September 1</h3>
          <p className={"w-[55%]"}>
            Registration ends for participants from{" "}
            <Link
              className="underline"
              href="https://electronic-visa.kdmid.ru/country_en.html"
            >
              non-listed countries
            </Link>{" "}
            who do not already hold a Russian visa
          </p>
        </div>
        <div className="fcol lg:flex-1 gap-3 mt-4">
          <h3>October 25</h3>
          <p>Registration ends for all participants</p>
        </div>
        <div className="fcol lg:flex-1 gap-3 mt-4">
          <h3>November 11-13</h3>
          <p>See you in Almetyevsk!</p>
        </div>
      </div>

      {children}
    </div>
  );
}
