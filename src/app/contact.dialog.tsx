import { zodResolver } from "@hookform/resolvers/zod";
import type { DialogProps } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ContactDialog({
  ...props
}: {} & React.PropsWithoutRef<DialogProps>) {
  const [success, setSuccess] = useState(false);

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters long"),
    personalData: z.boolean().refine((v) => v, {
      message: "You must agree to our privacy policy",
    }),
    captchaToken: z
      .string()
      .nullable()
      .refine((val) => val, "You must solve the captcha"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      personalData: false,
      captchaToken: null,
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="Message sent"
        description="We will get back to you as soon as possible"
      />
      <Dialog {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center text-base font-normal">
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
              className="space-y-4"
            >
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
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(value: boolean) =>
                          field.onChange(value)
                        }
                        name={field.name}
                      />
                    </FormControl>
                    <FormLabel className="!m-0">
                      I agree to the processing of personal data
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href="#">Privacy policy</Link>
              <FormField
                control={form.control}
                name="captchaToken"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        onChange={field.onChange}
                        theme="dark"
                        // @ts-expect-error
                        isolated={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Ask Question</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
