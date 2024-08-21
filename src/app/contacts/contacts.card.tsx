"use client";

import Card from "@/components/card";
import Link from "next/link";
import { Modal } from "antd";
import { useRouter } from "next/router";

const ModalContent = ({
  enLink,
  ruLink,
}: {
  enLink: string;
  ruLink: string;
}) => {
  const downloadButtonStyles =
    "lg:w-fit w-full text-center pl-10 pr-10 p-5 border-white border-2 h-full rounded-md cursor-pointer hover:bg-[#FE6F61] transition-colors duration-300 text-white text-lg";
  return (
    <div className={"fcol w-full gap-5 lg:flex-row mt-5 justify-center"}>
      <Link href={ruLink} target={"_blank"}>
        <div className={downloadButtonStyles}>Russian 🇷🇺</div>
      </Link>
      <Link href={enLink} target={"_blank"}>
        <div className={downloadButtonStyles}>English 🇬🇧</div>
      </Link>
    </div>
  );
};

export const ContactsCard = ({
  title,
  description,
  redirectLink,
  redirectInstantly,
  redirectLinkRu,
}: {
  title: string;
  description: string;
  redirectLink: string;
  redirectInstantly?: boolean;
  redirectLinkRu?: string | undefined;
}) => {
  const [modal, context] = Modal.useModal();

  return (
    <>
      {context}
      <Card
        isContactsPage={true}
        onClick={() =>
          redirectInstantly
            ? window.open(redirectLink, "_blank", "noopener,noreferrer")
            : modal.info({
                title: title,
                icon: null,
                maskClosable: true,
                footer: null,
                closable: true,
                content: (
                  <ModalContent
                    enLink={redirectLink}
                    ruLink={redirectLinkRu ? redirectLinkRu : ""}
                  />
                ),
              })
        }
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 17V3" />
            <path d="m6 11 6 6 6-6" />
            <path d="M19 21H5" />
          </svg>
        }
        className={"relative lg:rounded-[28px] rounded-[16px] p-7 lg:p-11"}
      >
        <div className={"grid grid-rows-[1fr,0.5fr] gap-3 "}>
          <div className={"fcol gap-5"}>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
        </div>
      </Card>
    </>
  );
};
