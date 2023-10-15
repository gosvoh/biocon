import { componentsClassNames } from "@/app/classNames";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";

export const StrokeFont = Roboto({
  weight: "700",
  subsets: ["latin"],
});

export default function H1({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cn(
        componentsClassNames.xl4.className,
        "font-bold stroke text-left w-full uppercase mb-12",
        StrokeFont.className,
        className
      )}
    >
      {children}
    </h1>
  );
}
