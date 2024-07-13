"use client";

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
        "card",
        onClick
          ? "cursor-pointer transition-all duration-300 hover:bg-hover active:bg-active group"
          : "",
        "relative",
        className,
      )}
      onClick={() => onClick?.()}
    >
      {children}
      {icon && (
        <div className="card-icon text-accent transition-all duration-300 group-hover:text-hover group-active:text-active">
          {typeof icon === "boolean" ? <EllipsisIcon /> : icon}
        </div>
      )}
    </div>
  );
}
