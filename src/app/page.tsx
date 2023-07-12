"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useSmoothScroll from "@/lib/useSmoothScroll";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import isMobilePhone from "validator/lib/isMobilePhone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ReCAPTCHA from "react-google-recaptcha";

import Logo from "../../public/logo.svg";
import Telegram from "../../public/telegram.svg";
import Agni from "../../public/agni.png";
import Biotech from "../../public/biotech.png";
import Itmo from "../../public/itmo.png";
import Pish from "../../public/pish.png";
import Tatneft from "../../public/tat.png";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import isEmail from "validator/lib/isEmail";
import { Roboto } from "next/font/google";

const SuccessDialog = ({
  title,
  description,
  ...props
}: {
  title: string;
  description: string;
} & React.PropsWithoutRef<DialogProps>) => (
  <Dialog {...props}>
    <DialogContent>
      <DialogHeader className="sm:text-center">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogFooter className="sm:justify-center">
        <Button
          variant="default"
          onClick={() => {
            props.onOpenChange?.(false);
          }}
        >
          Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const RegistrationDialog = (props: {} & React.PropsWithoutRef<DialogProps>) => {
  const [success, setSuccess] = useState(false);
  const [role, setRole] = useState<string>();
  const [openRole, setOpenRole] = useState(false);
  const participationTypes = [
    "Listener",
    "Color Session participant",
    "Science Slam participant",
  ];
  const roles = [
    "Undergraduate student",
    "Graduate student",
    "PhD student",
    "Professor",
    "Industrial partner",
  ];
  const rolesMap = roles.map((role) => ({
    value: role,
    label: role,
  }));

  const form = useForm<{
    name: string;
    email: string;
  }>({});

  function handleSubmit(data: any) {
    console.log(data);
  }

  const FormInputField = ({
    label,
    name,
    required = false,
    minLength,
    errorMessage,
    type = "text",
  }: {
    label: string;
    name: "name" | "email";
    required?: boolean;
    minLength?: number;
    errorMessage?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  }) => (
    <div className="space-y-4">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        required={required}
        minLength={minLength}
        onInvalid={(e) => e.currentTarget.setCustomValidity(errorMessage ?? "")}
        type={type}
        {...form.register(name)}
      />
    </div>
  );

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
              form.handleSubmit(
                (data) => {
                  form.reset();
                  props.onOpenChange?.(false);
                  setSuccess(true);
                  return handleSubmit(data);
                },
                (e) => console.log("Invalid", e)
              )();
            }}
            className="space-y-4"
          >
            <FormInputField
              label="Name"
              name="name"
              required
              minLength={3}
              errorMessage="Name must be at least 3 characters long"
            />
            <FormInputField
              label="Email"
              name="email"
              required
              errorMessage="Invalid email address"
              type="email"
            />
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ContactDialog = ({
  ...props
}: {} & React.PropsWithoutRef<DialogProps>) => {
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
};

const Navbar = ({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <header
      className="flex justify-between items-center my-4 w-full absolute top-0 left-0 right-0"
      style={{ padding: "inherit" }}
    >
      <a href="/">
        <Image src={Logo} alt="Biocon" width={125} />
      </a>
      <MainNav setOpenContact={setOpenContact} />
      <MobileNav setOpenContact={setOpenContact} />
    </header>
  );
};

const Footer = ({
  setOpenContact,
}: {
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const imgWidth = 200;

  return (
    <footer className="flex flex-col m-4 mt-16 gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <Link href="https://www.tatneft.ru/">
          <Image src={Tatneft} alt="Tatneft" width={imgWidth} />
        </Link>
        <Link href="https://pish.itmo.ru/">
          <Image src={Pish} alt="Pish" width={imgWidth} />
        </Link>
        <Link href="https://agni-rt.ru/">
          <Image src={Agni} alt="Agni" width={imgWidth} />
        </Link>
        <Link href="https://itmo.ru/">
          <Image src={Itmo} alt="Itmo" width={imgWidth} />
        </Link>
        <Link href="https://vk.com/biotech.itmo">
          <Image src={Biotech} alt="Biotech" width={imgWidth} />
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <Link
          href="https://t.me/BIOCON_2023"
          className={cn(
            buttonVariants({ variant: "link" }),
            "flex items-center gap-4 hover:underline p-0 h-auto"
          )}
          target="_blank"
        >
          <Image src={Telegram} alt="Telegram" width={40} />
          <span>@BIOCON_2023</span>
        </Link>
        <div className="text-center sm:text-end">
          <p>ITMO University</p>
          <p>9, Lomonosova Str., St. Petersburg, Russia, 191002</p>
          <span>email: </span>
          <Button
            variant="link"
            className="hover:underline p-0 h-auto leading-normal"
            onClick={() => setOpenContact(true)}
          >
            biocon@itmo.ru
          </Button>
        </div>
      </div>
    </footer>
  );
};

const H2Font = Roboto({
  weight: "700",
  subsets: ["latin"],
});

const H2 = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLHeadingElement>) => {
  return (
    <h2
      {...props}
      className={cn(
        "text-8xl font-bold stroke text-left w-full uppercase",
        H2Font.className,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default function Home() {
  const [openRegistration, setOpenRegistration] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const smoothScroll = useSmoothScroll();

  useEffect(() => {
    if (window.location.hash) smoothScroll(window.location.hash);
  }, [smoothScroll]);

  const Section = ({
    children,
    className,
    ...props
  }: { children: React.ReactNode } & React.HTMLProps<HTMLDivElement>) => (
    <section
      {...props}
      className={cn(
        "flex flex-col justify-center items-center w-full scroll-m-12",
        className
      )}
    >
      {children}
    </section>
  );

  const Header = () => (
    <Section
      className="flex flex-col justify-center items-center h-screen"
      style={{ minHeight: "100dvh" }}
    >
      <h1 className="text-4xl font-bold capitalize">BioCon 2023</h1>
      <h2 className="text-2xl font-bold">
        International Industrial Biotecnology Conference
      </h2>
      <p className="text-xl font-bold">december 18-20, 2023</p>
      <p className="text-xl font-bold capitalize">Almetyevsk</p>
      <div className="flex flex-wrap justify-between items-center w-1/2 gap-6 whitespace-nowrap mt-8">
        <Link
          href="#about"
          className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
        >
          More info
        </Link>
        <Button onClick={() => setOpenRegistration(true)} className="flex-1">
          Register
        </Button>
      </div>
    </Section>
  );

  const About = () => (
    <Section className="flex flex-col justify-center items-center" id="about">
      <H2>About</H2>
      <p>
        Over the three days, you will have the opportunity to share your
        innovative ideas, research results and experiences with like-minded
        biotech enthusiasts from around the world.
      </p>
    </Section>
  );

  const Speakers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="speakers"
    >
      <H2 className="text-right">Speakers</H2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Program = () => (
    <Section className="flex flex-col justify-center items-center" id="program">
      <H2>Program</H2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Venue = () => (
    <Section className="flex flex-col justify-center items-center" id="venue">
      <H2 className="text-right">Venue</H2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  const Organizers = () => (
    <Section
      className="flex flex-col justify-center items-center"
      id="organizers"
    >
      <H2>Organaizers</H2>
      <p>
        The Bioinformatics Conference (BioCon) is a forum for researchers and
        practitioners in the field of bioinformatics and computational biology
        to share their research results and experiences. The conference is
        organized by the Bioinformatics Institute (BII) and the Center for
        Algorithmic Biotechnology (CAB) of St. Petersburg State University. The
        conference is held annually in St. Petersburg, Russia.
      </p>
    </Section>
  );

  return (
    <>
      <RegistrationDialog
        open={openRegistration}
        onOpenChange={setOpenRegistration}
      />
      <ContactDialog open={openContact} onOpenChange={setOpenContact} />
      <Navbar setOpenContact={setOpenContact} />
      <main className="flex flex-col justify-center items-center gap-8">
        <Header />
        <About />
        <Speakers />
        <Program />
        <Venue />
        <Organizers />
      </main>
      <Footer setOpenContact={setOpenContact} />
    </>
  );
}
