"use client";

import { ReactifiedModule } from "@yandex/ymaps3-types/reactify";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export type ReactifyApi = ReactifiedModule<
  typeof import("@yandex/ymaps3-types")
>;

const Map = ({ api }: { api: ReactifyApi | null }) => {
  if (!api) return null;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
  } = api;

  return (
    <YMap
      location={{ center: [52.289424, 54.897868], zoom: 17 }}
      behaviors={["drag"]}
      className="grayscale"
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapControls position="left" />

      <YMapMarker coordinates={[52.289424, 54.898]}>
        <Link href={"https://itmo.ru"} target="_blank">
          <div className="bg-black hover:bg-slate-700 transition-all text-white rounded-full px-4 py-2 flex flex-row gap-2 text-nowrap items-center text-xl md:text-2xl">
            <GraduationCap className="w-5 h-5 md:w-10 md:h-10" />
            Университет ИТМО
          </div>
        </Link>
      </YMapMarker>
    </YMap>
  );
};

export default function YandexMap(props: React.HTMLAttributes<HTMLDivElement>) {
  const [reactifyApi, setReactifyApi] = useState<ReactifyApi | null>(null);
  const apiKey = "22d9a99f-e3d7-484c-ba9e-1a4bd5688b70";

  useEffect(() => () => setReactifyApi(null), []);

  return (
    <>
      <Script
        src={`https://api-maps.yandex.com/v3/?apikey=${apiKey}&lang=en_US`}
        onLoad={async () => {}}
        onReady={() => {
          Promise.all([
            ymaps3.import("@yandex/ymaps3-reactify"),
            ymaps3.ready,
          ]).then(([ymaps3React]) => {
            const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);
            setReactifyApi(reactify.module(ymaps3));
          });
        }}
      />
      <div {...props}>
        <Map api={reactifyApi} />
      </div>
    </>
  );
}
