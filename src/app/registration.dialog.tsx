import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { Form, Modal } from "antd";
import { useRef, useState } from "react";

type RegisterFormValues = {
  name: string;
  email: string;
  howToKnow: string;
  mobile: string;
  country: string;
  city: string;
  affiliation: string;
  role: string;
  customRole?: string;
  clothingSize: string;
  participationType: string;
  motivationLetter: string | undefined;
  researchInterests: string | undefined;
  tentativeTitle: string | undefined;
  resume: string | undefined;
  scienceProfile: string | undefined;
  video: string | undefined;
  personalData: boolean;
  captchaToken: string;
};

export default function RegistrationDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form] = Form.useForm<RegisterFormValues>();
  const [, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);

  return (
    <Modal>
      <Form
        disabled={loading}
        preserve={false}
        form={form}
        layout="vertical"
        onFinish={(values) => {
          setLoading(true);
          fetch("/api/registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          })
            .then((res) => {
              if (res.ok) {
                setSuccess(true);
                form.resetFields();
                onOpenChange(false);
              } else return res.json().then(Promise.reject);
            })
            .catch((error) => {
              if (error?.message === "Captcha verification failed")
                form.setFields([
                  {
                    name: "captchaToken",
                    errors: [error.message],
                  },
                ]);
              turnstileRef.current?.reset();
            })
            .finally(() => setLoading(false));
        }}
      >
        <Form.Item<RegisterFormValues>
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
            ref={turnstileRef}
            id="registration-turnstile"
            siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            options={{
              action: "Registration",
              theme: "light",
              size: "normal",
              language: "en",
            }}
            onSuccess={(token) => form.setFieldsValue({ captchaToken: token })}
            className="mx-auto"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
