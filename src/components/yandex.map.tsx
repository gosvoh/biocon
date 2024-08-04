"use client";

import { ReactifiedModule } from "@yandex/ymaps3-types/reactify";
import Image from "next/image";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Biocon2024Logo from "@public/biocon2024logo.png";
import Link from "next/link";

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
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <YMapControls position="left" />
      <YMapMarker coordinates={[52.289495, 54.8984]}>
        <div className={"w-64"}>
          <Link
            href={
              "https://yandex.ru/maps/org/almet/176211252091/?ll=52.289424%2C54.897868&z=16"
            }
            target={"_blank"}
          >
            <Image src={Biocon2024Logo} alt={""} className="scale-animation" />
          </Link>
        </div>
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
