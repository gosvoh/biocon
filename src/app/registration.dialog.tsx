import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
import type {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useForm } from "react-hook-form";
import SuccessDialog from "./success.dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Turnstile } from "@marsidev/react-turnstile";

type RegisterFormValues = {
  name: string;
  email: string;
  mobile: number;
  country: string;
  city: string;
  affiliation: string;
  role: string;
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

const FormInputField = ({
  label,
  name,
  type = "text",
  register,
  error,
  placeholder,
  multiline,
}: {
  label: string;
  name: keyof RegisterFormValues;
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  error?: FieldError;
  register: UseFormRegister<RegisterFormValues>;
  placeholder?: string;
  multiline?: boolean;
}) => (
  <div className="my-4">
    <Label htmlFor={name}>{label}</Label>
    {multiline ? (
      <Textarea {...register(name)} placeholder={placeholder} />
    ) : (
      <Input type={type} {...register(name)} placeholder={placeholder} />
    )}
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

const FormSelectField = ({
  label,
  name,
  options,
  error,
  placeholder,
  setValue,
}: {
  label: string;
  name: keyof RegisterFormValues;
  options: { value: string; label: string }[];
  error?: FieldError;
  placeholder?: string;
  setValue: UseFormSetValue<RegisterFormValues>;
}) => (
  <div className="my-4">
    <Label htmlFor={name}>{label}</Label>
    <Select name={name} onValueChange={(val) => setValue(name, val)}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

const FormRadioField = ({
  label,
  name,
  options,
  error,
  setValue,
  value,
  register,
}: {
  label: string;
  name: keyof RegisterFormValues;
  options: { value: string; label: string }[];
  error?: FieldError;
  setValue: UseFormSetValue<RegisterFormValues>;
  value?: string;
  register: UseFormRegister<RegisterFormValues>;
}) => {
  const reg = register(name);

  return (
    <div className="my-4">
      <Label htmlFor={name}>{label}</Label>
      <RadioGroup
        id={name}
        {...reg}
        // TODO: changing the value of the radio group doesn't update the form
        onChange={(e) => {
          reg.onChange(e);
        }}
        onValueChange={(val) => setValue(name, val)}
      >
        {options.map((option, i) => (
          <div key={i} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.value.replace(" ", "_")}
              id={`${name}-${option.value}`}
            />
            <Label
              className="hover:cursor-pointer"
              htmlFor={`${name}-${option.value}`}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

const resolver = yupResolver(
  yup
    .object()
    .shape({
      name: yup.string().required().min(3),
      email: yup.string().required().email(),
      mobile: yup.number().required(),
      country: yup.string().required(),
      city: yup.string().required(),
      affiliation: yup.string().required(),
      role: yup.string().required(),
      clothingSize: yup.string().required(),
      participationType: yup.string().required(),
      motivationLetter: yup
        .string()
        .when("participationType", ([value], schema) => {
          return value === "Attendee"
            ? schema.required("This field is required")
            : schema;
        }),
      researchInterests: yup
        .string()
        .when("participationType", ([value], schema) => {
          return value !== "Attendee"
            ? schema.required("This field is required")
            : schema;
        }),
      tentativeTitle: yup
        .string()
        .when("participationType", ([value], schema) => {
          return value === "Invited Speaker"
            ? schema.required("This field is required")
            : schema;
        }),
      resume: yup.string().when("participationType", ([value], schema) => {
        return value === "Invited Speaker"
          ? schema.required("This field is required")
          : schema;
      }),
      scienceProfile: yup
        .string()
        .when("participationType", ([value], schema) => {
          return value !== "Attendee"
            ? schema.required("This field is required")
            : schema;
        }),
      video: yup.string().when("participationType", ([value], schema) => {
        return value !== "Attendee"
          ? schema.required("This field is required")
          : schema;
      }),
      personalData: yup
        .boolean()
        .default(false)
        .oneOf([true], "This field is required"),
      captchaToken: yup.string().required("This field is required"),
    })
    .required()
);

export default function RegistrationDialog(
  props: {} & React.PropsWithoutRef<DialogProps>
) {
  const [success, setSuccess] = useState(false);
  const participationTypes = ["Attendee", "Invited Speaker", "Science slammer"];
  const clothingSizes = ["S", "M", "L", "XL"];
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    setValue,
    getValues,
    watch,
    clearErrors,
  } = useForm<RegisterFormValues>({
    resolver,
  });
  const participationType = watch("participationType");

  function onSubmit(data: any) {
    console.log("onSubmit", data);
  }

  const AfterPart = participationType ? (
    participationType === "Attendee" ? (
      <FormInputField
        label="Motivation letter"
        name="motivationLetter"
        register={register}
        error={errors.motivationLetter}
        multiline
      />
    ) : (
      <>
        <FormInputField
          label="Research interests"
          name="researchInterests"
          register={register}
          error={errors.researchInterests}
        />
        {participationType === "Invited Speaker" && (
          <>
            <FormInputField
              label="Tentative title"
              name="tentativeTitle"
              register={register}
              error={errors.tentativeTitle}
            />
            <FormInputField
              label="Resume"
              name="resume"
              register={register}
              error={errors.resume}
            />
          </>
        )}
        <FormInputField
          label="Science profile"
          name="scienceProfile"
          register={register}
          error={errors.scienceProfile}
        />
        <FormInputField
          label="Video"
          name="video"
          register={register}
          error={errors.video}
        />
      </>
    )
  ) : null;

  return (
    <>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="Registration successful"
        description="You will receive an email with further instructions"
      />
      <Dialog {...props}>
        <DialogContent className="overflow-y-auto max-h-[80vh] max-w-[85%] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">Pre-registration</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit((data) => {
                formReset();
                props.onOpenChange?.(false);
                setSuccess(true);
                return onSubmit(data);
              }, console.log)();
            }}
            onChange={() =>
              console.log("change", getValues("participationType"))
            }
            className="space-y-4"
          >
            <FormInputField
              label="Name"
              name="name"
              register={register}
              error={errors.name}
              placeholder="Enter your full name here"
            />
            <FormInputField
              label="Email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="Enter your e-mail here"
            />
            <FormInputField
              label="Mobile"
              name="mobile"
              register={register}
              error={errors.mobile}
              placeholder="Enter your mobile number with country code here"
            />
            <FormInputField
              label="Country"
              name="country"
              register={register}
              error={errors.country}
              placeholder="---"
            />
            <FormInputField
              label="City"
              name="city"
              register={register}
              error={errors.city}
              placeholder="---"
            />
            <FormInputField
              label="Affiliation"
              name="affiliation"
              register={register}
              error={errors.affiliation}
              placeholder="Enter the name of your university here"
            />
            <FormInputField
              label="Role"
              name="role"
              register={register}
              error={errors.role}
              placeholder="---"
            />
            <FormSelectField
              label="Clothing size"
              name="clothingSize"
              error={errors.clothingSize}
              options={clothingSizes.map((size) => ({
                value: size,
                label: size,
              }))}
              setValue={setValue}
              placeholder="---"
            />
            <FormRadioField
              label="Participation type"
              name="participationType"
              error={errors.participationType}
              options={participationTypes.map((type) => ({
                value: type.toLocaleLowerCase().replace(" ", "_"),
                label: type,
              }))}
              setValue={setValue}
              value={getValues("participationType")}
              register={register}
            />
            {AfterPart}
            <div className="my-4 flex flex-col">
              <div className="flex items-center">
                <Checkbox
                  onCheckedChange={(value: boolean) =>
                    setValue("personalData", value)
                  }
                  className="rounded-full data-[state=checked]:text-primary data-[state=checked]:bg-primary-foreground"
                  name={"personalData"}
                  id="personalData"
                />
                <Label htmlFor="personalData" className="ml-2">
                  I agree to the processing of my personal data
                </Label>
              </div>
              {errors.personalData && (
                <p className="text-red-500">{errors.personalData.message}</p>
              )}
            </div>
            <div className="my-4">
              <Turnstile
                id="contact-turnstile"
                siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                options={{
                  action: "Contact",
                  theme: "dark",
                }}
                onSuccess={(token) => setValue("captchaToken", token)}
              />
              {errors.captchaToken && (
                <p className="text-red-500">{errors.captchaToken.message}</p>
              )}
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
