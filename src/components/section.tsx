import { cn } from "@/lib/utils";

export default function Section({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLDivElement>) {
  return (
    <section
      {...props}
      className={cn(
        "flex flex-col justify-center items-center w-full scroll-m-12 my-6 md:my-12 first:my-0",
        className
      )}
    >
      {children}
    </section>
  );
}
