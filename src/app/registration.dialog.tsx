import { useAsync } from "@react-hookz/web";
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  theme,
} from "antd";
import { useEffect, useRef, useState } from "react";
import SuccessDialog from "./success.dialog";
import Link from "next/link";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

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
  const [success, setSuccess] = useState(false);
  const participationTypes = [
    {
      value: "Attendee",
      label: "Attendee. Full-time participation in conference events",
    },
    {
      value: "Contributed speaker",
      label:
        "Contributed speaker. Attendee with opportunity to talk during one of the parallel session",
    },
    {
      value: "Science Slammer",
      label:
        "Science Slammer. Attendee with opportunity to science communication talk",
    },
  ];
  const selectedParticipationType = Form.useWatch("participationType", form);
  const roles = [
    "Undergraduate student",
    "Graduate student",
    "PhD student",
    "Professor",
    "Industrial partner",
    "Other",
  ];
  const clothingSizes = ["S", "M", "L", "XL"];
  const [countriesState, countriesAction] = useAsync<
    {
      id: number;
      name: string;
      iso2: string;
    }[]
  >(
    () =>
      fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }).then((res) => res.json()),
    []
  );
  const [citiesState, citiesAction] = useAsync<
    {
      id: number;
      name: string;
    }[]
  >(
    (code: any) =>
      fetch(`https://api.countrystatecity.in/v1/countries/${code}/cities`, {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }).then((res) => res.json()),
    []
  );
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const roleWatcher = Form.useWatch("role", form);
  const turnstileRef = useRef<TurnstileInstance>(null);

  useEffect(() => {
    countriesAction.execute();
  }, [countriesAction]);

  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="You are awesome!"
        description="Registration completed successfully"
      />
      <Modal
        className="!py-8"
        destroyOnClose
        open={open}
        width={600}
        title={<div className="text-center">Registration</div>}
        centered
        onCancel={() => onOpenChange(false)}
        footer={
          <div className="flex justify-center">
            <Button onClick={() => form.submit()} loading={loading}>
              Register
            </Button>
          </div>
        }
      >
        <Form
          disabled={loading}
          preserve={false}
          form={form}
          layout="vertical"
          onFinish={(values) => {
            setLoading(true);
            let error = false;
            fetch(
              `/api/registration/check-mail/?email=${encodeURIComponent(
                values.email
              )}`
            )
              .then((res) => res.json())
              .then((res) => {
                if (res.exists) {
                  form.setFields([
                    { name: "email", errors: ["Email already exists"] },
                  ]);
                  error = true;
                  form.scrollToField("email");
                }
              });

            if (error) {
              setLoading(false);
              return;
            }

            fetch("/api/registration", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
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
                      errors: ["Captcha verification failed"],
                    },
                  ]);
                turnstileRef.current?.reset();
              })
              .finally(() => setLoading(false));
          }}
        >
          <Form.Item<RegisterFormValues>
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please enter your name" },
              { min: 3, message: "Name must be at least 3 characters" },
            ]}
          >
            <Input placeholder="Enter your full name here" />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email here" type="email" />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="howToKnow"
            label="How did you hear about the BIOCON?"
            rules={[
              {
                required: true,
                message: "Please enter how did you hear about the BIOCON",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="mobile"
            label="Mobile"
            rules={[
              { required: true, message: "Please enter your mobile" },
              {
                pattern:
                  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "Invalid mobile",
              },
            ]}
          >
            <Input
              placeholder="Enter your mobile number with country code here"
              type="tel"
            />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="country"
            label="Select country"
            rules={[{ required: true, message: "Please select your country" }]}
          >
            <Select
              placeholder="---"
              showSearch
              options={countriesState.result.map((country) => ({
                value: country.name,
                label: country.name,
              }))}
              onChange={(value) => {
                setCitiesLoading(true);
                citiesAction.reset();
                citiesAction
                  .execute(
                    countriesState.result.find(
                      (country) => country.name === value
                    )?.iso2
                  )
                  .finally(() => setCitiesLoading(false));
              }}
            />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="city"
            label="Select city"
            rules={[{ required: true, message: "Please select your city" }]}
          >
            <Select
              showSearch
              placeholder="---"
              loading={citiesLoading}
              disabled={form.getFieldValue("country") === undefined}
              options={citiesState.result.map((city) => ({
                value: city.name,
                label: city.name,
              }))}
            />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="affiliation"
            label="Affiliation"
            rules={[
              { required: true, message: "Please enter your affiliation" },
            ]}
          >
            <Input placeholder="Enter the name of your university here" />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select your role" }]}
          >
            <Select
              placeholder="---"
              options={roles.map((role) => ({
                value: role,
                label: role,
              }))}
            />
          </Form.Item>
          {roleWatcher === "Other" && (
            <Form.Item<RegisterFormValues>
              name="customRole"
              label="Custom role"
              rules={[
                {
                  required: true,
                  message: "Please enter your role",
                },
              ]}
            >
              <Input placeholder="Enter your custom role here" />
            </Form.Item>
          )}
          <Form.Item<RegisterFormValues>
            name="clothingSize"
            label="Clothing size"
            rules={[
              { required: true, message: "Please select your clothing size" },
            ]}
          >
            <Select
              placeholder="---"
              options={clothingSizes.map((size) => ({
                value: size,
                label: size,
              }))}
            />
          </Form.Item>
          <Form.Item<RegisterFormValues>
            name="participationType"
            label="Participation type"
            rules={[
              {
                required: true,
                message: "Please select your participation type",
              },
            ]}
          >
            <Radio.Group>
              {participationTypes.map((participationType, i) => (
                <Radio key={i} value={participationType.value}>
                  {participationType.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          {selectedParticipationType === "Attendee" && (
            <Form.Item<RegisterFormValues>
              name="motivationLetter"
              label="Motivation letter"
              rules={[
                {
                  required: true,
                  message: "Please enter your motivation letter",
                },
              ]}
            >
              <Input.TextArea placeholder="Enter your motivation letter here" />
            </Form.Item>
          )}
          {selectedParticipationType &&
            selectedParticipationType !== "Attendee" && (
              <>
                <Form.Item<RegisterFormValues>
                  name="researchInterests"
                  label="Research interests"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your research interests",
                    },
                  ]}
                >
                  <Input placeholder="Enter your research interest(s) here" />
                </Form.Item>
                {selectedParticipationType === "Contributed speaker" && (
                  <>
                    <Form.Item<RegisterFormValues>
                      name="tentativeTitle"
                      label="Tentative title"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your tentative title",
                        },
                      ]}
                    >
                      <Input placeholder="Enter the tentative title of your work here" />
                    </Form.Item>
                    <Form.Item<RegisterFormValues>
                      name="resume"
                      label="Resume"
                      rules={[
                        {
                          required: true,
                          message: "Please provide a link to your resume",
                        },
                        { type: "url", message: "Please enter a valid url" },
                      ]}
                    >
                      <Input placeholder="Provide a link to your resume in PDF format" />
                    </Form.Item>
                  </>
                )}
                <Form.Item<RegisterFormValues>
                  name="scienceProfile"
                  label="Your Google Scholar, Scopus or ORCID profile"
                  rules={[
                    {
                      required: true,
                      message:
                        "Please enter your Google Scholar, Scopus or ORCID profile",
                    },
                    { type: "url", message: "Please enter a valid url" },
                  ]}
                >
                  <Input placeholder="Provide a link to your Google Scholar, Scopus or ORCID profile" />
                </Form.Item>
                <Form.Item<RegisterFormValues>
                  name="video"
                  label="Video"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your video",
                    },
                    { type: "url", message: "Please enter a valid url" },
                  ]}
                >
                  <Input placeholder="Provide a link to a teaser of your slam talk" />
                </Form.Item>
              </>
            )}
          <Form.Item<RegisterFormValues>
            name="personalData"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please accept the personal data agreement",
              },
            ]}
          >
            <Checkbox>
              I agree to the processing of my personal data.
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
