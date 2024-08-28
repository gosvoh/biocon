"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { notification } from "antd";
import { cn } from "@/lib/utils";

const subjects = [
  "Difficulties with registration",
  "Visa questions",
  "Website problems",
  "Want to become a partner",
  "Marketing & PR",
  "Other",
];

const StyledInput = ({
  setState,
  placeholder,
  textarea = false,
  value,
}: {
  setState: Dispatch<SetStateAction<string | null>>;
  placeholder: string;
  textarea?: boolean;
  value: string | null;
}) => (
  <>
    {textarea ? (
      <textarea
        rows={7}
        value={value || ""}
        placeholder={placeholder}
        className={
          "bg-[#1A1A1A] rounded-lg border-white border-[1px] p-5 lg:text-left lg:pl-7 resize-none focus:outline-none"
        }
        onChange={(event) => setState(event.target.value)}
      />
    ) : (
      <input
        type="text"
        value={value || ""}
        onChange={(event) => setState(event.target.value)}
        className={
          "bg-[#1A1A1A] rounded-full border-white border-[1px] p-2 pr-5 pl-5 lg:p-5 lg:pr-8 lg:pl-8 focus:outline-none"
        }
        placeholder={placeholder}
      />
    )}
  </>
);

export const RenderTags = ({
  state,
  setState,
  subjects,
  className,
  isRegistration = false,
}: {
  state: string | null;
  setState: Dispatch<SetStateAction<string | null>>;
  subjects: Array<string>;
  className?: string;
  isRegistration?: boolean;
}) => {
  return (
    <div
      className={cn(
        `fcol gap-5 ${!isRegistration ? "xl:grid xl:grid-cols-3" : "ml-2"}`,
        className,
      )}
    >
      {subjects.map((subject, index) => (
        <div
          key={index}
          className={`text-base flex items-center justify-center w-fit ${!isRegistration && "lg:w-full text-base"} border-white border-[1px] p-4 lg:pl-12 lg:pr-12 pr-8 pl-8 text-center rounded-full cursor-pointer ${subject == state && "bg-[#FE6F61]"} transition-all duration-300 hover:scale-105`}
          onClick={() => setState(subjects[index])}
        >
          {subject}
        </div>
      ))}
    </div>
  );
};

export const ContactUsForm = () => {
  const containerCn = "fcol gap-3 lg:gap-5";
  const textCn = "font-normal lg:text-3xl";

  const [api, contextHolder] = notification.useNotification();
  const [tagsStatus, setTagsStatus] = useState<string | null>(null);
  const [nameInputState, setNameInputState] = useState<string | null>(null);
  const [emailInputState, setEmailInputState] = useState<string | null>(null);
  const [messageInputState, setMessageInputState] = useState<string | null>(
    null,
  );
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState<
    boolean | null
  >(null);

  const sendData = async () => {
    if (
      !(
        tagsStatus &&
        nameInputState &&
        emailInputState &&
        messageInputState &&
        isPrivacyPolicyChecked
      )
    ) {
      return api.error({
        message: "Not all fields are filled",
        description: "Please fill all required fields.",
      });
    } else if (emailInputState.indexOf("@") == -1) {
      return api.error({
        message: "E-mail is incorrect",
        description: "Please enter a correct e-mail",
      });
    }

    try {
      const response = await fetch("/api/sendFeedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInputState,
          email: emailInputState,
          message: messageInputState,
          subject: tagsStatus,
        }),
      });

      if (!response.ok) {
        return api.error({
          message: "Server error",
          description: `Status code: ${response.status}`,
        });
      }

      setIsPrivacyPolicyChecked(null);
      setEmailInputState(null);
      setNameInputState(null);
      setIsPrivacyPolicyChecked(false);
      setTagsStatus(null);
      setMessageInputState(null);

      return api.success({
        message: "Success",
        description: "Your feedback sent successfully!",
      });
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) message = error.message;
      return api.error({
        message: "Something went wrong",
        description: `Error data: ${message}`,
      });
    }
  };

  return (
    <div
      className={
        "rounded-[16px] bg-[#1A1A1A] w-full h-full p-7 lg:p-12 lg:w-[75%] z-20"
      }
    >
      {contextHolder}
      <div className={"fcol gap-7 lg:gap-10"}>
        <div className={containerCn}>
          <div className={"flex gap-1"}>
            <p className={textCn}>Subject</p>
            <p className={"text-[#888888]"}>*</p>
          </div>
          <RenderTags
            state={tagsStatus}
            setState={setTagsStatus}
            subjects={subjects}
          />
        </div>
        <div className={containerCn}>
          <div className={"flex gap-1"}>
            <p className={textCn}>Name</p>
            <p className={"text-[#888888]"}>*</p>
          </div>
          <StyledInput
            value={nameInputState}
            setState={setNameInputState}
            placeholder={"Enter your name"}
          />
        </div>
        <div className={containerCn}>
          <div className={"flex gap-1"}>
            <p className={textCn}>Email</p>
            <p className={"text-[#888888]"}>*</p>
          </div>

          <StyledInput
            value={emailInputState}
            setState={setEmailInputState}
            placeholder={"Enter your email"}
          />
        </div>
        <div className={containerCn}>
          <div className={"flex gap-1"}>
            <p className={textCn}>Message</p>
            <p className={"text-[#888888]"}>*</p>
          </div>
          <StyledInput
            value={messageInputState}
            textarea
            setState={setMessageInputState}
            placeholder={"Enter the issue you want to address"}
          />
        </div>
        <div className={"flex gap-4 items-center"}>
          <input
            type="checkbox"
            onChange={(event) =>
              setIsPrivacyPolicyChecked(event.target.checked)
            }
            className="appearance-none w-8 h-8 border-[1px] border-white rounded-full bg-[#1A1A1A] checked:bg-[#FE6F61] checked:transition-colors checked:duration-300 cursor-pointer"
          />
          <div className={"fcol gap-2 lg:hidden"}>
            <label>
              I agree to the processing <br /> of personal data.
            </label>
            <Link
              href={"/files/policy.pdf"}
              className={"styled-link"}
              target={"_blank"}
            >
              Privacy Policy
            </Link>
          </div>
          <div className={"lg:flex lg:gap-2 hidden"}>
            <label>I agree to the processing of personal data.</label>
            <Link
              href={"/files/policy.pdf"}
              className={"styled-link"}
              target={"_blank"}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <button onClick={() => sendData()} className={"main-button mt-4 mb-6"}>
          Submit
        </button>
      </div>
    </div>
  );
};
