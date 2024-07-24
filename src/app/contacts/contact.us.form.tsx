"use client";

import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";

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
}: {
  setState: Dispatch<SetStateAction<string | null>>;
  placeholder: string;
  textarea?: boolean;
}) => (
  <>
    {textarea ? (
      <textarea
        rows={7}
        placeholder={placeholder}
        className={
          "bg-[#1A1A1A] rounded-lg border-white border-[1px] p-3 text-center lg:text-left lg:p-5 lg:pl-7"
        }
        onChange={(event) => setState(event.target.value)}
      />
    ) : (
      <input
        type="text"
        onChange={(event) => setState(event.target.value)}
        className={
          "bg-[#1A1A1A] rounded-full border-white border-[1px] p-2 pr-5 pl-5 lg:p-5 lg:pr-8 lg:pl-8"
        }
        placeholder={placeholder}
      />
    )}
  </>
);

const RenderTags = ({
  state,
  setState,
}: {
  state: number | null;
  setState: Dispatch<SetStateAction<number | null>>;
}) => {
  return (
    <div className={"fcol lg:grid lg:grid-cols-3 gap-5"}>
      {subjects.map((subject, index) => (
        <div
          key={index}
          className={`w-fit lg:w-full border-white border-[1px] p-4 pl-12 pr-12 text-center rounded-[66px] cursor-pointer ${index == state && "bg-[#FE6F61]"} transition-colors duration-300`}
          onClick={() => setState(index)}
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

  const [tagsStatus, setTagsStatus] = useState<number | null>(null);
  const [nameInputState, setNameInputState] = useState<string | null>(null);
  const [emailInputState, setEmailInputState] = useState<string | null>(null);
  const [messageInputState, setMessageInputState] = useState<string | null>(
    null,
  );

  return (
    <div
      className={
        "rounded-[16px] bg-[#1A1A1A] w-full h-full p-7 lg:p-12 lg:w-[75%] z-20"
      }
    >
      <div className={"fcol gap-7 lg:gap-10"}>
        <div className={containerCn}>
          <p className={textCn}>Subject *</p>
          <RenderTags state={tagsStatus} setState={setTagsStatus} />
        </div>
        <div className={containerCn}>
          <p className={textCn}>Name *</p>
          <StyledInput
            setState={setNameInputState}
            placeholder={"Enter your name"}
          />
        </div>
        <div className={containerCn}>
          <p className={textCn}>Email *</p>
          <StyledInput
            setState={setEmailInputState}
            placeholder={"Enter your email"}
          />
        </div>
        <div className={containerCn}>
          <p className={textCn}>Message *</p>
          <StyledInput
            textarea
            setState={setMessageInputState}
            placeholder={"Enter the issue you want to address"}
          />
        </div>
        <div className={"flex gap-4 items-center"}>
          <input
            type="checkbox"
            className="appearance-none w-8 h-8 border-[1px] border-white rounded-full bg-[#1A1A1A] checked:bg-[#FE6F61] checked:transition-colors checked:duration-300"
          />
          <div className={"fcol gap-2 lg:hidden"}>
            <label>
              I agree to the processing <br /> of personal data.
            </label>
            <Link
              href={"https://google.com"}
              className={"underline text-[#FE6F61]"}
              target={"_blank"}
            >
              Privacy Policy
            </Link>
          </div>
          <div className={"lg:flex lg:gap-2 hidden"}>
            <label>I agree to the processing of personal data.</label>
            <Link
              href={"https://google.com"}
              className={"underline text-[#FE6F61]"}
              target={"_blank"}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <button className={"main-button mt-4"}>Submit</button>
      </div>
    </div>
  );
};
