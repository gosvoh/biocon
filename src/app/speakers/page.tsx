import Card from "@/components/card";
import speaker1 from "@public/previous_biocon/mirza.jpeg";
import Image from "next/image";

export default function SpeakersPage() {
  return (
    <Card className="p-0">
      <div className="grid grid-cols-[1fr_2fr] font-light">
        <div>
          <Image
            className={"rounded-bl-[16px] rounded-tl-[16px] h-full"}
            src={speaker1}
            alt={""}
          />
        </div>
        <div className="p-10 flex gap-7 flex-col">
          <h3 className={"font-normal"}>Ashok Pandey</h3>
          <div className={"flex gap-4 flex-col text-lg"}>
            <p>Indian Istitute of Toxicology Research, India</p>
            <p>Highly Cited Researcher, 2022</p>
            <div
              className={
                "rounded-full p-3 border-2 text-center w-1/3 border-white"
              }
            >
              <p> h-index: 142</p>
            </div>
            <p>
              His major research and technological development interests are
              industrial & environmental biotechnology and energy biosciences,
              focusing on biomass to biofuels & chemicals, waste to wealth &
              energy, industrial enzymes, etc.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
