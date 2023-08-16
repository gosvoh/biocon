import { useState } from "react";
import SuccessDialog from "./success.dialog";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import {
  Modal,
  Button,
  Form,
  Input,
  Checkbox,
  Tag,
  ConfigProvider,
  theme,
} from "antd";

export default function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const selectedSubject = Form.useWatch("subject", form);
  const subjects = [
    "Difficulties with registration",
    "Visa questions",
    "Website problems",
    "Want to become a partner?",
    "Marketing & PR",
    "Other",
  ];

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="Your email is successfully delivered"
        description="We will contact you in a short time"
      />
      <Modal
        destroyOnClose
        open={open}
        title={
          <div className="text-center text-base font-normal mr-4">
            To contact the organizing committee please fill in the form below
          </div>
        }
        width={600}
        centered
        onCancel={() => onOpenChange(false)}
        footer={
          <div className="flex justify-center items-center">
            <Button onClick={() => form.submit()} loading={loading}>
              Submit
            </Button>
          </div>
        }
      >
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            fetch("/api/contact", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            })
              .then(() => {
                form.resetFields();
                onOpenChange(false);
                setSuccess(true);
              })
              .finally(() => setLoading(false));
          }}
        >
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please select a subject!" }]}
          >
            <div className="flex gap-2 flex-wrap">
              {subjects.map((subject, i) => (
                <Tag
                  key={i}
                  onClick={() => form.setFieldsValue({ subject })}
                  color={selectedSubject === subject ? "blue" : undefined}
                  className="hover:cursor-pointer px-3 py-1 rounded-full"
                >
                  {subject}
                </Tag>
              ))}
            </div>
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 3, message: "Name must be at least 3 characters long!" },
            ]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Message"
            name="message"
            rules={[
              { required: true, message: "Please enter your message!" },
              { min: 10, message: "Message must be at least 10 characters!" },
            ]}
          >
            <Input.TextArea placeholder="Message" />
          </Form.Item>
          <Form.Item
            name="personalData"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "You must agree to the processing of personal data"
                      ),
              },
            ]}
          >
            <Checkbox>
              I agree to the processing of personal data.
              <Link
                prefetch={false}
                className="ml-2 text-sm underline text-[#2A84EE]"
                href="/personal_data_policy.pdf"
                target="_blank"
              >
                Privacy policy
              </Link>
            </Checkbox>
          </Form.Item>
          <Form.Item
            name="captchaToken"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject("Please confirm that you are not a robot"),
              },
            ]}
          >
            <Turnstile
              id="contact-turnstile"
              siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              options={{
                action: "Contact",
                theme: "light",
                size: "normal",
                language: "en",
              }}
              onSuccess={(token) =>
                form.setFieldsValue({ captchaToken: token })
              }
              className="mx-auto"
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
