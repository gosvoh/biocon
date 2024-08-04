import { Cities } from "@/db/schema";
import ButtonRegistrationClient from "./button.registration.client";
import { biocon } from "@/db/db";

export default async function ButtonRegistration({
  className,
  text = "Registration",
}: {
  className?: string;
  text?: string;
}) {
  let cities: (typeof Cities.$inferSelect)[] = [];
  let countries: { name: string; code: string }[] = [];

  try {
    cities = await biocon.select().from(Cities);
    countries = await biocon
      .selectDistinct({ name: Cities.cou_name_en, code: Cities.country_code })
      .from(Cities);
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
