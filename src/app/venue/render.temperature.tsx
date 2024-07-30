"use client";

import { cn } from "@/lib/utils";
import { Architects_Daughter } from "next/font/google";
import { useEffect, useState } from "react";
import { Skeleton } from "antd";

const font = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
});

interface WeatherResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentWeather;
}

interface CurrentUnits {
  time: string;
  interval: string;
  temperature_2m: string;
}

interface CurrentWeather {
  time: string;
  interval: number;
  temperature_2m: number;
}
const fetchWeather = async (): Promise<WeatherResponse | null> => {
  if (localStorage.getItem("isTemperatureSet") == "true") {
    return null;
  }
  const fetchUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=54.901171&longitude=52.297230&current=temperature_2m&timezone=Europe%2FMoscow&forecast_days=1";
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      console.error(`Error! Status ${response.status}`);
      return null;
    }
    const json = response.json();
    return json;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const RenderTemperature = () => {
  const [temperature, setTemperature] = useState<WeatherResponse | null>();

  useEffect(() => {
    fetchWeather().then((weather) => {
      localStorage.setItem("isTemperatureSet", "true");
      setTemperature(weather);
    });

    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <div
      className={
        "bg-[#1A1A1A] rounded-[28px] w-full h-full fcol items-center justify-center gap-5"
      }
    >
      <h1
        className={cn(
          " font-normal text-[#7DEB9A] text-[3rem] lg:text-[5rem]",
          font.className,
        )}
      >
        {temperature?.current.temperature_2m} °C
      </h1>
      <p>Almetyevsk, Russia</p>
    </div>
  );
};
