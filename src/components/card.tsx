import { cn } from "@/lib/utils";
import React from "react";

export default function Card({
  children,
  className,
  plain = true,
  onClick,
}: React.PropsWithChildren<{
  className?: string;
  plain?: boolean;
  onClick?: () => void;
}>) {
  return (
    <div
      className={cn(
        "bg-card p-8 md:p-12 rounded-lg flex-1 [&>*]:max-w-2/3",
        plain ? "" : "",
        onClick ? "cursor-pointer hover:bg-hover" : "",
        className
      )}
    >
      {children}
      {!plain && (
        <>
          <div className="scoop"></div>
          <div className="scoop"></div>
          <div className="scoop"></div>
        </>
      )}
    </div>
  );
}
