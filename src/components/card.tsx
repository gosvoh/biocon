"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { EllipsisIcon } from "lucide-react";

export default function Card({
  children,
  className,
  icon,
  onClick,
  vertical = false,
  isContactsPage = false,
}: React.PropsWithChildren<{
  className?: string;
  icon?: boolean | React.ReactNode;
  onClick?: () => void;
  vertical?: boolean;
  isContactsPage?: boolean;
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
        vertical ? "flex flex-col" : "flex",
      )}
      onClick={() => onClick?.()}
    >
      {children}
      {icon && (
        <div
          className={`card-icon text-accent transition-all duration-300 group-hover:text-hover group-active:text-active ${isContactsPage && "lg:p-9 lg:hover:scale-[130%] lg:scale-110"}`}
        >
          {typeof icon === "boolean" ? <EllipsisIcon /> : icon}
        </div>
      )}
    </div>
  );
}
