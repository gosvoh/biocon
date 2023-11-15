import Link from "@/components/link";
import Image, { StaticImageData } from "next/image";
import { socials } from "@/socials";
import { useWindowSize } from "@react-hookz/web";
import { useEffect, useState } from "react";

import Agni from "../../public/agni.png";
import Biotech from "../../public/biotech.png";
import Itmo from "../../public/itmo.png";
import Pish from "../../public/pish.svg";
import Tatneft from "../../public/tat.png";
import Telegram from "../../public/telegram.svg";
import VK from "../../public/vk.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";
import FIC from "../../public/FIC.png";
import { Modal, Typography } from "antd";
import P from "./paragraph";
import PCR from "$/public/PCR.png";
import Colab from "$/public/colab.svg";
import Blasatim from "$/public/blastim.jpg";
import Biolabmix from "$/public/biolabmix.png";
import SciTech from "$/public/scitech.png";
import { cn } from "@/lib/utils";
import { componentsClassNames } from "@/app/classNames";

export default function Footer({}: {}) {
  const windowSize = useWindowSize();
  const [imgWidth, setImgWidth] = useState(150);
  const [imgHeight, setImgHeight] = useState(75);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setMC] = useState<React.ReactNode>();
  const setModalContent = (company: string, content?: React.ReactNode) => {
    setModalTitle(() => company);
    setMC(() => content);
    setModalOpen(true);
  };

  useEffect(() => {
    if (windowSize.width < 640) {
      setImgWidth(150);
      setImgHeight(75);
    } else {
      setImgWidth(200);
      setImgHeight(100);
    }
  }, [windowSize]);

  const PartnerCard = ({
    img,
    link,
    title,
    description,
    className,
  }: {
    title: string;
    description?: React.ReactNode;
    link: string;
    img: StaticImageData;
    className?: React.HTMLProps<HTMLDivElement>["className"];
  }) => {
    const classes = `rounded-lg basis-[200px] bg-white cursor-pointer flex justify-center`;

    if (description)
      return (
        <div
          className={cn(classes, className)}
          onClick={() =>
            setModalContent(
              title,
              <P>
                <Link className="underline hover:underline" href={link}>
                  {title}
                </Link>{" "}
                {description}
              </P>
            )
          }
        >
          <Image
            src={img}
            alt={`${title} logo`}
            width={imgWidth}
            height={imgHeight}
            className="object-contain rounded-lg"
          />
        </div>
      );
    return (
      <Link href={link} className={cn(classes, className)}>
        <Image
          src={img}
          alt={`${title} logo`}
          width={imgWidth}
          height={imgHeight}
          className="object-contain rounded-lg"
        />
      </Link>
    );
  };

  return (
    <footer className="flex flex-col mb-8 mt-16 gap-8 items-stretch">
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ type: "default" }}
        title={
          <Typography.Title className="text-center" level={3}>
            {modalTitle}
          </Typography.Title>
        }
        centered
      >
        {modalContent}
      </Modal>
      <P className="text-center">Partners</P>
      <div className="flex flex-wrap md:flex-nowrap flex-row justify-around gap-8">
        <PartnerCard
          title="Blastim"
          link="https://blastim.ru/"
          img={Blasatim}
          description={
            <>
              is an Edtech-company specializing in bioinformatics, biochemistry,
              machine learning, and programming. Since 2015 Blastim has
              organized courses, webinars, job fairs to help people with
              building a network and growing in a professional field.
            </>
          }
          className="p-6"
        />
        <PartnerCard
          title="PCR.NEWS"
          link="https://pcr.news/"
          img={PCR}
          description={
            <>
              is a Russian-language information and analytical portal concerning
              molecular diagnostics and related fields of science and practice:
              molecular biology and medicine. Portal’s materials are addressed
              to professional community of research scientists specializing in
              molecular diagnostics, as well as for specialists in laboratory
              diagnostics, clinicians, biotechnologists, and graduate and
              undergraduate students in Life sciences and medicine.
            </>
          }
        />
        <PartnerCard
          title="FIC"
          link="https://www.fbras.ru/en/"
          img={FIC}
          className="p-6"
        />
        <PartnerCard
          title="CoLab"
          link="https://colab.ws/conferences/536"
          img={Colab}
          description={
            <>
              — search for information about the work of scientists,
              laboratories and scientific organizations. The platform was
              created within the framework of the federal project, the Decade of
              Science and Technology.
            </>
          }
          className="p-6"
        />
        <PartnerCard
          title="Biolabmix"
          link="https://biolabmix.ru/en/"
          img={Biolabmix}
          description={
            <>
              is a research and production company focusing on reagents for
              molecular biology, biochemistry, genetic engineering and
              biotechnologies and fundamental medicine.
            </>
          }
          className="py-6"
        />
        <PartnerCard
          title="The Decade of Science and Technology in Russia"
          link="https://xn--80aa3ak5a.xn--p1ai/news/konferentsiya-po-industrialnoy-biotekhnologii-biocon-2023-proydet-v-almetevske/"
          img={SciTech}
          description={
            <>
              includes a set of initiatives, projects and events. All of them
              are aimed at strengthening the role of science and technology in
              solving the most important tasks of the development of society and
              the country.
            </>
          }
          className="p-6"
        />
      </div>
      <P className="text-center mt-8">General Partners</P>
      <div className="flex flex-wrap md:flex-nowrap flex-row justify-around md:justify-between items-center gap-8">
        <Link href="https://itmo.ru/">
          <Image src={Itmo} alt="Itmo" width={imgWidth * 1.5} />
        </Link>
        <Link href="https://en.itmo.ru/en/faculty/98/Faculty_of_Biotechnologies.htm">
          <Image src={Biotech} alt="Biotech" width={imgWidth * 1.5} />
        </Link>
        <Link href="https://www.tatneft.ru/">
          <Image src={Tatneft} alt="Tatneft" width={imgWidth * 1.5} />
        </Link>
        <Link href="https://pish.itmo.ru/">
          <Image src={Pish} alt="Pish" width={imgWidth * 1.5} />
        </Link>
        <Link href="https://agni-rt.ru/">
          <Image src={Agni} alt="Agni" width={imgWidth * 1.5} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex gap-8 items-center flex-row">
          <Link href={socials.vk}>
            <Image src={VK} alt={"VK social"} width={40} />
          </Link>
          <Link href={socials.telegram}>
            <Image src={Telegram} alt="Telegram social" width={40} />
          </Link>
          <Link href={socials.facebook}>
            <Image src={Facebook} alt={"Facebook social"} width={40} />
          </Link>
          <Link href={socials.youtube}>
            <Image src={YouTube} alt={"YouTube social"} width={40} />
          </Link>
        </div>
        <div className="flex flex-col text-start sm:text-end text-sm sm:text-base md:text-lg">
          <p>ITMO University</p>
          <Link
            className="hover:underline p-0 h-auto leading-normal"
            href={"mailto:biocon@itmo.ru"}
          >
            biocon@itmo.ru
          </Link>
          <Link className="hover:underline" href="/personal_data_policy.pdf">
            Privacy policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
