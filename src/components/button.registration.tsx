import ButtonRegistrationClient from "./button.registration.client";
import fs from "fs";
import path from "path";

export type City = {
  geoname_id: number;
  ascii_name: string;
  cou_name_en: string;
  country_code: string;
};

export type Country = {
  name: string;
  code: string;
};

export default async function ButtonRegistration({
  className,
  text = "Registration",
}: {
  className?: string;
  text?: string;
}) {
  let cities: City[] = [];
  let countries: Country[] = [];

  try {
    if (!fs.existsSync(path.join(process.cwd(), "public", "cities.json")))
      throw new Error("cities.json not found");
    const citiesJson = fs.readFileSync(
      path.join(process.cwd(), "public", "cities.json"),
      "utf-8",
    );
    cities = JSON.parse(citiesJson) as City[];
    countries = cities
      .map((city) => ({ name: city.cou_name_en, code: city.country_code }))
      .filter(
        (country, index, self) =>
          index ===
          self.findIndex(
            (t) => t.name === country.name && t.code === country.code,
          ),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (e) {
    console.error(e);
  }

  return (
    <ButtonRegistrationClient
      cities={cities}
      countries={countries}
      className={className}
      text={text}
    />
  );
}
