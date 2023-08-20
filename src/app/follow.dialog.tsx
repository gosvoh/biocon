import VK from "../../public/vk.svg";
import Telegram from "../../public/telegram.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";
import Link from "@/components/link";
import Image from "next/image";
import { socials } from "@/socials";
import { Button, ConfigProvider, Form, Input, Modal, theme } from "antd";
import type { ModalFuncProps } from "antd";
import { useState } from "react";

export default function FollowDialog({
  ...props
}: {} & React.PropsWithoutRef<ModalFuncProps>) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <Modal
        {...props}
        destroyOnClose
        width={600}
        title=""
        centered
        footer={
          <div className="flex justify-center">
            <Button onClick={() => form.submit()} loading={loading}>
              Register
            </Button>
          </div>
        }
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-8 mt-2 md:mt-8 font-semibold text-center">
          Follow us on social networks
        </h1>
        <div className="flex flex-row flex-wrap gap-8 items-center justify-center my-12">
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
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-center">
          Subscribe to our newsletter!
        </p>
        <p className="text-center">Be the first one to get our updates!</p>
        <Form
          preserve={false}
          form={form}
          layout="inline"
          className="justify-around my-8"
          onFinish={(values) => {
            setLoading(true);
            fetch("/api/follow", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then((res) => {
                if (res.ok) {
                  form.resetFields();
                  props.onOk?.();
                } else Promise.reject(res);
              })
              .catch(console.error)
              .finally(() => setLoading(false));
          }}
        >
          <Form.Item
            className="!flex-1"
            name="name"
            rules={[{ required: true, min: 3 }]}
          >
            <Input placeholder="Name*" />
          </Form.Item>
          <Form.Item
            className="!flex-1"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="Email*" />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
