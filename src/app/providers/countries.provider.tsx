"use client";

import React from "react";

type Countries = {
  countries: { id: number; name: string; iso2: string }[];
  countriesReady: boolean;
};

const CountriesContext = React.createContext<Countries>({
  countries: [],
  countriesReady: false,
});

export const CountriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [countries, setCountries] = React.useState<Countries["countries"]>([]);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then(setCountries)
      .then(() => setIsReady(true));
  }, []);

  return (
    <CountriesContext.Provider value={{ countries, countriesReady: isReady }}>
      {children}
    </CountriesContext.Provider>
  );
};

export const useCountries = () => {
  const context = React.useContext(CountriesContext);
  if (context === undefined)
    throw new Error("useCountries must be used within a CountriesProvider");
  return context;
};
