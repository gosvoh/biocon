import Image, { StaticImageData } from "next/image";
import FrissonHotel from "@public/venue/hotels/frisson.jpeg";
import Link from "next/link";

export const RenderHotelsInfo = ({
  hotels,
}: {
  hotels: Array<{
    name: string;
    image: StaticImageData;
    description: string;
    link2Booking: string;
  }>;
}) => {
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
            <h3 className={"font-normal"}>{hotel.name}</h3>
            <p className={"font-light"}>{hotel.description}</p>
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
