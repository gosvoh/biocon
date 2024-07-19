"use client";

import { Modal } from "antd";
import Card from "./card";

export default function CardChoose({
  title,
  description,
  modalContent,
}: {
  title: string;
  description: string;
  modalContent: React.ReactNode;
}) {
  const [modal, context] = Modal.useModal();

  return (
    <>
      {context}
      <Card
        onClick={() => {
          modal.info({
            title,
            content: modalContent,
            closable: true,
            maskClosable: true,
            width: 800,
            centered: true,
            icon: null,
            okButtonProps: { style: { boxShadow: "none" } },
          });
        }}
        className="space-y-4 gap-2 fcol"
        icon
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </Card>
    </>
  );
}
