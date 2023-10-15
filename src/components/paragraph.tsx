import { componentsClassNames } from "@/app/classNames";
import { cn } from "@/lib/utils";

export default function P({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLProps<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        componentsClassNames.base.className,
        "text-left w-full",
        className
      )}
    >
      {children}
    </p>
  );
}
