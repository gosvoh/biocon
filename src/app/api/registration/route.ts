import { NextRequest, NextResponse } from "next/server";
import isMobilePhone from "validator/lib/isMobilePhone";
import isURL from "validator/lib/isURL";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Name must be at least 3 characters long"),
  email: yup
    .string()
    .required("Please enter your email address")
    .email("Please enter a valid email address"),
  mobile: yup
    .string()
    .required("Please enter your mobile number")
    .test("is-mobile-phone", "Please enter a valid mobile number", (value) =>
      isMobilePhone(value, "any")
    ),
  country: yup.string().required("Please select the country you are from"),
  city: yup.string().required("Please enter the city you are from"),
  affiliation: yup.string().required("Please enter your affiliation"),
  role: yup.string().required("Please enter your role"),
  otherRole: yup
    .string()
    .when("role", ([value], schema) =>
      value === "Other" ? schema.required("Please enter your role") : schema
    ),
  clothingSize: yup.string().required("Please select your clothing size"),
  participationType: yup
    .string()
    .required("Please select your participation type"),
  motivationLetter: yup
    .string()
    .when("participationType", ([value], schema) =>
      value === "Attendee"
        ? schema
            .required("Please enter a motivation letter")
            .min(10, "Motivation letter must be at least 10 characters long")
        : schema
    ),
  researchInterests: yup
    .string()
    .when("participationType", ([value], schema) =>
      value !== "Attendee"
        ? schema.required("Please enter your research interests")
        : schema
    ),
  tentativeTitle: yup
    .string()
    .when("participationType", ([value], schema) =>
      value === "Invited Speaker"
        ? schema.required("Please enter a tentative title")
        : schema
    ),
  resume: yup.string().when("participationType", ([value], schema) =>
    value === "Invited Speaker"
      ? schema
          .required("Please enter a resume")
          .test("is-url", "Please enter a valid URL", (value) =>
            isURL(value, {
              protocols: ["http", "https"],
              require_protocol: true,
            })
          )
      : schema
  ),
  scienceProfile: yup.string().when("participationType", ([value], schema) =>
    value !== "Attendee"
      ? schema
          .required("Please enter a science profile")
          .test("is-url", "Please enter a valid URL", (value) =>
            isURL(value, {
              protocols: ["http", "https"],
              require_protocol: true,
            })
          )
      : schema
  ),
  video: yup.string().when("participationType", ([value], schema) =>
    value !== "Attendee"
      ? schema
          .required("Please enter a video")
          .test("is-url", "Please enter a valid URL", (value) =>
            isURL(value, {
              protocols: ["http", "https"],
              require_protocol: true,
            })
          )
      : schema
  ),
  personalData: yup
    .boolean()
    .default(false)
    .oneOf([true], "Please accept the terms and conditions"),
  captchaToken: yup
    .string()
    .required("Please complete the captcha to prove you are not a robot"),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    await formSchema.validate(body, { abortEarly: false });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({});
}
