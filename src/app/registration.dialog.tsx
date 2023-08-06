import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { DialogProps } from "@radix-ui/react-dialog";
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
import { Turnstile } from "@marsidev/react-turnstile";
import isMobilePhone from "validator/lib/isMobilePhone";
import isURL from "validator/lib/isURL";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useAsync } from "@react-hookz/web";
import { FixedSizeList as List } from "react-window";
import { List as VirtualizedList, AutoSizer } from "react-virtualized";

type RegisterFormValues = {
  name: string;
  email: string;
  mobile: string;
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

export default function RegistrationDialog(
  props: {} & React.PropsWithoutRef<DialogProps>
) {
  const form = useForm({
    resolver: yupResolver(formSchema),
  });
  const [success, setSuccess] = useState(false);
  const participationTypes = [
    {
      value: "Attendee",
      label: "Attendee. Full-time participation in conference events",
    },
    {
      value: "Invited Speaker",
      label: "Invited speaker. A talk during one of the parallel sessions",
    },
    {
      value: "Science Slammer",
      label: "Science Slammer. A science communication talk",
    },
  ];
  const selectedParticipationType = form.watch("participationType");
  const roles = [
    "Undergraduate student",
    "Graduate student",
    "PhD student",
    "Professor",
    "Industrial partner",
    "Other",
  ];
  const selectedRole = form.watch("role");
  const clothingSizes = ["S", "M", "L", "XL"];
  const [countriesState, countriesAction] = useAsync<
    {
      id: number;
      name: string;
      iso2: string;
    }[]
  >(
    () =>
      fetch("https://api.countrystatecity.in/v1/countries", {
        headers: {
          "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
        },
      }).then((res) => res.json()),
    []
  );
  const [cityState, cityAction] = useAsync<
    {
      id: number;
      name: string;
    }[]
  >(
    () =>
      fetch(
        `https://api.countrystatecity.in/v1/countries/${selectedCountry}/cities`,
        {
          headers: {
            "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_API_KEY as string,
          },
        }
      ).then((res) => res.json()),
    []
  );
  const selectedCountry = form.watch("country");
  const selectedCity = form.watch("city");
  const [countryPopoverOpen, setCountryPopoverOpen] = useState(false);
  const [cityPopoverOpen, setCityPopoverOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<
    { id: number; name: string; iso2: string }[]
  >([]);
  const [filteredCities, setFilteredCities] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    countriesAction.execute();
  }, [countriesAction]);

  useEffect(() => {
    if (!countriesState.result) return;
    setFilteredCountries(countriesState.result);
  }, [countriesState.result]);

  useEffect(() => {
    if (!selectedCountry) return;
    cityAction.execute();
  }, [selectedCountry, cityAction]);

  useEffect(() => {
    if (!cityState.result) return;
    setFilteredCities(cityState.result);
  }, [cityState.result]);

  function onSubmit(data: yup.InferType<typeof formSchema>) {
    console.log("onSubmit", data);
  }

  const CountryListRenderer = ({
    key,
    index,
    style,
  }: {
    key: string;
    index: number;
    style: React.CSSProperties;
  }) => (
    <CommandItem
      value={filteredCountries[index]?.name}
      onSelect={() => {
        form.setValue("country", filteredCountries[index]?.iso2);
        setCountryPopoverOpen(false);
        setFilteredCountries(countriesState.result);
      }}
      style={style}
      key={key}
    >
      <Check
        className={cn(
          "mr-2 h-4 w-4 shrink-0",
          filteredCountries[index]?.iso2 === selectedCountry
            ? "opacity-100"
            : "opacity-0"
        )}
      />
      {filteredCountries[index]?.name}
    </CommandItem>
  );
  const CityListRenderer = ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: { id: number; name: string }[];
  }) => {
    return (
      <CommandItem
        value={filteredCities[index]?.name}
        onSelect={() => form.setValue("city", filteredCities[index]?.name)}
        style={style}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4 shrink-0",
            filteredCities[index]?.name === selectedCity
              ? "opacity-100"
              : "opacity-0"
          )}
        />
        {filteredCities[index]?.name}
      </CommandItem>
    );
  };

  return (
    <>
      <SuccessDialog
        open={success}
        onOpenChange={setSuccess}
        title="You are awesome!"
        description="Registration completed successfully"
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
                  return onSubmit(data);
                })();
              }}
              className="space-y-4 flex flex-col"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name here"
                        {...field}
                      />
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
                    <FormLabel>E-mail*</FormLabel>
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
                    <FormLabel>Mobile number*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number with country code here"
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
                  <FormItem className="flex flex-col">
                    <FormLabel>Select country*</FormLabel>
                    <Popover
                      open={countryPopoverOpen}
                      onOpenChange={setCountryPopoverOpen}
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !selectedCountry && "text-muted-foreground"
                            )}
                          >
                            {selectedCountry
                              ? filteredCountries?.find(
                                  (country) => country.iso2 === selectedCountry
                                )?.name
                              : "---"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[300px] p-0 h-72">
                        <Command
                          onValueChange={console.log}
                          shouldFilter={false}
                        >
                          <CommandInput
                            onValueChange={(value) => {
                              return setFilteredCountries(
                                () =>
                                  countriesState.result?.filter((country) =>
                                    country.name
                                      .toLowerCase()
                                      .includes(value.toLowerCase())
                                  ) ?? []
                              );
                            }}
                            placeholder="Search..."
                          />
                          <CommandEmpty>No country found</CommandEmpty>
                          <CommandGroup className="overflow-y-auto flex-1 grid">
                            <AutoSizer>
                              {({ height, width }) => (
                                <VirtualizedList
                                  rowCount={filteredCountries?.length ?? 0}
                                  rowHeight={30}
                                  width={width}
                                  height={height}
                                  rowRenderer={CountryListRenderer}
                                />
                              )}
                            </AutoSizer>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedCountry && (
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select city*</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? filteredCities?.find(
                                    (city) => city.name === field.value
                                  )?.name
                                : "---"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 h-72">
                          <Command shouldFilter={false}>
                            <CommandInput
                              onBlur={() =>
                                setFilteredCities(cityState.result ?? [])
                              }
                              onValueChange={(value) => {
                                setFilteredCities(
                                  cityState.result?.filter((city) =>
                                    city.name
                                      .toLowerCase()
                                      .includes(value.toLowerCase())
                                  ) ?? []
                                );
                              }}
                              placeholder="Search..."
                            />
                            <CommandEmpty>No city found</CommandEmpty>
                            <CommandGroup className="overflow-y-auto">
                              <List
                                height={230}
                                itemCount={filteredCities?.length ?? 0}
                                itemSize={30}
                                width="100%"
                              >
                                {CityListRenderer}
                              </List>
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="affiliation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliation*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of your university here"
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
                    <FormLabel>Role*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="---" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedRole === "Other" && (
                <FormField
                  control={form.control}
                  name="otherRole"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Other role*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your role here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="clothingSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select your clothing size*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="---" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clothingSizes.map((size) => (
                          <SelectItem key={size} value={size}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="participationType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type of participation:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {participationTypes.map((type, i) => (
                          <FormItem
                            key={i}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={type.value} />
                            </FormControl>
                            <FormLabel className="font-normal hover:cursor-pointer">
                              {type.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {selectedParticipationType === "Attendee" && (
                <FormField
                  control={form.control}
                  name="motivationLetter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Motivation letter*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write why is it important for you to attend BIOCON?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {selectedParticipationType !== "Attendee" && (
                <>
                  <FormField
                    control={form.control}
                    name="researchInterests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Research interest(s)*</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter your research interest(s) here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {selectedParticipationType === "Invited Speaker" && (
                    <>
                      <FormField
                        control={form.control}
                        name="tentativeTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tentative title of your talk*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter the tentative title of your work here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="resume"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Resume*</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Provide a link to your resume in PDF format"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <FormField
                    control={form.control}
                    name="scienceProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Your Google Scholar, Scopus or ORCID profile*
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Provide a link to your Google Scholar, Scopus or ORCID profile"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="video"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short video*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Provide a link to a teaser of your slam talk"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
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
                        id="registration-turnstile"
                        siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                        options={{
                          action: "Registration",
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
              <p className="text-destructive">
                <AlertCircle className="h-4 w-4 inline-block mr-1" />
                After submitting the form, a confirmation will be sent to your
                e-mail address. If confirmation has not been recieved, please
                email us{" "}
                <Link
                  className="underline"
                  href="mailto:biocon@itmo.ru"
                  prefetch={false}
                >
                  biocon@itmo.ru
                </Link>
              </p>
              <Button type="submit" className="self-center !mt-8">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
