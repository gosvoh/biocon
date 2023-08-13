// import type { DialogProps } from "@radix-ui/react-dialog";
// import { useForm } from "react-hook-form";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { useState } from "react";
import SuccessDialog from "./success.dialog";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import {
  ConfigProvider,
  Modal,
  theme,
  Button,
  Form,
  Input,
  Checkbox,
  Tag,
} from "antd";

// export default function ContactDialog({
//   ...props
// }: {} & React.PropsWithoutRef<DialogProps>) {
//   const [success, setSuccess] = useState(false);

//   const formSchema = yup.object().shape({
//     subject: yup.string().required("Please select a subject"),
//     name: yup
//       .string()
//       .required("Please enter your name")
//       .min(3, "Name must be at least 3 characters"),
//     email: yup
//       .string()
//       .required("Please enter your email address")
//       .email("Please enter a valid email address"),
//     message: yup
//       .string()
//       .required("Please enter your message")
//       .min(10, "Message must be at least 10 characters"),
//     personalData: yup
//       .boolean()
//       .oneOf([true], "You must agree to the processing of personal data"),
//     captchaToken: yup
//       .string()
//       .required("Please confirm that you are not a robot"),
//   });
//   const form = useForm({
//     resolver: yupResolver(formSchema),
//     defaultValues: {
//       subject: "",
//       name: "",
//       email: "",
//       message: "",
//       personalData: false,
//       captchaToken: undefined,
//     },
//   });

//   function handleSubmit(data: yup.InferType<typeof formSchema>) {
//     fetch("/api/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then(() => {
//       form.reset();
//       props.onOpenChange?.(false);
//       setSuccess(true);
//     });
//   }

//   const subjects = [
//     "Difficulties with registration",
//     "Visa questions",
//     "Website problems",
//     "Want to become a partner?",
//     "Marketing & PR",
//     "Other",
//   ];

//   return (
//     <>
//       <SuccessDialog
//         open={success}
//         onOpenChange={setSuccess}
//         title="Your email is successfully delivered"
//         description="We will contact you in a short time"
//       />
//       <Dialog {...props}>
//         <DialogContent className="overflow-y-auto max-h-[80vh] max-w-[85%] sm:max-w-lg">
//           <DialogHeader>
//             <DialogTitle className=" text-center text-base font-normal">
//               To contact the organizing committee please fill in the form below
//             </DialogTitle>
//           </DialogHeader>
//           <Form {...form}>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 form.handleSubmit((data) => {
//                   form.reset();
//                   props.onOpenChange?.(false);
//                   setSuccess(true);
//                   return handleSubmit(data);
//                 })();
//               }}
//               className="space-y-4 flex flex-col"
//             >
//               <FormField
//                 control={form.control}
//                 name="subject"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <div className="flex gap-2 flex-wrap">
//                         {subjects.map((subject) => (
//                           <Button
//                             key={subject}
//                             onClick={() => field.onChange(subject)}
//                             variant={
//                               field.value === subject ? "default" : "outline"
//                             }
//                           >
//                             {subject}
//                           </Button>
//                         ))}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input placeholder="Name*" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input placeholder="Email*" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="message"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Message*"
//                         className="resize-none"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="personalData"
//                 render={({ field }) => (
//                   <FormItem className="flex items-center space-x-3 space-y-0">
//                     <FormControl>
//                       <Checkbox
//                         checked={field.value}
//                         onCheckedChange={(value: boolean) =>
//                           field.onChange(value)
//                         }
//                         className="rounded-full data-[state=checked]:text-primary data-[state=checked]:bg-primary-foreground"
//                         name={field.name}
//                       />
//                     </FormControl>
//                     <FormLabel className="hover:cursor-pointer">
//                       I agree to the processing of personal data.
//                       <Link
//                         prefetch={false}
//                         className="ml-2 text-sm underline text-[#2A84EE]"
//                         href="#"
//                       >
//                         Privacy policy
//                       </Link>
//                     </FormLabel>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="captchaToken"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Turnstile
//                         id="contact-turnstile"
//                         siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
//                         options={{
//                           action: "Contact",
//                           theme: "dark",
//                           size: "compact",
//                         }}
//                         onSuccess={(token) => field.onChange(token)}
//                         className="mx-auto"
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="self-center !mt-8">
//                 Ask Question
//               </Button>
//             </form>
//           </Form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

export default function ContactDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const selectedSubject = Form.useWatch("subject", form);
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
      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <Modal
          open={open}
          title={
            <div className="text-center text-base font-normal">
              To contact the organizing committee please fill in the form below
            </div>
          }
          centered
          onCancel={() => onOpenChange(false)}
          footer={
            <div className="flex justify-center items-center">
              <Button onClick={() => form.submit()}>Submit</Button>
            </div>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              fetch("/api/contact", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              }).then(() => {
                form.resetFields();
                onOpenChange(false);
              });
            }}
          >
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: "Please select a subject!" }]}
            >
              <div className="flex gap-2 flex-wrap">
                {subjects.map((subject, i) => (
                  <Tag
                    key={i}
                    onClick={() => form.setFieldsValue({ subject })}
                    color={selectedSubject === subject ? "blue" : undefined}
                    className="hover:cursor-pointer px-3 py-1 rounded-full"
                  >
                    {subject}
                  </Tag>
                ))}
              </div>
            </Form.Item>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter your name!" },
                { min: 3, message: "Name must be at least 3 characters long!" },
              ]}
            >
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please enter your email address!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Please enter your message!" },
                { min: 10, message: "Message must be at least 10 characters!" },
              ]}
            >
              <Input.TextArea placeholder="Message" />
            </Form.Item>
            <Form.Item
              name="personalData"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "You must agree to the processing of personal data"
                        ),
                },
              ]}
            >
              <Checkbox>
                I agree to the processing of personal data.
                <Link
                  prefetch={false}
                  className="ml-2 text-sm underline text-[#2A84EE]"
                  href="#"
                >
                  Privacy policy
                </Link>
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="captchaToken"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          "Please confirm that you are not a robot"
                        ),
                },
              ]}
            >
              <Turnstile
                id="contact-turnstile"
                siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                options={{
                  action: "Contact",
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
    </>
  );
}
