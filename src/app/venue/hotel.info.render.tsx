import Image from "next/image";
import Link from "next/link";
import DeluxeHotel from "@public/venue/hotels/deluxe.jpg";
import NeftyanikHotel from "@public/venue/hotels/neftyanik.jpg";
import ApartsHotel from "@public/venue/hotels/aparts.jpeg";

const hotels = [
  {
    image: DeluxeHotel,
    name: "DeLuxe hotel chain",
    description:
      "Two cozy hotels of European level in the central district of Almetyevsk. Prices start from 2500 rubles per night.",
    link2Booking: "https://otel-deluxe.ru/",
  },
  {
    image: NeftyanikHotel,
    name: "Neftyanik Business Hotel",
    description:
      "Located on a quiet street, the hotel offers rooms of different price segments and a good breakfast is included in the price. Price from 3500 rubles per day.",
    link2Booking: "https://www.hotel-neftyanik.ru/",
  },
  {
    image: ApartsHotel,
    name: "Apartments",
    description:
      "In Almetyevsk you can also use classic ways of booking accommodation: book apartments on the Yandex.Travel, Ostrovok, 101Hotels and others.",
    link2Booking: "https://101hotels.com/main/cities/almetevsk/apartments",
  },
];

export const RenderHotelsInfo = () => {
  const hotelCard =
    "fcol lg:grid lg:grid-cols-2 gap-4 lg:gap-24 items-center text-center lg:items-start relative ";
  const hotelImage =
    "rounded-[16px] lg:rounded-[28px] aspect-[4/3] lg:aspect-[7/4] object-cover w-full";

  return (
    <>
      {hotels.map((hotel, index) => (
        <div className={hotelCard} key={index}>
          <Image src={hotel.image} alt={""} className={hotelImage} />
          <div
            className={
              "fcol gap-4 lg:items-start lg:text-start lg:justify-start"
            }
          >
            <h3>{hotel.name}</h3>
            <p>{hotel.description}</p>
            <Link href={hotel.link2Booking} target={"_blank"}>
              <button className={"main-button mt-2 lg:absolute lg:bottom-0"}>
                Go to booking
              </button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
