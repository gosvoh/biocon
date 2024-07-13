import { cn } from "@/lib/utils";

export default function Tag({
  text,
  color,
}: {
  text: string;
  color: "green" | "orange";
}) {
  return (
    <span
      className={cn(
        "px-6 py-4 text-white rounded-full",
        color === "green" ? "bg-green" : "bg-hover",
        "md:whitespace-nowrap max-md:text-center"
      )}
    >
      {text}
    </span>
  );
}
