"use client";

import { Modal as AntdModal, ModalProps } from "antd";

export const modalProps = {
  centered: true,
  closable: true,
  maskClosable: true,
  width: 800,
  okButtonProps: { style: { boxShadow: "none" } },
  icon: null,
};

export default function Modal({
  trigger,
  modalContent,
  type = "info",
  title,
  ...props
}: {
  trigger: React.ReactElement;
  modalContent: React.ReactElement;
  type?: "info" | "success" | "error" | "warning" | "confirm";
  title?: string;
} & ModalProps) {
  const [modal, context] = AntdModal.useModal();

  trigger.props.onClick = () => {
    modal[type]({
      content: modalContent,
      title: <p className="text-center">{title}</p>,
      ...modalProps,
      ...props,
    });
  };

  return (
    <>
      {context}
      {trigger}
    </>
  );
}
