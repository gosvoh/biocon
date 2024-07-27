"use client";

import Card from "@/components/card";

export const ContactsCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Card
      isContactsPage={true}
      onClick={() => {}}
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
          <h3 className={"font-normal"}>{title}</h3>
          <p className={"font-light"}>{description}</p>
        </div>
      </div>
    </Card>
  );
};
