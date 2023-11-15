import AboutProgram from "$/public/about&program.png";
import { componentsClassNames } from "@/app/classNames";
import { cn } from "@/lib/utils";
import { Modal, Space, Tag } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import H1 from "./h1";
import P from "./paragraph";
import Section from "./section";

const FollowDialog = dynamic(() => import("../app/follow.dialog"));
const Registration = dynamic(() => import("../app/registration"));

function ForTag({ children }: { children: React.ReactNode }) {
  return <Tag color="purple">{children}</Tag>;
}

function MustTag({ children }: { children: React.ReactNode }) {
  return <Tag color="green">{children}</Tag>;
}

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setMC] = useState<React.ReactNode>(<></>);
  const setModalContent = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setMC(content);
  };

  const Card = ({
    title,
    description,
    onClick,
  }: {
    title: string | React.ReactNode;
    description: string;
    onClick: () => void;
  }) => {
    return (
      <div
        className={cn(
          "flex-grow",
          "basis-[27.5%] flex flex-col",
          "justify-center text-center",
          "border-2 border-white",
          "rounded-3xl hyphens-none",
          "px-8 sm:px-10 md:px-12 py-10",
          "hover:bg-white hover:text-black transition-colors hover:cursor-pointer"
        )}
        onClick={onClick}
      >
        <h3
          className={cn(
            componentsClassNames.xl.className,
            "mb-4",
            "font-semibold"
          )}
        >
          {title}
        </h3>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <Section
      className="flex flex-col justify-center items-center relative mb-4"
      id="about"
    >
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={() => setModalOpen(false)}
        cancelButtonProps={{ className: "hidden" }}
        okButtonProps={{ type: "default" }}
        title={<div className="text-center">{modalTitle}</div>}
        centered
      >
        {modalContent}
      </Modal>
      <Image
        src={AboutProgram}
        alt="About background image"
        fill
        className="-z-10 opacity-25 object-cover lg:object-contain object-center"
      />
      <H1>About</H1>
      <P className="my-8">
        Over three days, you will have the opportunity to share innovative
        ideas, research results, and experiences with like-minded biotech
        enthusiasts from around the world.
      </P>
      <P className="my-8">Choose your role:</P>
      <div className="flex flex-wrap justify-center gap-6">
        <Card
          title="Attendee"
          description="Participate in all conference events"
          onClick={() => {
            setModalContent(
              "Attendee",
              <Space direction="vertical">
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For everyone who is immersed in the field of biotechnology and
                  wants to learn something new
                </p>
                <Space wrap>
                  <ForTag>Students</ForTag>
                  <ForTag>Junior and young researchers</ForTag>
                  <ForTag>Teachers</ForTag>
                  <ForTag>Business representatives</ForTag>
                  <ForTag>BioTech enthusiasts</ForTag>
                </Space>
                <p className="font-bold">You must specify when registering:</p>
                <Space wrap>
                  <MustTag>Motivation letter</MustTag>
                </Space>
              </Space>
            );
            setModalOpen(true);
          }}
        />
        <Card
          title="Contributed speaker"
          description="Become part of one of the parallel sessions"
          onClick={() => {
            setModalContent(
              "Contributed speaker",
              <Space direction="vertical">
                <p>Performance time: 15-20 min</p>
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For young researchers and scientists with experience who want
                  to share their scientific research
                </p>
                <Space wrap>
                  <ForTag>Recognised and established researchers</ForTag>
                  <ForTag>BioTech experts</ForTag>
                  <ForTag>Business representatives</ForTag>
                </Space>
                <p className="font-bold">You must specify when registering:</p>
                <Space wrap>
                  <MustTag>Your CV in English</MustTag>
                  <MustTag>
                    Short video with your self-presentation in English
                  </MustTag>
                  <MustTag>
                    Your Google Scholar, Scopus, ORCID or ResearchGate profile
                  </MustTag>
                  <MustTag>The preliminary title of your speech</MustTag>
                </Space>
              </Space>
            );
            setModalOpen(true);
          }}
        />
        <Card
          title={
            <>
              BioTech
              <br />
              Open Mic
            </>
          }
          description='Present your research in an entertaining way in only 10 minutes. A format in which there is no "framework".'
          onClick={() => {
            setModalContent(
              "BioTech Open Mic",
              <Space direction="vertical">
                <p>Performance time: 15-20 min</p>
                <p className="font-bold">Will be especially beneficial for:</p>
                <p>
                  For scientists who want to try themselves in an unusual, witty
                  format and tell interestingly about their research, startups
                  or failures — performance without limits!
                </p>
                <Space wrap>
                  <ForTag>Recognised and established researchers</ForTag>
                  <ForTag>BioTech experts</ForTag>
                  <ForTag>BioTech enthusiasts</ForTag>
                </Space>
                <p className="font-bold">You must specify when registering:</p>
                <Space wrap>
                  <MustTag>
                    Short video with a teaser of your slam talk in English
                  </MustTag>
                  <MustTag>
                    Your Google Scholar, Scopus, ORCID or ResearchGate profile
                  </MustTag>
                </Space>
              </Space>
            );
            setModalOpen(true);
          }}
        />
      </div>
      <div className="flex flex-wrap justify-evenly items-center w-1/2 gap-6 whitespace-nowrap mt-8 md:mt-16 self-center">
        <Registration />
        <FollowDialog />
      </div>
    </Section>
  );
}
