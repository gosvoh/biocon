"use client";

import { Speakers } from "@prisma/client/biocon";
import React from "react";

type SpeakersType = {
  speakers: Speakers[];
  speakersReady: boolean;
};

const SpeakersContext = React.createContext<SpeakersType>({
  speakers: [],
  speakersReady: false,
});

export const SpeakersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [speakers, setSpeakers] = React.useState<SpeakersType["speakers"]>([]);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/speakers")
      .then((res) => res.json())
      .then((speakers: Speakers[]) =>
        speakers.sort((a, b) => a.order - b.order)
      )
      .then(setSpeakers)
      .then(() => setIsReady(true));
  }, []);

  return (
    <SpeakersContext.Provider value={{ speakers, speakersReady: isReady }}>
      {children}
    </SpeakersContext.Provider>
  );
};

export const useSpeakers = () => {
  const context = React.useContext(SpeakersContext);
  if (context === undefined)
    throw new Error("useSpeakers must be used within a SpeakersProvider");
  return context;
};
