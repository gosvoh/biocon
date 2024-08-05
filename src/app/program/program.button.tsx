"use client";
import { Modal } from "antd";
import Link from "next/link";

export const ProgramButton = () => {
  const [api, context] = Modal.useModal();
  const downloadButtonStyles =
    "w-full text-center pl-10 pr-10 p-5 border-white border-2 h-full rounded-md cursor-pointer hover:bg-[#FE6F61] transition-colors duration-300 text-white lg:text-lg text-md";
  return (
    <>
      {context}
      <button
        className={"main-button"}
        onClick={() =>
          api.info({
            icon: null,
            closable: true,
            footer: null,
            className: "max-h-max overflow-y-auto p-6 text-center max-w-max",
            width: "600px",
            content: (
              <div className={"mt-8 fcol gap-6 items-center"}>
                <h2>Updates very soon!</h2>
                <Link href={"/files/BIOCON 2023 program.pdf"} target={"_blank"}>
                  <div className={downloadButtonStyles}>
                    Download the BIOCON 2023 program
                  </div>
                </Link>
              </div>
            ),
          })
        }
      >
        <p className={"hidden lg:block font-normal"}>
          {" "}
          Download the BIOCON 2024 program
        </p>
        <p className={"lg:hidden font-normal"}>Download program</p>
      </button>
    </>
  );
};
