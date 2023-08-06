import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import VK from "../../public/vk.svg";
import Telegram from "../../public/telegram.svg";
import Facebook from "../../public/facebook.svg";
import YouTube from "../../public/youtube.svg";
import Link from "next/link";
import Image from "next/image";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socials } from "@/socials";

export default function FollowDialog({
  ...props
}: {} & React.PropsWithoutRef<DialogProps>) {
  const formSchema = yup.object().shape({
    name: yup
      .string()
      .required("Please enter your name")
      .min(3, "Name must be at least 3 characters"),
    email: yup
      .string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
  });

  const form = useForm({
    resolver: yupResolver(formSchema),
  });

  function handleSubmit(data: yup.InferType<typeof formSchema>) {
    console.log(data);
    form.reset();
    props.onOpenChange?.(false);
  }

  return (
    <Dialog {...props}>
      <DialogContent className="w-[80%]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Follow us on social networks
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-row flex-wrap gap-8 items-center justify-center my-12">
          <Link href={socials.vk} target="_blank" prefetch={false}>
            <Image src={VK} alt={"VK social"} width={40} />
          </Link>
          <Link href={socials.telegram} target="_blank" prefetch={false}>
            <Image src={Telegram} alt="Telegram social" width={40} />
          </Link>
          <Link href={socials.facebook} target="_blank" prefetch={false}>
            <Image src={Facebook} alt={"Facebook social"} width={40} />
          </Link>
          <Link href={socials.youtube} target="_blank" prefetch={false}>
            <Image src={YouTube} alt={"YouTube social"} width={40} />
          </Link>
        </div>
        <DialogTitle className="text-center">
          Subscribe to our newsletter!
        </DialogTitle>
        <DialogDescription className="text-center">
          Be the first one to get our updates!
        </DialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 gap-4 items-center justify-center justify-items-center"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
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
                  <FormItem className="flex-1 w-full">
                    <FormControl>
                      <Input placeholder="Email*" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Subscribe</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
