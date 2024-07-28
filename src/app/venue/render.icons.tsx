import Image, { StaticImageData } from "next/image";

export const RenderIcons = ({
  icons,
}: {
  icons: Array<{
    description: string;
    description2: string;
    icon: StaticImageData;
  }>;
}) => {
  return (
    <div
      className={
        "grid grid-cols-1 lg:grid-cols-2 lg:gap-x-36 lg:gap-y-16 gap-y-9"
      }
    >
      {icons.map((icon, index) => (
        <div
          key={index}
          className={
            "grid lg:grid-cols-[0.5fr_4fr] grid-cols-[0.35fr_2fr] items-center gap-9 text-left"
          }
        >
          <Image src={icon.icon} alt={""} className={"w-full h-full"} />
          <div className={`${icon.description2 && "fcol gap-2"}`}>
            <p>{icon.description}</p>
            <p>{icon.description2}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
