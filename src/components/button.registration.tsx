import { cn } from "@/lib/utils";

export default function ButtonRegistration({
  className,
  text = "Registration",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <button
      className={cn(
        "rounded-full text-white bg-accent hover:bg-hover px-[52px] py-3 text-base md:text-xl",
        "block mx-auto w-full md:w-fit",
        className,
      )}
    >
      {text}
    </button>
  );
}
