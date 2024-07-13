"use client";

import { Modal as AntdModal } from "antd";

export default function Modal({
  trigger,
  modalContent,
  type = "info",
  title,
}: {
  trigger: React.ReactElement;
  modalContent: React.ReactElement;
  type?: "info" | "success" | "error" | "warning" | "confirm";
  title?: string;
}) {
  const [modal, context] = AntdModal.useModal();

  trigger.props.onClick = () => {
    modal[type]({
      content: modalContent,
      centered: true,
      closable: true,
      maskClosable: true,
      width: 800,
      okButtonProps: { style: { boxShadow: "none" } },
      icon: null,
      title: <p className="text-center">{title}</p>,
    });
  };

  return (
    <>
      {context}
      {trigger}
    </>
  );
}
