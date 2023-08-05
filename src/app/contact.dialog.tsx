import type { DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SuccessDialog from "./success.dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function ContactDialog({
  ...props
}: {} & React.PropsWithoutRef<DialogProps>) {
  const [success, setSuccess] = useState(false);

  const formSchema = yup.object().shape({
    subject: yup.string().required("Please select a subject"),
    name: yup
      .string()
      .required("Please enter your name")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    message: yup
      .string()
      .required("Please enter your message")
      .min(10, "Message must be at least 10 characters"),
    personalData: yup
      .boolean()
      .oneOf([true], "You must agree to the processing of personal data"),
    captchaToken: yup
      .string()
      .required("Please confirm that you are not a robot"),
  });
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      subject: "",
      name: "",
      email: "",
      message: "",
      personalData: false,
      captchaToken: undefined,
    },
  });

  function handleSubmit(data: yup.InferType<typeof formSchema>) {
    console.log(data);
  }

  const subjects = [
    "Difficulties with registration",
    "Visa questions",
    "Website problems",
    "Want to become a partner?",
    "Marketing & PR",
    "Other",
  ];

  return (
    <>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="Your email is successfully delivered"
        description="We will contact you in a short time"
      />
      <Dialog {...props}>
        <DialogContent className="overflow-y-auto max-h-[80vh] max-w-[85%] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className=" text-center text-base font-normal">
              To contact the organizing committee please fill in the form below
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit((data) => {
                  form.reset();
                  props.onOpenChange?.(false);
                  setSuccess(true);
                  return handleSubmit(data);
                })();
              }}
              className="space-y-4 flex flex-col"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2 flex-wrap">
                        {subjects.map((subject) => (
                          <Button
                            key={subject}
                            onClick={() => field.onChange(subject)}
                            variant={
                              field.value === subject ? "default" : "outline"
                            }
                          >
                            {subject}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Message*"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personalData"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value: boolean) =>
                          field.onChange(value)
                        }
                        className="rounded-full data-[state=checked]:text-primary data-[state=checked]:bg-primary-foreground"
                        name={field.name}
                      />
                    </FormControl>
                    <FormLabel className="hover:cursor-pointer">
                      I agree to the processing of personal data.
                      <Link
                        prefetch={false}
                        className="ml-2 text-sm underline text-[#2A84EE]"
                        href="#"
                      >
                        Privacy policy
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="captchaToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Turnstile
                        id="contact-turnstile"
                        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        options={{
                          action: "Contact",
                          theme: "dark",
                          size: "compact",
                        }}
                        onSuccess={(token) => field.onChange(token)}
                        className="mx-auto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="self-center !mt-8">
                Ask Question
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
