"use client";

import { cn } from "@/lib/utils";
import { Architects_Daughter } from "next/font/google";
import { useEffect, useState } from "react";

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
  const fetchUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=54.901171&longitude=52.297230&current=temperature_2m&timezone=Europe%2FMoscow&forecast_days=1";
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      console.error(`Error! Status ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const RenderTemperature = () => {
  const [temperature, setTemperature] = useState<WeatherResponse | null>();

  useEffect(() => {
    fetchWeather().then((weather) => {
      setTemperature(weather);
    });
  }, []);

  return (
    <div
      id={"card"}
      className={
        "bg-[#1A1A1A] rounded-[28px] w-full h-full fcol items-center justify-center gap-5"
      }
    >
      {temperature && (
        <div className={cn(" text-[#7DEB9A] flex gap-3", font.className)}>
          <h1 className={"text-[3rem] lg:text-[4rem] font-normal"}>
            {Math.sign(temperature.current.temperature_2m) == 1 ? "+" : "-"}
          </h1>
          <h1 className={"text-[3rem] lg:text-[5rem] font-normal"}>
            {Math.round(temperature.current.temperature_2m)} °C
          </h1>
        </div>
      )}
      <p>Almetyevsk, Russia</p>
    </div>
  );
};
