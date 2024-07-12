import { cn } from "@/lib/utils";
import React from "react";
import { EllipsisIcon } from "lucide-react";

export default function Card({
  children,
  className,
  icon,
  onClick,
}: React.PropsWithChildren<{
  className?: string;
  icon?: boolean | React.ReactNode;
  onClick?: () => void;
}>) {
  return (
    <div
      className={cn(
        "bg-card p-8 md:p-12 rounded-lg flex-1 [&>*]:max-w-2/3",
        onClick ? "cursor-pointer hover:bg-hover" : "",
        "relative",
        className
      )}
    >
      {children}
      {icon && (
        <div className="card-icon">
          {typeof icon === "boolean" ? <EllipsisIcon /> : icon}
        </div>
      )}
    </div>
  );
}
