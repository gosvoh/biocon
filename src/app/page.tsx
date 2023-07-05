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
import validator from "validator";
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
  type ZodStringArray = readonly [string, ...string[]];
  const participationTypes: ZodStringArray = [
    "Listener",
    "Color Session participant",
    "Science Slam participant",
  ];
  const roles: ZodStringArray = [
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

  const formSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().refine(validator.isMobilePhone, "Invalid mobile number"),
    country: z.string({
      required_error: "Please select a country",
    }),
    city: z.string({
      required_error: "Please select a city",
    }),
    affilation: z
      .string()
      .min(3, "Affilation must be at least 3 characters long"),
    role: z.string({
      required_error: "Please select a role",
    }),
    size: z.enum(["S", "M", "L", "XL"], {
      required_error: "Please select a size",
    }),
    participation: z.enum(participationTypes, {
      required_error: "Please select a participation type",
    }),
    letter: z.string().min(3, "Letter must be at least 3 characters long"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      country: undefined,
      city: undefined,
      affilation: "",
      role: undefined,
      participation: "Listener",
      letter: "",
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
        title="Registration successful"
        description="You will receive an email with further instructions"
      />
      <Dialog {...props}>
        <DialogContent className="overflow-y-auto max-h-[80vh] max-w-[85%] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-center">Pre-registration</DialogTitle>
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
                    <FormLabel htmlFor="name">Full name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name here" {...field} />
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
                    <FormLabel htmlFor="email">Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your e-mail here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="mobile">Mobile number*</FormLabel>
                    <FormDescription>(With country code)</FormDescription>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="country">Country*</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="city">City*</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Option 1</SelectItem>
                        <SelectItem value="2">Option 2</SelectItem>
                        <SelectItem value="3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="affilation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="affilation">Affilation*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of your affilation here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="role">Role*</FormLabel>
                    <Popover open={openRole} onOpenChange={setOpenRole}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? field.value : "Select your role"}
                            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-2">
                        <Command value={field.value}>
                          <CommandInput
                            placeholder="Select your role"
                            value={role}
                            onValueChange={setRole}
                          />
                          {(() => {
                            if (role && !rolesMap.find((r) => r.value === role))
                              rolesMap.push({
                                label: role,
                                value: role,
                              });

                            return (
                              <CommandGroup>
                                {rolesMap.map(({ label, value }) => (
                                  <CommandItem
                                    key={value}
                                    value={label}
                                    onSelect={() => {
                                      field.onChange(value);
                                      setOpenRole(false);
                                      setRole(undefined);
                                    }}
                                    className="hover:bg-accent my-1"
                                  >
                                    {label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            );
                          })()}
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="participation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="participation">
                      Participation type*
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: any) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        {participationTypes.map((type) => (
                          <FormItem
                            key={type}
                            className="flex items-center gap-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={type} />
                            </FormControl>
                            <FormLabel className="!my-0 cursor-pointer">
                              {type}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="letter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="letter">Motivation letter*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write why is it important for you to get to the conference"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
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
          <Image
            src={Agni}
            alt="Agni"
            width={imgWidth}
            style={{ filter: "invert(1)" }}
          />
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
      <h2 className="text-4xl font-bold">About</h2>
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
      <h2 className="text-4xl font-bold">Speakers</h2>
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
      <h2 className="text-4xl font-bold">Program</h2>
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
      <h2 className="text-4xl font-bold">Venue</h2>
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
      <h2 className="text-4xl font-bold">Organaizers</h2>
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
