"use client";

import { cn } from "@/lib/utils";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import {
  Checkbox,
  Form,
  type FormInstance,
  Input,
  InputRef,
  Modal,
  Select,
} from "antd";
import { use, useEffect, useMemo, useRef, useState } from "react";
import type { Cities, Registrations } from "@/db/schema";
import Link from "next/link";
import { modalProps } from "./ui/modal";
import { register } from "./button.registration.actions";

type RegisterFormValues = typeof Registrations.$inferInsert & {
  captchaToken: string;
  customRole?: string;
  personalData: boolean;
};

const RegForm = ({
  form,
  countries,
  cities,
}: {
  form: FormInstance;
  countries: {
    name: string;
    code: string;
  }[];
  cities: (typeof Cities.$inferSelect)[];
}) => {
  const turnstileRef = useRef<TurnstileInstance>(null);
  const selectedParticipationType = Form.useWatch("participationType", form);
  const selectedRole = Form.useWatch("role", form);
  const selectedCountry = Form.useWatch("country", form);
  const firstInputRef = useRef<InputRef>(null);
  const memoizedCountries = useMemo(
    () =>
      countries.map((c) => ({
        value: c.code,
        label: c.name,
      })),
    [countries],
  );
  const memoizedCities = useMemo(
    () =>
      cities
        .filter((c) => c.country_code === selectedCountry)
        .filter(
          (c, i, self) =>
            self.findIndex((s) => s.ascii_name === c.ascii_name) === i,
        )
        .map((c) => ({
          value: c.ascii_name,
          label: c.ascii_name,
        })),
    [cities, selectedCountry],
  );

  useEffect(() => {
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  }, []);

  return (
    <Form
      preserve={false}
      form={form}
      layout="vertical"
      onFinish={(values) => {}}
    >
      <Form.Item<RegisterFormValues>
        name="name"
        label="Full name"
        tooltip="Please specify your First name, Last name and Patronymic (if available)"
        rules={[
          { required: true, message: "Please enter your name" },
          { min: 3, message: "Name must be at least 3 characters" },
        ]}
      >
        <Input ref={firstInputRef} placeholder="Enter your full name here" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please enter your email",
          },
          {
            type: "email",
            message: "Please enter a valid email",
          },
        ]}
      >
        <Input placeholder="Enter your email here" type="email" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="howToKnow"
        label="How did you learn about BIOCON?"
        rules={[
          {
            required: true,
            message: "Please enter how did you learn about BIOCON",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="mobile"
        label="Mobile"
        tooltip="Enter the country code, followed by the full phone number here"
        rules={[
          { required: true, message: "Please enter your mobile" },
          {
            pattern:
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
            message: "Invalid mobile",
          },
        ]}
      >
        <Input type="tel" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="country"
        label="Select country"
        rules={[
          {
            required: true,
            message: "Please enter your country",
          },
        ]}
      >
        <Select
          disabled={countries.length === 0}
          placeholder="Country"
          options={memoizedCountries}
          showSearch
          filterOption={(input, option) =>
            !option
              ? false
              : option.label.toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(a, b) => a.label.localeCompare(b.label)}
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="city"
        label="Select city"
        rules={[
          {
            required: true,
            message: "Please enter your city",
          },
        ]}
      >
        <Select
          disabled={!selectedCountry}
          placeholder="City"
          showSearch
          filterOption={(input, option) =>
            !option
              ? false
              : option.label.toLowerCase().startsWith(input.toLowerCase())
          }
          filterSort={(a, b) => a.label.localeCompare(b.label)}
          options={memoizedCities}
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="affiliation"
        label="Affiliation"
        rules={[
          {
            required: true,
            message: "Please enter your affiliation",
          },
        ]}
      >
        <Input placeholder="Enter the name of your university or organization here" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: "Please select your role",
          },
        ]}
      >
        <Select
          placeholder="Role"
          options={[
            "Undergraduate student",
            "Graduate student",
            "PhD student",
            "Professor",
            "Industrial partner",
            "Other",
          ].map((r) => ({ value: r, label: r }))}
        />
      </Form.Item>
      {selectedRole === "Other" && (
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
          {
            required: true,
            message: "Please select your clothing size",
          },
        ]}
      >
        <Select
          placeholder="Clothing size"
          options={["S", "M", "L", "XL"].map((s) => ({
            value: s,
            label: s,
          }))}
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="participationType"
        label="Choose your role"
        rules={[
          {
            required: true,
            message: "Please enter your participation type",
          },
        ]}
      >
        <Select
          placeholder="Participation Type"
          options={[
            {
              value: "Attendee",
              label: "Attendee. Participate in all conference events!",
            },
            {
              value: "Contributed speaker",
              label:
                "Contributed speaker. Become part of one of the parallel sessions!",
            },
            {
              value: "Participant of BioTech Open Mic",
              label:
                "Participant of BioTech Open Mic. Present your research in an entertaining way in only 10 minutes!",
            },
          ]}
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="motivationLetter"
        label="Motivation letter"
        tooltip="Please write in English"
        rules={[
          {
            required: selectedParticipationType === "Attendee",
            message: "Please enter your motivation letter",
          },
        ]}
      >
        <Input.TextArea
          rows={4}
          placeholder={`Questions to be answered in the motivation letter (volume: 1-2 pages):
- Why would your participation be valuable to the conference and its participants?
- Describe your experience in the field of biotechnology (study / work / projects)
- What are your expectations from the conference?`}
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="researchInterests"
        label="Research interests"
        rules={[
          {
            required:
              !!selectedParticipationType &&
              selectedParticipationType !== "Attendee",
            message: "Please enter your research interests",
          },
        ]}
      >
        <Input placeholder="Enter your research interest(s) here" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="tentativeTitle"
        label="Tentative title"
        rules={[
          {
            required: selectedParticipationType === "Contributed speaker",
            message: "Please enter your tentative title",
          },
        ]}
      >
        <Input placeholder="Enter the tentative title of your talk here" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="resume"
        label="Resume"
        tooltip="Please write in English"
        rules={[
          {
            required: selectedParticipationType === "Contributed speaker",
            message: "Please provide a link to your resume",
          },
          { type: "url", message: "Please enter a valid url" },
        ]}
      >
        <Input placeholder="Provide a link to your resume in PDF format" />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="scienceProfile"
        label="Science profile"
        rules={[
          {
            required:
              !!selectedParticipationType &&
              selectedParticipationType !== "Attendee",
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
            required:
              !!selectedParticipationType &&
              selectedParticipationType !== "Attendee",
            message: "Please enter your video",
          },
          { type: "url", message: "Please enter a valid url" },
        ]}
      >
        <Input
          placeholder={
            ["Contributed speaker", "Attendee"].includes(
              selectedParticipationType,
            )
              ? "Provide a link to a short self-presentation video"
              : "Provide a link to a teaser of your talk"
          }
        />
      </Form.Item>
      <Form.Item<RegisterFormValues>
        name="personalData"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(
                    "Please confirm that you agree to share your personal data",
                  ),
          },
        ]}
      >
        <Checkbox>
          I agree to the{" "}
          <Link prefetch={false} href="/policy.pdf" target="_blank">
            processing of my personal data
          </Link>{" "}
          in accordance with{" "}
          <Link prefetch={false} href="/regulations.pdf" target="_blank">
            ITMO University’s Policy regarding the processing of personal data
          </Link>
          .
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
          onSuccess={(token) => form.setFieldsValue({ captchaToken: token })}
          className="mx-auto"
        />
      </Form.Item>
    </Form>
  );
};

export default function ButtonRegistrationClient({
  className,
  text = "Registration",
  countries,
  cities,
}: {
  className?: string;
  text?: string;
  countries: {
    name: string;
    code: string;
  }[];
  cities: any[];
}) {
  const [form] = Form.useForm<RegisterFormValues>();
  const [modal, context] = Modal.useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {context}
      <button
        className={cn("main-button", className)}
        onClick={() => {
          modal.confirm({
            ...modalProps,
            panelRef: modalRef,
            title: "Registration",
            content: (
              <RegForm form={form} countries={countries} cities={cities} />
            ),
            okText: "Send",
            cancelText: "Cancel",
            className: "max-h-[90vh] overflow-y-auto",
            onOk: async () => {
              try {
                const values = await form.validateFields();
                await register(values);
              } catch (e) {
                console.error(e);
                return Promise.reject(e);
              }
            },
            onCancel: () => {
              form.resetFields();
            },
          });
        }}
      >
        {text}
      </button>
    </>
  );
}
