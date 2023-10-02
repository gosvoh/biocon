"use client";

import { Organizers } from "@prisma/client/biocon";
import React from "react";

type OrganizersType = {
  organizers: Organizers[];
  organizersReady: boolean;
};

const OrganizersContext = React.createContext<OrganizersType>({
  organizers: [],
  organizersReady: false,
});

export const OrganizersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [organizers, setOrganizers] = React.useState<
    OrganizersType["organizers"]
  >([]);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/organizers")
      .then((res) => res.json())
      .then(setOrganizers)
      .then(() => setIsReady(true));
  }, []);

  return (
    <OrganizersContext.Provider
      value={{ organizers, organizersReady: isReady }}
    >
      {children}
    </OrganizersContext.Provider>
  );
};

export const useOrganizers = () => {
  const context = React.useContext(OrganizersContext);
  if (context === undefined)
    throw new Error("useOrganizers must be used within a OrganizersProvider");
  return context;
};
