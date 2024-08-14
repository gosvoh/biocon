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
import { useEffect, useMemo, useRef, useState } from "react";
import Awesome from "@public/awesome.png";
import type { Cities, Registrations } from "@/db/schema";
import Link from "next/link";
import { modalProps } from "./ui/modal";
import { register } from "./button.registration.actions";
import Image from "next/image";
import styled from "styled-components";
import { RenderTags } from "@/app/contacts/contact.us.form";

type RegisterFormValues = typeof Registrations.$inferInsert & {
  captchaToken: string;
  customRole?: string;
  personalData: boolean;
};

const StyledInput = styled(Input)`
  border-radius: 3rem;
  padding: 1rem 1rem 1rem 1.5rem;
  border: 1px solid white;
`;

const StyledTextArea = styled(Input.TextArea)`
  border-radius: 28px;
  padding: 1rem 1rem 1rem 1.5rem;
  border: 1px solid white;
`;

const StyledSelect = styled(Select)`
  border: 1px solid white;
  border-radius: 3rem;
  width: 100%;
  box-sizing: border-box;
`;

const roles = [
  "Attendee",
  "Contributed speaker",
  "Participant of BioTech Open Mic",
];

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
  const [selectedParticipationType, setSelectedParticipationType] = useState<
    string | null
  >(roles[0]);
  const selectedRole = Form.useWatch("role", form);
  const selectedCountry = Form.useWatch("country", form);
  const firstInputRef = useRef<InputRef>(null);
  const memoizedCountries = useMemo(
    () =>
      countries
        .map((c) => ({
          value: c.code,
          label: c.name,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
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
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [cities, selectedCountry],
  );

  useEffect(() => {
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  }, []);

  const RenderLabel = ({
    text,
    required,
  }: {
    text: string;
    required: boolean;
  }) => {
    const textCn = "font-[500] lg:text-2xl mb-2 mt-2 flex gap-1";
    return (
      <p className={textCn}>
        {text} {required && <p className={"text-[#888888]"}>*</p>}
      </p>
    );
  };

  return (
    <>
      <style type="text/css">
        {`
        .ant-select-selector {
          border: none !important;
          box-shadow: none !important;
          &:focus,
          &:active,
          &:hover {
            border: none !important;
            box-shadow: none !important;
          }
        }

        .ant-select-arrow {
          color: white !important;
          margin-right: 0.5rem
        }
        .ant-form-item-explain {
          margin-left:1.5rem
        }
      `}
      </style>
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        className={"overflow-hidden"}
      >
        <Form.Item<RegisterFormValues>
          name="name"
          label={<RenderLabel text={"Full name"} required={true} />}
          required={false}
          rules={[
            { required: true, message: "Please enter your name" },
            { min: 3, message: "Name must be at least 3 characters" },
          ]}
        >
          <StyledInput
            ref={firstInputRef}
            placeholder="Enter your full name here"
          />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="email"
          required={false}
          label={<RenderLabel text={"Email"} required={true} />}
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
          <StyledInput placeholder="Enter your email here" type="email" />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="howToKnow"
          required={false}
          label={
            <RenderLabel
              text={"How did you learn about BIOCON?"}
              required={true}
            />
          }
          rules={[
            {
              required: true,
              message: "Please enter how did you learn about BIOCON",
            },
          ]}
        >
          <StyledInput />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="mobile"
          label={<RenderLabel text={"Mobile"} required={true} />}
          required={false}
          rules={[
            { required: true, message: "Please enter your mobile" },
            {
              pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
              message: "Invalid mobile",
            },
          ]}
        >
          <StyledInput type="tel" />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="country"
          label={<RenderLabel text={"Select your country"} required={true} />}
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter your country",
            },
          ]}
        >
          <StyledSelect
            style={{ padding: "26px 26px 26px 14px" }}
            disabled={countries.length === 0}
            placeholder="Country"
            options={memoizedCountries}
            /*
                showSearch
            filterOption={(input, option) =>
              !option
                ? false
                : option.label.toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(a, b) => a.label.localeCompare(b.label)}
             */
          />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="city"
          label={<RenderLabel text={"Select your сity"} required={true} />}
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter your city",
            },
          ]}
        >
          <StyledSelect
            disabled={!selectedCountry}
            style={{ padding: "26px 26px 26px 14px" }}
            placeholder="City"
            /*
            showSearch
            filterOption={(input, option) =>
              !option
                ? false
                : option.label.toLowerCase().startsWith(input.toLowerCase())
            }
            filterSort={(a, b) => a.label.localeCompare(b.label)}
            */
            options={memoizedCities}
          />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="affiliation"
          label={<RenderLabel text={"Affiliation"} required={true} />}
          required={false}
          rules={[
            {
              required: true,
              message: "Please enter your affiliation",
            },
          ]}
        >
          <StyledInput placeholder="Enter the name of your university or organization here" />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="role"
          label={<RenderLabel text={"Role"} required={true} />}
          required={false}
          rules={[
            {
              required: true,
              message: "Please select your role",
            },
          ]}
        >
          <StyledSelect
            style={{ padding: "26px 26px 26px 14px" }}
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
            label={<RenderLabel text={"Custom role"} required={true} />}
            required={false}
            rules={[
              {
                required: true,
                message: "Please enter your role",
              },
            ]}
          >
            <StyledInput placeholder="Enter your custom role here" />
          </Form.Item>
        )}
        <Form.Item<RegisterFormValues>
          name="clothingSize"
          label={<RenderLabel text={"Clothing size"} required={true} />}
          required={false}
          rules={[
            {
              required: true,
              message: "Please select your clothing size",
            },
          ]}
        >
          <StyledSelect
            style={{ padding: "26px 26px 26px 14px" }}
            placeholder="Clothing size"
            options={["S", "M", "L", "XL"].map((s) => ({
              value: s,
              label: s,
            }))}
          />
        </Form.Item>
        <Form.Item<RegisterFormValues>
          name="participationType"
          initialValue={roles[0]}
          rules={[
            {
              required: true,
              message: "Please select your participation type",
            },
          ]}
        >
          <RenderTags
              isRegistration={true}
            className={"mt-7 mb-5"}
            state={selectedParticipationType}
            setState={(value) => {
              setSelectedParticipationType(value);
              form.setFieldsValue({ participationType: value });
            }}
            subjects={roles}
          />
        </Form.Item>

        {selectedParticipationType === "Attendee" && (
          <Form.Item<RegisterFormValues>
            name="motivationLetter"
            label={<RenderLabel text={"Motivation letter"} required={true} />}
            required={false}
            rules={[
              {
                required: selectedParticipationType === "Attendee",
                message: "Please enter your motivation letter",
              },
            ]}
          >
            <StyledTextArea
              rows={8}
              placeholder={`Questions to be answered in the motivation letter (volume: 1-2 pages):
- Why would your participation be valuable to the conference and its participants?
- Describe your experience in the field of biotechnology (study / work / projects)
- What are your expectations from the conference?`}
            />
          </Form.Item>
        )}

        {!!selectedParticipationType &&
          selectedParticipationType !== "Attendee" && (
            <Form.Item<RegisterFormValues>
              name="researchInterests"
              label={
                <RenderLabel text={"Research interests"} required={true} />
              }
              required={false}
              rules={[
                {
                  required:
                    !!selectedParticipationType &&
                    selectedParticipationType !== "Attendee",
                  message: "Please enter your research interests",
                },
              ]}
            >
              <StyledInput placeholder="Enter your research interest(s) here" />
            </Form.Item>
          )}

        {selectedParticipationType === "Contributed speaker" && (
          <>
            <Form.Item<RegisterFormValues>
              name="tentativeTitle"
              label={<RenderLabel text={"Tentative title"} required={true} />}
              required={false}
              rules={[
                {
                  required: selectedParticipationType === "Contributed speaker",
                  message: "Please enter your tentative title",
                },
              ]}
            >
              <StyledInput placeholder="Enter the tentative title of your talk here" />
            </Form.Item>
            <Form.Item<RegisterFormValues>
              name="resume"
              label={<RenderLabel text={"Resume"} required={true} />}
              required={false}
              rules={[
                {
                  required: selectedParticipationType === "Contributed speaker",
                  message: "Please provide a link to your resume",
                },
                { type: "url", message: "Please enter a valid url" },
              ]}
            >
              <StyledInput placeholder="Provide a link to your resume in PDF format" />
            </Form.Item>
          </>
        )}

        {!!selectedParticipationType &&
          selectedParticipationType !== "Attendee" && (
            <>
              <Form.Item<RegisterFormValues>
                name="scienceProfile"
                label={<RenderLabel text={"Science profile"} required={true} />}
                required={false}
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
                <StyledInput placeholder="Provide a link to your Google Scholar, Scopus or ORCID profile" />
              </Form.Item>
              <Form.Item<RegisterFormValues>
                name="video"
                label={<RenderLabel text={"Video"} required={true} />}
                required={false}
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
                <StyledInput
                  placeholder={
                    ["Contributed speaker", "Attendee"].includes(
                      selectedParticipationType,
                    )
                      ? "Provide a link to a short self-presentation video"
                      : "Provide a link to a teaser of your talk"
                  }
                />
              </Form.Item>
            </>
          )}
        <Form.Item<RegisterFormValues>
          name="personalData"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(),
            },
          ]}
        >
          <div className="grid grid-cols-[0.25fr_2fr] xl:flex xl:gap-5 items-center">
            <input
              type="checkbox"
              className="appearance-none h-8 w-8 lg:w-auto  aspect-square border-[1px] border-white rounded-full bg-[#1A1A1A] checked:bg-[#FE6F61] checked:transition-colors checked:duration-300 cursor-pointer"
            />
            <div className="ml-4">
              I agree to the{" "}
              <Link
                prefetch={false}
                href="/files/policy.pdf"
                target="_blank"
                className={"styled-link"}
              >
                processing of my personal data
              </Link>{" "}
              in accordance with{" "}
              <Link
                prefetch={false}
                href="/files/regulations.pdf"
                target="_blank"
                className={"styled-link"}
              >
                ITMO University’s Policy regarding the processing of personal
                data
              </Link>
              .
            </div>
          </div>
        </Form.Item>

        <Form.Item<RegisterFormValues>
          name="captchaToken"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(),
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
    </>
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
            content: (
              <RegForm form={form} countries={countries} cities={cities} />
            ),
            okText: "Send",
            cancelText: "Cancel",
            className: "max-h-max overflow-y-auto",
            onOk: async () => {
              try {
                const values = await form.validateFields();
                await register(values);
                modal.info({
                  icon: null,
                  closable: true,
                  footer: null,
                  content: (
                    <div
                      className={
                        "fcol gap-7 items-center justify-center text-center pb-10 pt-10"
                      }
                    >
                      <h3>You are awesome!</h3>
                      <div className={"w-32 h-32"}>
                        <Image
                          src={Awesome}
                          alt={""}
                          className={"object-cover aspect-square scale-150"}
                        />
                      </div>
                      <p>Registration completed successsfully</p>
                    </div>
                  ),
                });
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
